/**
 * 反応実行エンジン（P9-1 M2 / 設計: DESIGN_reaction_execution.md）
 * 「⚗ この分子の反応」カードに、いま描かれている分子へ適用できる反応を列挙し、
 * 選ぶと分子グラフを書き換えて生成物へ変化させる。実行は通常の編集と同じく
 * saveState を積むので Undo/Redo がそのまま効く。名称判定カードが答え合わせを兼ねる。
 */

// ---- 共通ヘルパー ----

// 指定原子が属する連結成分（分子）の原子IDの集合
function componentOf(mol, atomId) {
    const seen = new Set([atomId]);
    const stack = [atomId];
    while (stack.length) {
        const id = stack.pop();
        mol.getNeighbors(id).forEach(n => {
            if (!seen.has(n.atom.id)) {
                seen.add(n.atom.id);
                stack.push(n.atom.id);
            }
        });
    }
    return seen;
}

// 脱離した酸素を分子の外側（右上）へ退避させる。結合を失ったOは自動水素で水 H₂O として描かれる
// （反応機構データと同じ「原子は消さない」原則）
function parkAsWater(mol, oId) {
    const o = mol.atoms.find(a => a.id === oId);
    const others = mol.atoms.filter(a => a.id !== oId);
    if (!o || others.length === 0) return;
    const maxX = Math.max(...others.map(a => a.x));
    const minY = Math.min(...others.map(a => a.y));
    const x = Math.round((maxX + GRID_SIZE * 2) / GRID_SIZE) * GRID_SIZE;
    let y = Math.round(minY / GRID_SIZE) * GRID_SIZE;
    while (others.some(a => Math.hypot(a.x - x, a.y - y) < GRID_SIZE * 0.65)) y += GRID_SIZE;
    o.x = x;
    o.y = y;
}

// 相手分子（movingIds）を平行移動して、attachId の原子を anchorId の隣（1グリッドの直交方向）に
// 置くための移動量を求める。既存原子と重なる配置は採用しない。見つからなければ null
function planAttachment(mol, anchorId, attachId, movingIds, ignoreIds = []) {
    const anchor = mol.atoms.find(a => a.id === anchorId);
    const attach = mol.atoms.find(a => a.id === attachId);
    if (!anchor || !attach) return null;
    const moving = new Set(movingIds);
    const ignore = new Set(ignoreIds);
    const statics = mol.atoms.filter(a => !moving.has(a.id) && !ignore.has(a.id) && a.element !== 'H');
    const MIN_CLEARANCE = GRID_SIZE * 0.65;
    const dirs = [0, -Math.PI / 2, Math.PI / 2, Math.PI]; // 右・上・下・左
    for (const ang of dirs) {
        const tx = anchor.x + GRID_SIZE * Math.cos(ang);
        const ty = anchor.y + GRID_SIZE * Math.sin(ang);
        const dx = tx - attach.x;
        const dy = ty - attach.y;
        const ok = [...moving].every(id => {
            const a = mol.atoms.find(x => x.id === id);
            if (!a) return true;
            const nx = a.x + dx;
            const ny = a.y + dy;
            return statics.every(s => Math.hypot(s.x - nx, s.y - ny) >= MIN_CLEARANCE);
        });
        if (ok) return { dx, dy };
    }
    return null;
}

function translateAtoms(mol, ids, dx, dy) {
    ids.forEach(id => {
        const a = mol.atoms.find(x => x.id === id);
        if (a) {
            a.x += dx;
            a.y += dy;
        }
    });
}

const ALCOHOL_TYPES = ['alcohol0', 'alcohol1', 'alcohol2', 'alcohol3'];

// ---- 反応ルール（detect は適用箇所の配列を返す。apply は分子を書き換える） ----
const REACTION_RULES = [
    {
        id: 'oxidize_primary',
        label: '酸化 [O] → アルデヒド',
        detect(mol) {
            return findFunctionalGroups(mol)
                .filter(g => g.type === 'alcohol1' || g.type === 'alcohol0')
                .filter(g => mol.getFreeValency(g.atomIds[1]) >= 1)
                .map(g => g.atomIds); // [OのID, CのID]
        },
        apply(game, site) {
            const [oId, cId] = site;
            game.userMolecule.getBond(oId, cId).type = 2;
            return {
                caption: '酸化されてアルデヒドになりました（R-CH₂-OH + [O] → R-CHO + H₂O）。アルデヒドはさらに酸化されるとカルボン酸になります。銀鏡反応・フェーリング液の還元を示すのはこの構造です。',
                changed: [oId, cId]
            };
        }
    },
    {
        id: 'oxidize_secondary',
        label: '酸化 [O] → ケトン',
        detect(mol) {
            return findFunctionalGroups(mol)
                .filter(g => g.type === 'alcohol2')
                .filter(g => mol.getFreeValency(g.atomIds[1]) >= 1)
                .map(g => g.atomIds);
        },
        apply(game, site) {
            const [oId, cId] = site;
            game.userMolecule.getBond(oId, cId).type = 2;
            return {
                caption: '2級アルコールが酸化されてケトンになりました（R-CH(OH)-R\' + [O] → R-CO-R\' + H₂O）。ケトンはアルデヒドと違い、それ以上酸化されにくい構造です。',
                changed: [oId, cId]
            };
        }
    },
    {
        id: 'oxidize_aldehyde',
        label: '酸化 [O] → カルボン酸',
        detect(mol) {
            return findFunctionalGroups(mol)
                .filter(g => g.type === 'aldehyde')
                .filter(g => mol.getFreeValency(g.atomIds[0]) >= 1)
                .map(g => g.atomIds); // [カルボニルC, =O]
        },
        apply(game, site) {
            const cId = site[0];
            const mol = game.userMolecule;
            const c = mol.atoms.find(a => a.id === cId);
            // 空いている直交方向に -OH の O を追加（官能基モジュールと同じ方向決定）
            const nb = mol.getNeighbors(cId).filter(n => n.atom.element !== 'H');
            let sumX = 0, sumY = 0;
            nb.forEach(n => {
                const ang = Math.atan2(n.atom.y - c.y, n.atom.x - c.x);
                sumX += Math.cos(ang);
                sumY += Math.sin(ang);
            });
            let ang = Math.atan2(-sumY, -sumX);
            ang = Math.round(ang / (Math.PI / 2)) * (Math.PI / 2);
            const o = mol.addAtom('O', c.x + GRID_SIZE * Math.cos(ang), c.y + GRID_SIZE * Math.sin(ang));
            mol.addBond(cId, o.id, 1);
            return {
                caption: 'アルデヒドが酸化されてカルボン酸になりました（R-CHO + [O] → R-COOH）。1級アルコールから2段階の酸化で到達する終点です。',
                changed: [cId, o.id]
            };
        }
    },
    {
        id: 'oxidize_tertiary_info',
        label: '⚠ 酸化（3級アルコール）',
        info: true,
        detect(mol) {
            return findFunctionalGroups(mol)
                .filter(g => g.type === 'alcohol3')
                .map(g => g.atomIds);
        },
        apply() {
            return {
                caption: '3級アルコールは、-OH のついた炭素に水素がないため酸化されにくい構造です（級の判定: OHのつく炭素に結合する炭素の数 = 3）。'
            };
        }
    },
    {
        id: 'dehydration_intra',
        label: '分子内脱水（-H₂O） → アルケン',
        detect(mol) {
            const sites = [];
            findFunctionalGroups(mol)
                .filter(g => ['alcohol1', 'alcohol2', 'alcohol3'].includes(g.type))
                .forEach(g => {
                    const [oId, aId] = g.atomIds;
                    const alpha = mol.atoms.find(a => a.id === aId);
                    const aNb = mol.getNeighbors(aId).filter(n => n.atom.element !== 'H');
                    if (aNb.some(n => n.type >= 2)) return; // α炭素に多重結合がある場合は対象外
                    // β候補: αに単結合した炭素で、Hがあり多重結合を持たないもの
                    const betas = aNb.filter(n =>
                        n.atom.element === 'C' && n.type === 1 &&
                        mol.getFreeValency(n.atom.id) >= 1 &&
                        !mol.getNeighbors(n.atom.id).some(x => x.type >= 2));
                    if (betas.length === 0) return;
                    // ザイツェフ則: 結合する炭素が多い（＝Hが少ない）β側を主生成物として選ぶ
                    betas.sort((p, q) =>
                        mol.getNeighbors(q.atom.id).filter(x => x.atom.element === 'C').length -
                        mol.getNeighbors(p.atom.id).filter(x => x.atom.element === 'C').length);
                    sites.push([oId, aId, betas[0].atom.id]);
                });
            return sites;
        },
        apply(game, site) {
            const [oId, aId, bId] = site;
            const mol = game.userMolecule;
            mol.removeBond(oId, aId);
            mol.getBond(aId, bId).type = 2;
            // 脱離した水（O + 自動H×2）は分子の外側へ平行移動して残す
            parkAsWater(mol, oId);
            return {
                caption: '分子内脱水で C=C 二重結合ができ、水 H₂O が脱離しました（濃硫酸・約160〜170℃の条件に相当）。β炭素が複数あるときは、Hの少ない炭素側から抜ける主生成物を表示しています（ザイツェフ則）。',
                changed: [aId, bId]
            };
        }
    },
    {
        id: 'esterification',
        label: 'エステル化（カルボン酸＋アルコール, -H₂O）',
        detect(mol) {
            const groups = findFunctionalGroups(mol);
            const carboxyls = groups.filter(g => g.type === 'carboxyl');
            const alcohols = groups.filter(g => ALCOHOL_TYPES.includes(g.type) || g.type === 'phenol');
            const sites = [];
            carboxyls.forEach(cx => {
                const comp = componentOf(mol, cx.atomIds[0]);
                alcohols.forEach(al => {
                    if (comp.has(al.atomIds[0])) return; // 分子間反応のみ（分子内エステル化は対象外）
                    sites.push([cx.atomIds[0], cx.atomIds[2], al.atomIds[0], al.atomIds[1]]);
                });
            });
            return sites;
        },
        apply(game, site) {
            const [cId, ohOId, alcOId] = site;
            const mol = game.userMolecule;
            const movingIds = [...componentOf(mol, alcOId)];
            // アルコール分子を平行移動し、そのOをカルボニル炭素の隣へ（脱離するOHは判定から除く）
            const plan = planAttachment(mol, cId, alcOId, movingIds, [ohOId]);
            if (!plan) throw new Error('生成物を配置する空間がありません。分子を離してから実行してください');
            mol.removeBond(cId, ohOId);
            translateAtoms(mol, movingIds, plan.dx, plan.dy);
            mol.addBond(cId, alcOId, 1);
            parkAsWater(mol, ohOId);
            return {
                caption: 'エステル化（縮合）が起こりました。カルボン酸の -OH とアルコールの -H がとれて水になり、エステル結合 -COO- ができます（濃硫酸を触媒に加熱）。同位体で調べると、水の酸素はカルボン酸側から来ることが分かっています。',
                changed: [cId, alcOId]
            };
        }
    },
    {
        id: 'dehydration_inter',
        label: '分子間脱水（アルコール2分子, -H₂O） → エーテル',
        detect(mol) {
            const alcohols = findFunctionalGroups(mol).filter(g => ALCOHOL_TYPES.includes(g.type));
            const sites = [];
            for (let i = 0; i < alcohols.length; i++) {
                for (let j = i + 1; j < alcohols.length; j++) {
                    const a = alcohols[i];
                    const b = alcohols[j];
                    if (componentOf(mol, a.atomIds[0]).has(b.atomIds[0])) continue; // 別分子どうしのみ
                    sites.push([a.atomIds[0], a.atomIds[1], b.atomIds[0], b.atomIds[1]]);
                }
            }
            return sites;
        },
        apply(game, site) {
            const [oAId, , oBId, cBId] = site;
            const mol = game.userMolecule;
            // B分子のうち、脱離するOを除いた部分を移動させてAのOに結合する
            const movingIds = [...componentOf(mol, cBId)].filter(id => id !== oBId);
            const plan = planAttachment(mol, oAId, cBId, movingIds, [oBId]);
            if (!plan) throw new Error('生成物を配置する空間がありません。分子を離してから実行してください');
            mol.removeBond(oBId, cBId);
            translateAtoms(mol, movingIds, plan.dx, plan.dy);
            mol.addBond(oAId, cBId, 1);
            parkAsWater(mol, oBId);
            return {
                caption: '分子間脱水（縮合）でエーテル結合 C-O-C ができました。アルコール2分子から水1分子がとれる反応です（エタノールでは約130〜140℃。より高温の160〜170℃では分子内脱水が優先してアルケンになります）。',
                changed: [oAId, cBId]
            };
        }
    }
];

class Reactor {
    constructor(game) {
        this.game = game;
        this.actionsEl = document.getElementById('reaction-actions');
        this.picking = null; // {rule, sites} 適用箇所の選択待ち
    }

    // 「⚗ この分子の反応」カードのボタン列を再構築する（updateDrawing のたびに呼ばれる）
    refresh() {
        if (!this.actionsEl) return;
        this.actionsEl.innerHTML = '';
        this.picking = null;
        if (window.reactionPlayer && window.reactionPlayer.blocksEditing()) return;
        const mol = this.game.userMolecule;
        if (mol.atoms.filter(a => a.element !== 'H').length === 0) return;

        REACTION_RULES.forEach(rule => {
            let sites = [];
            try {
                sites = rule.detect(mol);
            } catch (e) {
                console.error('反応ルール検出エラー:', rule.id, e);
                return;
            }
            if (sites.length === 0) return;
            const btn = document.createElement('button');
            btn.className = 'view-btn';
            btn.style.cssText = 'text-align:left; font-size:12px; padding:6px 8px;';
            btn.textContent = rule.label + (sites.length > 1 && !rule.info ? `（${sites.length}箇所）` : '');
            btn.addEventListener('click', () => this.onRuleClick(rule, sites));
            this.actionsEl.appendChild(btn);
        });
    }

    onRuleClick(rule, sites) {
        if (rule.info) {
            // 解説のみ（実行なし・Undo履歴も積まない）
            this.game.showToast(rule.apply().caption, 6000, 'success');
            return;
        }
        this.narrow(rule, sites);
    }

    // 適用箇所が複数あるときは、候補を分けている原子だけをハイライトしてクリックで絞り込む。
    // 1クリックで決まらない場合（カルボン酸×アルコールの組み合わせなど）は繰り返し絞り込む
    narrow(rule, sites) {
        if (sites.length === 1) {
            this.execute(rule, sites[0]);
            return;
        }
        this.picking = { rule, sites };
        const ids = new Set();
        sites.forEach(s => s.forEach(id => ids.add(id)));
        const distinguishing = [...ids].filter(id => !sites.every(s => s.includes(id)));
        const pickIds = distinguishing.length ? distinguishing : [...ids];
        const atoms = pickIds
            .map(id => this.game.userMolecule.atoms.find(a => a.id === id))
            .filter(Boolean);
        this.game.highlightAtoms(atoms);
        this.game.showToast('反応させたい箇所（ハイライトした原子）をクリックしてください。', 5000, 'success');
    }

    // 適用箇所の選択モード中、キャンバスのクリックを消費する（game.handleMouseDown から呼ばれる）
    handlePick(atom) {
        if (!this.picking) return false;
        const { rule, sites } = this.picking;
        this.picking = null;
        this.game.clearUIOverlay();
        if (atom) {
            const matched = sites.filter(s => s.includes(atom.id));
            if (matched.length === 1) {
                this.execute(rule, matched[0]);
                return true;
            }
            if (matched.length > 1) {
                this.narrow(rule, matched); // まだ決まらないので再度選ばせる
                return true;
            }
        }
        this.game.showToast('適用箇所の選択を解除しました。');
        return true;
    }

    execute(rule, site) {
        const g = this.game;
        g.saveState();
        let result;
        try {
            result = rule.apply(g, site);
        } catch (e) {
            console.error('反応実行エラー:', rule.id, e);
            g.history.pop(); // 失敗した実行はUndo履歴を残さない
            g.showToast('この反応は実行できませんでした: ' + e.message);
            return;
        }
        g.updateDrawing();
        if (result.changed) {
            const atoms = result.changed
                .map(id => g.userMolecule.atoms.find(a => a.id === id))
                .filter(Boolean);
            g.highlightAtoms(atoms); // 変化した箇所をハイライトで示す
        }
        g.showToast(result.caption, 6500, 'success');
    }
}
