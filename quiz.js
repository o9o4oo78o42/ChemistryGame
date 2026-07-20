/**
 * 「同じ化合物？」クイズ（P8-3）
 * 表記（回転・反転・結合の伸長・ケクレ位相）が異なる2つの構造式を並べて提示し、
 * 同じ化合物かどうかを答えさせる。「別の描き方でも、つながり方が同じなら同じ化合物」
 * の理解を目的とする学習モード。正誤の正は verifyMolecule（トポロジー同値）に置く。
 */

class SameCompoundQuiz {
    constructor(game) {
        this.game = game;
        this.library = null;        // { name, target, mol, formula } のリスト（ステージ＋compounds）
        this.differentPairs = null; // 「違う」問題用: 同分子式・別トポロジーのペア [i, j]
        this.current = null;        // 出題中の問題 { isSame, nameA, nameB, formula }
        this.score = { asked: 0, correct: 0 };

        this.modal = document.getElementById('quiz-modal');
        this.resultEl = document.getElementById('quiz-result');
        this.scoreEl = document.getElementById('quiz-score');
        this.btnSame = document.getElementById('btn-quiz-same');
        this.btnDiff = document.getElementById('btn-quiz-diff');

        document.getElementById('btn-quiz').addEventListener('click', () => this.open());
        document.getElementById('btn-quiz-close').addEventListener('click', () => this.modal.classList.add('hidden'));
        document.getElementById('btn-quiz-next').addEventListener('click', () => this.nextQuestion());
        this.btnSame.addEventListener('click', () => this.answer(true));
        this.btnDiff.addEventListener('click', () => this.answer(false));
    }

    open() {
        this.buildLibrary();
        this.modal.classList.remove('hidden');
        this.nextQuestion();
    }

    // 出題ライブラリの構築（初回のみ）
    buildLibrary() {
        if (this.library) return;
        const entries = [
            ...STAGES.map(s => ({ name: s.name, target: s.target })),
            ...COMPOUNDS.map(c => ({ name: c.name, target: c.target }))
        ];
        this.library = entries.map(e => {
            const mol = this.game.createTargetFromData({ target: e.target });
            return { name: e.name, target: e.target, mol, formula: this.game.computeMolecularFormula(mol) };
        });

        // 「違う」問題用ペア: 分子式が同じでトポロジーが異なる（構造異性体）。
        // 同一トポロジーの別名エントリ（幾何異性・別表記）は除外する
        this.differentPairs = [];
        for (let i = 0; i < this.library.length; i++) {
            for (let j = i + 1; j < this.library.length; j++) {
                if (this.library[i].formula !== this.library[j].formula) continue;
                if (verifyMolecule(this.library[i].mol, this.library[j].mol)) continue;
                this.differentPairs.push([i, j]);
            }
        }
    }

    nextQuestion() {
        const lib = this.library;
        const wantSame = this.differentPairs.length === 0 ? true : Math.random() < 0.5;

        let entryA, entryB, targetA, targetB;
        if (wantSame) {
            entryA = entryB = lib[Math.floor(Math.random() * lib.length)];
            targetA = entryA.target;
            targetB = this.transformDepiction(entryA.target);
        } else {
            let [i, j] = this.differentPairs[Math.floor(Math.random() * this.differentPairs.length)];
            if (Math.random() < 0.5) [i, j] = [j, i];
            entryA = lib[i];
            entryB = lib[j];
            // どちらも表記変換して「見た目の乱れ具合」では判別できないようにする
            targetA = this.transformDepiction(entryA.target);
            targetB = this.transformDepiction(entryB.target);
        }

        const molA = this.renderInto('quiz-svg-a', targetA);
        const molB = this.renderInto('quiz-svg-b', targetB);

        // 正解フラグは verifyMolecule で決める（生成ロジックのバグに対する防御）
        this.current = {
            isSame: verifyMolecule(molA, molB),
            nameA: entryA.name,
            nameB: entryB.name,
            formula: entryA.formula
        };
        this.resultEl.textContent = '';
        this.resultEl.className = '';
        this.btnSame.disabled = false;
        this.btnDiff.disabled = false;
        this.updateScore();
    }

    answer(saidSame) {
        if (!this.current || this.btnSame.disabled) return;
        this.btnSame.disabled = true;
        this.btnDiff.disabled = true;
        this.score.asked++;
        const correct = (saidSame === this.current.isSame);
        if (correct) this.score.correct++;

        const c = this.current;
        const head = correct ? '⭕ 正解！' : (c.isSame ? '❌ 残念…正解は「同じ」。' : '❌ 残念…正解は「違う」。');
        this.resultEl.textContent = c.isSame
            ? `${head} どちらも「${c.nameA}」（分子式 ${c.formula}）です。回転・反転・結合の長さや折れ曲がり・ベンゼンの二重結合の位置を変えても、原子のつながり方が同じなら同じ化合物です。`
            : `${head} 左は「${c.nameA}」、右は「${c.nameB}」。分子式はどちらも ${c.formula} ですが、原子のつながり方が異なる構造異性体です。`;
        this.resultEl.className = 'result-message ' + (correct ? 'success' : 'error');
        this.updateScore();
    }

    updateScore() {
        this.scoreEl.textContent = this.score.asked > 0 ? `成績: ${this.score.correct} / ${this.score.asked}` : '';
    }

    // 分子を指定SVGに描画し、判定用のMoleculeを返す（viewBoxは分子に自動フィット）
    renderInto(svgId, target) {
        const svg = document.getElementById(svgId);
        const bondsGroup = svg.querySelector('.quiz-bonds');
        const atomsGroup = svg.querySelector('.quiz-atoms');
        bondsGroup.innerHTML = '';
        atomsGroup.innerHTML = '';

        const mol = this.game.createTargetFromData({ target });
        const hydrogens = mol.calculateHydrogens();
        let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
        [...mol.atoms, ...hydrogens].forEach(p => {
            minX = Math.min(minX, p.x); maxX = Math.max(maxX, p.x);
            minY = Math.min(minY, p.y); maxY = Math.max(maxY, p.y);
        });
        const pad = 30;
        svg.setAttribute('viewBox', `${minX - pad} ${minY - pad} ${(maxX - minX) + pad * 2} ${(maxY - minY) + pad * 2}`);

        hydrogens.forEach(h => {
            const parent = mol.atoms.find(a => a.id === h.parentId);
            if (parent) this.game.renderTargetBond(parent.x, parent.y, h.x, h.y, 1, true, bondsGroup);
        });
        mol.bonds.forEach(b => {
            const a1 = mol.atoms.find(a => a.id === b.atomId1);
            const a2 = mol.atoms.find(a => a.id === b.atomId2);
            if (a1 && a2) this.game.renderTargetBond(a1.x, a1.y, a2.x, a2.y, b.type, false, bondsGroup);
        });
        hydrogens.forEach(h => this.game.renderTargetAtom('H', h.x, h.y, atomsGroup));
        mol.atoms.forEach(a => this.game.renderTargetAtom(a.element, a.x, a.y, atomsGroup));
        return mol;
    }

    // トポロジーを変えずに表記だけを変える（回転・反転・ケクレ位相反転・橋結合の伸長）
    transformDepiction(target) {
        const atoms = target.atoms.map(a => ({ ...a }));
        const bonds = target.bonds.map(b => ({ ...b }));

        // 1. 90°単位の回転（1〜3回）＋50%で左右反転（剛体変換なのでシス/トランスも保存される）
        const cx = atoms.reduce((s, a) => s + a.x, 0) / atoms.length;
        const cy = atoms.reduce((s, a) => s + a.y, 0) / atoms.length;
        const turns = 1 + Math.floor(Math.random() * 3);
        for (let t = 0; t < turns; t++) {
            atoms.forEach(a => {
                const nx = cx - (a.y - cy);
                const ny = cy + (a.x - cx);
                a.x = nx;
                a.y = ny;
            });
        }
        if (Math.random() < 0.5) {
            atoms.forEach(a => { a.x = 2 * cx - a.x; });
        }

        // 2. ベンゼン環があれば50%でケクレ位相を反転（環内の単⇔二重を入れ替え。同値な表記）
        const m = new Molecule();
        const added = atoms.map(a => m.addAtom(a.element, a.x, a.y));
        bonds.forEach(b => m.addBond(added[b.atom1Index].id, added[b.atom2Index].id, b.type));
        const arKeys = findAromaticBondKeys(m);
        if (arKeys.size > 0 && Math.random() < 0.5) {
            bonds.forEach(b => {
                const id1 = added[b.atom1Index].id;
                const id2 = added[b.atom2Index].id;
                const key = id1 < id2 ? `${id1}_${id2}` : `${id2}_${id1}`;
                if (arKeys.has(key)) b.type = (b.type === 1 ? 2 : 1);
            });
        }

        // 3. 50%で橋結合を1本だけ+42px伸長（片側成分の平行移動。重なる場合は行わない）
        if (Math.random() < 0.5 && bonds.length > 0) {
            const adj = atoms.map(() => []);
            bonds.forEach((b, bi) => {
                adj[b.atom1Index].push({ to: b.atom2Index, bi });
                adj[b.atom2Index].push({ to: b.atom1Index, bi });
            });
            const reach = (start, excludeBi) => {
                const seen = new Set([start]);
                const stack = [start];
                while (stack.length) {
                    const i = stack.pop();
                    adj[i].forEach(e => {
                        if (e.bi === excludeBi || seen.has(e.to)) return;
                        seen.add(e.to);
                        stack.push(e.to);
                    });
                }
                return seen;
            };
            const bridges = [];
            bonds.forEach((b, bi) => {
                if (!reach(b.atom1Index, bi).has(b.atom2Index)) bridges.push(bi);
            });
            if (bridges.length > 0) {
                const bi = bridges[Math.floor(Math.random() * bridges.length)];
                const b = bonds[bi];
                const side = reach(b.atom2Index, bi);
                const a1 = atoms[b.atom1Index];
                const a2 = atoms[b.atom2Index];
                const len = Math.hypot(a2.x - a1.x, a2.y - a1.y) || 1;
                const dx = (a2.x - a1.x) / len * GRID_SIZE;
                const dy = (a2.y - a1.y) / len * GRID_SIZE;
                const moved = atoms.map((a, i) => side.has(i) ? { x: a.x + dx, y: a.y + dy } : { x: a.x, y: a.y });
                let ok = true;
                outer:
                for (let i = 0; i < moved.length; i++) {
                    for (let j = i + 1; j < moved.length; j++) {
                        if (Math.hypot(moved[i].x - moved[j].x, moved[i].y - moved[j].y) < GRID_SIZE * 0.65) {
                            ok = false;
                            break outer;
                        }
                    }
                }
                if (ok) {
                    moved.forEach((p, i) => { atoms[i].x = p.x; atoms[i].y = p.y; });
                }
            }
        }

        return { atoms, bonds };
    }
}
