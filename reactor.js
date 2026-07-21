/**
 * 反応実行エンジン（P9-1 M2 / 設計: DESIGN_reaction_execution.md）
 * 「⚗ この分子の反応」カードに、いま描かれている分子へ適用できる反応を列挙し、
 * 選ぶと分子グラフを書き換えて生成物へ変化させる。実行は通常の編集と同じく
 * saveState を積むので Undo/Redo がそのまま効く。名称判定カードが答え合わせを兼ねる。
 */

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
            const o = mol.atoms.find(a => a.id === oId);
            const maxX = Math.max(...mol.atoms.filter(a => a.id !== oId).map(a => a.x));
            const alpha = mol.atoms.find(a => a.id === aId);
            o.x = Math.round((maxX + GRID_SIZE * 2) / GRID_SIZE) * GRID_SIZE;
            o.y = Math.round(alpha.y / GRID_SIZE) * GRID_SIZE;
            return {
                caption: '分子内脱水で C=C 二重結合ができ、水 H₂O が脱離しました（濃硫酸・約160〜170℃の条件に相当）。β炭素が複数あるときは、Hの少ない炭素側から抜ける主生成物を表示しています（ザイツェフ則）。',
                changed: [aId, bId]
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
        if (sites.length === 1) {
            this.execute(rule, sites[0]);
            return;
        }
        // 適用箇所が複数: ハイライトしてクリックで選ばせる
        this.picking = { rule, sites };
        const atoms = sites.map(s => this.game.userMolecule.atoms.find(a => a.id === s[0] || a.id === s[1]))
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
            const site = sites.find(s => s.includes(atom.id));
            if (site) {
                this.execute(rule, site);
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
