"use strict";
/* model.js — 化学モデル（DOM非依存の純粋ロジック）
   化学種の定義・電離表・ステージ定義・原子数集計・係数判定。 */

const SPECIES = {
  // 分子（投入する形・式の項になる形）
  "HCl":     { disp: "HCl",      name: "塩化水素（塩酸）",   atoms: { H: 1, Cl: 1 },       charge: 0 },
  "NaOH":    { disp: "NaOH",     name: "水酸化ナトリウム",   atoms: { Na: 1, O: 1, H: 1 }, charge: 0 },
  "H2SO4":   { disp: "H₂SO₄",   name: "硫酸",               atoms: { H: 2, S: 1, O: 4 },  charge: 0 },
  "Ca(OH)2": { disp: "Ca(OH)₂", name: "水酸化カルシウム",   atoms: { Ca: 1, O: 2, H: 2 }, charge: 0 },
  "AgNO3":   { disp: "AgNO₃",   name: "硝酸銀",             atoms: { Ag: 1, N: 1, O: 3 }, charge: 0 },
  "BaCl2":   { disp: "BaCl₂",   name: "塩化バリウム",       atoms: { Ba: 1, Cl: 2 },      charge: 0 },
  "Na2CO3":  { disp: "Na₂CO₃", name: "炭酸ナトリウム",     atoms: { Na: 2, C: 1, O: 3 }, charge: 0 },
  "H2CO3":   { disp: "H₂CO₃",  name: "炭酸（不安定な中間体）", atoms: { H: 2, C: 1, O: 3 }, charge: 0 },
  "CO2":     { disp: "CO₂",     name: "二酸化炭素",         atoms: { C: 1, O: 2 },        charge: 0 },
  "H2O":     { disp: "H₂O",     name: "水",                 atoms: { H: 2, O: 1 },        charge: 0 },
  "NaCl":    { disp: "NaCl",     name: "塩化ナトリウム",     atoms: { Na: 1, Cl: 1 },      charge: 0 },
  "Na2SO4":  { disp: "Na₂SO₄", name: "硫酸ナトリウム",     atoms: { Na: 2, S: 1, O: 4 }, charge: 0 },
  "CaCl2":   { disp: "CaCl₂",   name: "塩化カルシウム",     atoms: { Ca: 1, Cl: 2 },      charge: 0 },
  "NaNO3":   { disp: "NaNO₃",   name: "硝酸ナトリウム",     atoms: { Na: 1, N: 1, O: 3 }, charge: 0 },
  "AgCl":    { disp: "AgCl",     name: "塩化銀（沈殿）",     atoms: { Ag: 1, Cl: 1 },      charge: 0 },
  "BaSO4":   { disp: "BaSO₄",   name: "硫酸バリウム（沈殿）", atoms: { Ba: 1, S: 1, O: 4 }, charge: 0 },
  // イオン
  "H+":      { disp: "H⁺",    name: "水素イオン",         atoms: { H: 1 },         charge: 1 },
  "OH-":     { disp: "OH⁻",   name: "水酸化物イオン",     atoms: { O: 1, H: 1 },   charge: -1 },
  "Na+":     { disp: "Na⁺",   name: "ナトリウムイオン",   atoms: { Na: 1 },        charge: 1 },
  "Cl-":     { disp: "Cl⁻",   name: "塩化物イオン",       atoms: { Cl: 1 },        charge: -1 },
  "SO4^2-":  { disp: "SO₄²⁻", name: "硫酸イオン",         atoms: { S: 1, O: 4 },   charge: -2 },
  "Ca^2+":   { disp: "Ca²⁺",  name: "カルシウムイオン",   atoms: { Ca: 1 },        charge: 2 },
  "Ag+":     { disp: "Ag⁺",   name: "銀イオン",           atoms: { Ag: 1 },        charge: 1 },
  "NO3-":    { disp: "NO₃⁻",  name: "硝酸イオン",         atoms: { N: 1, O: 3 },   charge: -1 },
  "Ba^2+":   { disp: "Ba²⁺",  name: "バリウムイオン",     atoms: { Ba: 1 },        charge: 2 },
  "CO3^2-":  { disp: "CO₃²⁻", name: "炭酸イオン",         atoms: { C: 1, O: 3 },   charge: -2 },
  // 酸化還元モード用
  "Zn":      { disp: "Zn",     name: "亜鉛（原子）",       atoms: { Zn: 1 },        charge: 0 },
  "Zn^2+":   { disp: "Zn²⁺",  name: "亜鉛イオン",         atoms: { Zn: 1 },        charge: 2 },
  "Cu":      { disp: "Cu",     name: "銅（原子）",         atoms: { Cu: 1 },        charge: 0 },
  "Cu^2+":   { disp: "Cu²⁺",  name: "銅(Ⅱ)イオン",       atoms: { Cu: 1 },        charge: 2 },
  "Ag":      { disp: "Ag",     name: "銀（原子）",         atoms: { Ag: 1 },        charge: 0 },
  "H2":      { disp: "H₂",    name: "水素",               atoms: { H: 2 },         charge: 0 },
  "e-":      { disp: "e⁻",    name: "電子",               atoms: {},               charge: -1 },
};

/* 強電解質の電離表（v1 は完全電離のみ扱う） */
const DISSOCIATION = {
  "HCl":     ["H+", "Cl-"],
  "NaOH":    ["Na+", "OH-"],
  "H2SO4":   ["H+", "H+", "SO4^2-"],
  "Ca(OH)2": ["Ca^2+", "OH-", "OH-"],
  "NaCl":    ["Na+", "Cl-"],
  "Na2SO4":  ["Na+", "Na+", "SO4^2-"],
  "CaCl2":   ["Ca^2+", "Cl-", "Cl-"],
  "AgNO3":   ["Ag+", "NO3-"],
  "NaNO3":   ["Na+", "NO3-"],
  "BaCl2":   ["Ba^2+", "Cl-", "Cl-"],
  "Na2CO3":  ["Na+", "Na+", "CO3^2-"],
};

/* 数合わせビューで「式の項」を粒に分解する表。
   電離表に加え、電離しない生成物（H₂O・不溶性の沈殿）も
   「どのイオンが結びついたものか」として見せる（表示専用の分解。化学的な電離ではない）。 */
const PARTS = Object.assign({
  "H2O":   ["H+", "OH-"],
  "AgCl":  ["Ag+", "Cl-"],
  "BaSO4": ["Ba^2+", "SO4^2-"],
  "H2CO3": ["H+", "H+", "CO3^2-"],
  "CO2":   ["CO2"],  // イオンに分解できない分子はそれ自身（gasGroup 経由で H₂CO₃ として扱う）
}, DISSOCIATION);

/* rules: ビーカー内の反応ルール（find の2イオンが出会うと make になる）。
   kind: "combine"=生成物が水中を浮遊 / "precipitate"=固体になり底に沈む。
   find は当面 1:1 の2種ペアのみ（DESIGN_reaction_types.md 参照）。 */
const STAGES = [
  {
    id: "s1",
    title: "ステージ1：塩酸 × 水酸化ナトリウム",
    reactants: ["HCl", "NaOH"],
    products: ["NaCl", "H2O"],
    answer: [1, 1, 1, 1],
    rules: [{ find: ["H+", "OH-"], make: "H2O", kind: "combine" }],
    netIon: "H⁺ ＋ OH⁻ → H₂O",
    intro: "HCl と NaOH を1個ずつ入れて、「反応させる」を押してみよう。",
    doneNote: "残ったイオンは反応しない「傍観イオン」で、水を蒸発させると塩（NaCl）として取り出せる。",
  },
  {
    id: "s2",
    title: "ステージ2：硫酸 × 水酸化ナトリウム",
    reactants: ["H2SO4", "NaOH"],
    products: ["Na2SO4", "H2O"],
    answer: [1, 2, 1, 2],
    rules: [{ find: ["H+", "OH-"], make: "H2O", kind: "combine" }],
    netIon: "H⁺ ＋ OH⁻ → H₂O",
    intro: "H₂SO₄ は H⁺ を2個出す。ちょうど中和するには NaOH が何個必要だろう？",
    doneNote: "残ったイオンは傍観イオンで、水を蒸発させると塩（Na₂SO₄）として取り出せる。",
  },
  {
    id: "s3",
    title: "ステージ3：塩酸 × 水酸化カルシウム",
    reactants: ["HCl", "Ca(OH)2"],
    products: ["CaCl2", "H2O"],
    answer: [2, 1, 1, 2],
    rules: [{ find: ["H+", "OH-"], make: "H2O", kind: "combine" }],
    netIon: "H⁺ ＋ OH⁻ → H₂O",
    intro: "Ca(OH)₂ は OH⁻ を2個出す。ちょうど中和するには HCl が何個必要だろう？",
    doneNote: "残ったイオンは傍観イオンで、水を蒸発させると塩（CaCl₂）として取り出せる。",
  },
  {
    id: "s4",
    title: "ステージ4：硝酸銀 × 塩化ナトリウム（沈殿）",
    reactants: ["AgNO3", "NaCl"],
    products: ["AgCl", "NaNO3"],
    answer: [1, 1, 1, 1],
    rules: [{ find: ["Ag+", "Cl-"], make: "AgCl", kind: "precipitate" }],
    netIon: "Ag⁺ ＋ Cl⁻ → AgCl↓",
    intro: "AgNO₃ と NaCl を入れて反応させてみよう。今度は水ではなく、白い沈殿ができる。",
    doneNote: "AgCl は水に溶けないので沈殿として底に積もる。Na⁺ と NO₃⁻ は溶けたまま（傍観イオン）。",
  },
  {
    id: "s5",
    title: "ステージ5：塩化バリウム × 硫酸ナトリウム（沈殿）",
    reactants: ["BaCl2", "Na2SO4"],
    products: ["BaSO4", "NaCl"],
    answer: [1, 1, 1, 2],
    rules: [{ find: ["Ba^2+", "SO4^2-"], make: "BaSO4", kind: "precipitate" }],
    netIon: "Ba²⁺ ＋ SO₄²⁻ → BaSO₄↓",
    intro: "白い沈殿 BaSO₄ ができる。沈殿にならないイオンが何個残るかに注目しよう。",
    doneNote: "BaSO₄ は水に溶けず沈殿する。Na⁺ と Cl⁻ は溶けたまま（傍観イオン。蒸発させると NaCl）。",
  },
  {
    id: "s6",
    title: "ステージ6：炭酸ナトリウム × 塩酸（気体発生）",
    reactants: ["Na2CO3", "HCl"],
    products: ["NaCl", "H2O", "CO2"],
    answer: [1, 2, 2, 1, 1],
    rules: [{ find: ["H+", "H+", "CO3^2-"], via: "H2CO3", make: ["H2O", "CO2"], kind: "gas" }],
    // 数合わせビューでは H₂O と CO₂ を「H₂CO₃ が分かれてできる組」として1列にまとめる
    gasGroup: { terms: ["H2O", "CO2"], via: "H2CO3" },
    netIon: "2H⁺ ＋ CO₃²⁻ → H₂O ＋ CO₂↑",
    intro: "Na₂CO₃ に塩酸を注ぐとシュワッと泡が出る。泡の正体を確かめよう。H⁺ は何個必要？",
    doneNote: "H⁺2個と CO₃²⁻ が組んで H₂CO₃（炭酸）になり、不安定なのですぐ H₂O と CO₂ に分かれる。CO₂ は泡になって空気中へ逃げる。",
  },
];

/* 表示時の元素の並び順（金属 → H → その他） */
const ELEMENT_ORDER = ["Na", "Ca", "Ag", "Ba", "Zn", "Cu", "H", "C", "N", "S", "O", "Cl"];

/* ---- 酸化還元モード（DESIGN_redox.md）---- */

/* 半反応式（部品）。left/right は e⁻ を含む項の一覧。原子・電荷保存はテストで検証 */
const HALF_REACTIONS = {
  "Zn_ox":  { disp: "Zn → Zn²⁺ ＋ 2e⁻", kind: "oxidation",
              left: [{ sp: "Zn", n: 1 }], right: [{ sp: "Zn^2+", n: 1 }, { sp: "e-", n: 2 }] },
  "Cu_ox":  { disp: "Cu → Cu²⁺ ＋ 2e⁻", kind: "oxidation",
              left: [{ sp: "Cu", n: 1 }], right: [{ sp: "Cu^2+", n: 1 }, { sp: "e-", n: 2 }] },
  "Cu_red": { disp: "Cu²⁺ ＋ 2e⁻ → Cu", kind: "reduction",
              left: [{ sp: "Cu^2+", n: 1 }, { sp: "e-", n: 2 }], right: [{ sp: "Cu", n: 1 }] },
  "Ag_red": { disp: "Ag⁺ ＋ e⁻ → Ag", kind: "reduction",
              left: [{ sp: "Ag+", n: 1 }, { sp: "e-", n: 1 }], right: [{ sp: "Ag", n: 1 }] },
  "H_red":  { disp: "2H⁺ ＋ 2e⁻ → H₂", kind: "reduction",
              left: [{ sp: "H+", n: 2 }, { sp: "e-", n: 2 }], right: [{ sp: "H2", n: 1 }] },
};

/* 半反応式の e⁻ の数（酸化なら出す数、還元なら受け取る数） */
function electronsOf(hr) {
  const all = [...hr.left, ...hr.right];
  return all.filter((t) => t.sp === "e-").reduce((s, t) => s + t.n, 0);
}

const REDOX_STAGES = [
  {
    id: "r1", title: "ステージ1：亜鉛 × 銅(Ⅱ)イオン",
    ox: "Zn_ox", red: "Cu_red", answer: [1, 1],
    intro: "硫酸銅水溶液に亜鉛板を入れると、板に赤い銅が付き、亜鉛が溶けていく。電子の動きを見よう。",
  },
  {
    id: "r2", title: "ステージ2：銅 × 銀イオン（銀樹）",
    ox: "Cu_ox", red: "Ag_red", answer: [1, 2],
    intro: "硝酸銀水溶液に銅線を入れると銀樹が育つ。Cu は e⁻ を2個出すが、Ag⁺ は1個ずつしか受け取れない。",
  },
  {
    id: "r3", title: "ステージ3：亜鉛 × 塩酸（水素発生）",
    ox: "Zn_ox", red: "H_red", answer: [1, 1],
    intro: "亜鉛に塩酸を注ぐと H₂ の泡が出る。e⁻ を受け取るのは H⁺ が2個で1組。",
  },
];

/* 倍率 a（酸化側）・b（還元側）の判定: e⁻ の授受が等しく、最簡整数比であること */
function checkRedoxMultipliers(stage, a, b) {
  if (![a, b].every((v) => Number.isInteger(v) && v >= 1)) {
    return { ok: false, reason: "倍率は1以上の整数で" };
  }
  const give = electronsOf(HALF_REACTIONS[stage.ox]) * a;
  const take = electronsOf(HALF_REACTIONS[stage.red]) * b;
  if (give !== take) {
    return { ok: false, reason: `出す e⁻（${give}個）と受け取る e⁻（${take}個）が合っていない`, give, take };
  }
  if (gcd2(a, b) !== 1) {
    return { ok: false, reason: "e⁻ は合っているが、倍率は最も簡単な整数比にしよう", give, take };
  }
  return { ok: true, give, take };
}

/* 半反応式×倍率を足し合わせ、両辺に現れる種（e⁻）を打ち消したイオン反応式を返す */
function combineHalves(stage, a, b) {
  const ox = HALF_REACTIONS[stage.ox], red = HALF_REACTIONS[stage.red];
  const L = {}, R = {};
  const add = (map, terms, k) => { for (const t of terms) map[t.sp] = (map[t.sp] || 0) + t.n * k; };
  add(L, ox.left, a); add(L, red.left, b);
  add(R, ox.right, a); add(R, red.right, b);
  for (const sp of Object.keys(L)) {
    if (R[sp]) {
      const c = Math.min(L[sp], R[sp]);
      L[sp] -= c; R[sp] -= c;
    }
  }
  const toTerms = (m) => Object.entries(m).filter(([, n]) => n > 0).map(([sp, n]) => ({ sp, n }));
  return { left: toTerms(L), right: toTerms(R) };
}

/* terms: [{sp, n}] → { atoms: {元素: 個数}, charge } */
function tallyTerms(terms) {
  const atoms = {};
  let charge = 0;
  for (const t of terms) {
    const sp = SPECIES[t.sp];
    for (const el of Object.keys(sp.atoms)) {
      atoms[el] = (atoms[el] || 0) + sp.atoms[el] * t.n;
    }
    charge += sp.charge * t.n;
  }
  return { atoms, charge };
}

/* 左辺・右辺の原子数と電荷を突き合わせる */
function compareSides(left, right) {
  const L = tallyTerms(left), R = tallyTerms(right);
  const els = [...new Set([...Object.keys(L.atoms), ...Object.keys(R.atoms)])];
  const idx = (el) => {
    const i = ELEMENT_ORDER.indexOf(el);
    return i === -1 ? 99 : i;
  };
  els.sort((a, b) => idx(a) - idx(b) || a.localeCompare(b));
  const rows = els.map((el) => ({
    el,
    left: L.atoms[el] || 0,
    right: R.atoms[el] || 0,
    ok: (L.atoms[el] || 0) === (R.atoms[el] || 0),
  }));
  const chargeOk = L.charge === R.charge;
  return {
    rows,
    chargeLeft: L.charge,
    chargeRight: R.charge,
    chargeOk,
    balanced: rows.every((r) => r.ok) && chargeOk,
  };
}

function gcd2(a, b) {
  while (b) { const t = a % b; a = b; b = t; }
  return a;
}

function gcdAll(nums) {
  return nums.reduce((a, b) => gcd2(a, b));
}

/* 左辺の係数だけを与えて「何が何個できるか」を計算する。
   イオンのプールから products の並び順に生成物を最大数つくり、残りを余りとして返す
   （現ステージでは生成物同士が同じイオンを奪い合わないため順序は結果に影響しない。
   競合する反応を扱うときはここを見直すこと）。 */
function simulateFormation(stage, leftCoeffs) {
  const pool = {};
  stage.reactants.forEach((sp, i) => {
    for (const ion of DISSOCIATION[sp]) pool[ion] = (pool[ion] || 0) + (leftCoeffs[i] || 0);
  });
  // gasGroup がある場合、該当2項（H₂O と CO₂ など）は中間体1項に置き換えて計算し、
  // 結果を両項へ同数として展開する
  let prods = stage.products.slice();
  if (stage.gasGroup) {
    prods = prods.filter((sp) => !stage.gasGroup.terms.includes(sp));
    prods.push(stage.gasGroup.via);
  }
  const formed = {};
  for (const prod of prods) {
    const need = {};
    for (const ion of PARTS[prod]) need[ion] = (need[ion] || 0) + 1;
    let n = Infinity;
    for (const ion of Object.keys(need)) n = Math.min(n, Math.floor((pool[ion] || 0) / need[ion]));
    formed[prod] = n;
    for (const ion of Object.keys(need)) pool[ion] -= need[ion] * n;
  }
  if (stage.gasGroup) {
    const n = formed[stage.gasGroup.via];
    delete formed[stage.gasGroup.via];
    for (const sp of stage.gasGroup.terms) formed[sp] = n;
  }
  const leftovers = {};
  for (const ion of Object.keys(pool)) if (pool[ion] > 0) leftovers[ion] = pool[ion];
  return { formed, leftovers };
}

/* coeffs: 反応物→生成物の順の係数配列。
   正否は模範との比較ではなく「原子数の保存＋最簡整数比」で判定する。 */
function checkStageCoeffs(stage, coeffs) {
  if (coeffs.some((c) => !Number.isInteger(c) || c < 1)) {
    return { ok: false, reason: "すべての係数を1以上の整数で入力してください" };
  }
  const left = stage.reactants.map((sp, i) => ({ sp, n: coeffs[i] }));
  const right = stage.products.map((sp, i) => ({ sp, n: coeffs[stage.reactants.length + i] }));
  const cmp = compareSides(left, right);
  if (!cmp.balanced) {
    return { ok: false, reason: "左右で原子の数が合っていません", cmp };
  }
  if (gcdAll(coeffs) !== 1) {
    return { ok: false, reason: "つり合っているけれど、係数は最も簡単な整数比にしよう", cmp };
  }
  return { ok: true, cmp };
}
