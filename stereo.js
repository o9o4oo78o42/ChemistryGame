/**
 * 立体対照ビュー（P7-5-M1 / 設計: DESIGN_3d_correspondence.md）
 * 選択した sp3 炭素を中心に、教科書のくさび形表記（wedge-dash）で
 * 「作図は90°だが実際は正四面体（約109.5°）」であることを対照提示する。
 * パズルの作図・判定には一切影響しない別枠表示。
 */

// 置換基の表示ラベル（単原子なら OH / NH2 / CH3 形式、枝なら組成式）
function substituentLabel(mol, rootId, centerId) {
    const root = mol.atoms.find(a => a.id === rootId);
    const beyond = mol.getNeighbors(rootId)
        .filter(n => n.atom.id !== centerId && n.atom.element !== 'H');
    if (beyond.length === 0) {
        const h = mol.getFreeValency(rootId);
        const sub = (n) => String(n).split('').map(d => '₀₁₂₃₄₅₆₇₈₉'[+d]).join('');
        return root.element + (h > 0 ? 'H' + (h > 1 ? sub(h) : '') : '');
    }
    return fragmentFormula(mol, rootId, centerId);
}

class StereoView {
    constructor(game) {
        this.game = game;
        this.picking = false; // 対象炭素の選択待ち状態
        this.modal = document.getElementById('stereo-modal');
        this.svg = document.getElementById('stereo-svg');
        this.captionEl = document.getElementById('stereo-caption');

        document.getElementById('btn-stereo').addEventListener('click', () => this.togglePicking());
        document.getElementById('btn-stereo-close').addEventListener('click', () => this.modal.classList.add('hidden'));
    }

    togglePicking() {
        this.picking = !this.picking;
        if (this.picking) {
            this.game.showToast('立体表示したい sp3炭素（すべて単結合の炭素）をキャンバスでクリックしてください。', 4000, 'success');
        } else {
            this.game.showToast('立体表示の選択を解除しました。', 1500, 'success');
        }
    }

    // キャンバスのクリック時に game 側から呼ばれる。選択モード中なら true を返して通常編集を止める
    handlePick(atom) {
        if (!this.picking) return false;
        this.picking = false;
        if (!atom || !this.game.userMolecule.isSp3Carbon(atom.id)) {
            this.game.showToast('sp3炭素（すべて単結合の炭素）を選んでください。二重・三重結合を持つ炭素や他の元素は対象外です。');
            return true;
        }
        this.show(atom);
        return true;
    }

    show(atom) {
        const mol = this.game.userMolecule;
        const labels = [];
        mol.getNeighbors(atom.id)
            .filter(n => n.atom.element !== 'H')
            .forEach(n => labels.push(substituentLabel(mol, n.atom.id, atom.id)));
        for (let i = 0; i < mol.getFreeValency(atom.id); i++) {
            labels.push('H');
        }

        // 大きい置換基から [上（紙面内）, 下（紙面内）, 右（手前くさび）, 左（奥・破線）] に配置（表示は一例）
        const sorted = [...labels].sort((a, b) => b.length - a.length || a.localeCompare(b));
        this.renderWedge(sorted[0], sorted[1], sorted[2], sorted[3]);

        // 教育文言と不斉判定の連携
        const isAsym = mol.isAsymmetricCarbon(atom.id);
        let stereoText;
        if (isAsym) {
            stereoText = `この炭素は不斉炭素です。4つの置換基（${labels.join('、')}）がすべて異なるため、鏡に映した分子とは重ね合わせられません（鏡像異性体が存在します）。`;
        } else {
            const seen = new Set();
            const dup = labels.find(l => seen.size === seen.add(l).size) ||
                        labels.find((l, i) => labels.indexOf(l) !== i);
            stereoText = `同じ置換基（${dup ?? labels[0]}）が複数あるため、この炭素は不斉炭素ではありません。`;
        }
        this.captionEl.textContent =
            '作図では90°の直交で描いていますが、実際のsp3炭素の結合角は約109.5°で、4つの置換基は正四面体の頂点方向に伸びています。\n' +
            '実線は紙面内、▶（黒いくさび）は紙面の手前、ハッシュ（刻み線）は紙面の奥への結合を表します。\n' +
            stereoText + '\n' +
            '※どの置換基を手前に描くかは一例です（回して描いても同じ分子です）。';
        this.modal.classList.remove('hidden');
    }

    // くさび形表記のSVGを描く（中心C、上下=紙面内、右=手前くさび、左=奥ハッシュ）
    renderWedge(upLabel, downLabel, frontLabel, backLabel) {
        const NS = 'http://www.w3.org/2000/svg';
        this.svg.innerHTML = '';
        const add = (el) => this.svg.appendChild(el);
        const line = (x1, y1, x2, y2, w = 2.5) => {
            const l = document.createElementNS(NS, 'line');
            l.setAttribute('x1', x1); l.setAttribute('y1', y1);
            l.setAttribute('x2', x2); l.setAttribute('y2', y2);
            l.setAttribute('stroke', 'rgba(255,255,255,0.75)');
            l.setAttribute('stroke-width', w);
            l.setAttribute('stroke-linecap', 'round');
            add(l);
        };
        const text = (x, y, str, size = 15, color = '#f5f6fa') => {
            const t = document.createElementNS(NS, 'text');
            t.setAttribute('x', x); t.setAttribute('y', y);
            t.setAttribute('text-anchor', 'middle');
            t.setAttribute('class', 'svg-atom-text');
            t.setAttribute('fill', color);
            t.style.fontSize = size + 'px';
            t.textContent = str;
            add(t);
        };

        // 紙面内の結合（上・下）
        line(0, -18, 0, -66);
        line(0, 18, 0, 66);
        // 手前（右）: 黒塗りくさび
        const wedge = document.createElementNS(NS, 'polygon');
        wedge.setAttribute('points', '16,0 66,-9 66,9');
        wedge.setAttribute('fill', 'rgba(255,255,255,0.85)');
        add(wedge);
        // 奥（左）: ハッシュ（中心に近いほど短い刻み線）
        for (let i = 0; i < 6; i++) {
            const x = -20 - i * 9;
            const h = 3.5 + i * 1.4;
            line(x, -h, x, h, 2.2);
        }

        // 中心炭素と置換基ラベル
        text(0, 5, 'C', 17, 'var(--color-c)');
        text(0, -78, upLabel);
        text(0, 88, downLabel);
        text(96, 5, frontLabel);
        text(-98, 5, backLabel);
    }
}
