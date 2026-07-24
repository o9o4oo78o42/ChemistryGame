"use strict";
/* library.js — 反応ライブラリ（reactions.json）のローダと逆引きインデックス。
   DOM 非依存の純ロジック（buildReactionIndex）＋ fetch ローダ（loadReactionLibrary）。
   ゲームプレイ（app.js の STAGES）とは独立。インデックス/検索UI（Phase 2）の土台。 */

/* パース済み reactions.json → 検索用インデックス一式を構築する（純関数）。
   - byId:      id → 反応
   - bySpecies: 物質/イオン → [id]（登場物質からの逆引き検索）
   - byType:    分類（反応の型）→ [id]
   - bySalt:    塩の分類 → [id]
   - byUnit:    単元タグ → [id]
   - allSpecies: 登場する全物質（ソート済み。検索候補用） */
function buildReactionIndex(data) {
  const reactions = (data && data.reactions) || [];
  const byId = {};
  const bySpecies = {};
  const byType = {};
  const bySalt = {};
  const byUnit = {};
  const push = (map, key, id) => {
    if (key === null || key === undefined) return;
    (map[key] || (map[key] = [])).push(id);
  };
  for (const rx of reactions) {
    byId[rx.id] = rx;
    (rx.species || []).forEach((sp) => push(bySpecies, sp, rx.id));
    push(byType, rx.classes && rx.classes.type, rx.id);
    push(bySalt, rx.classes && rx.classes.saltType, rx.id);
    (rx.units || []).forEach((u) => push(byUnit, u, rx.id));
  }
  const allSpecies = Object.keys(bySpecies).sort();
  return { reactions, byId, bySpecies, byType, bySalt, byUnit, allSpecies };
}

/* reactions.json を取得してインデックスを構築する。成功時 window.IonLib に載せる。
   fetch を使うため file:// 直開きでは失敗する（＝サーバー必須。呼び出し側で握りつぶせば
   ゲームプレイは STAGES で継続＝両立）。 */
async function loadReactionLibrary(url) {
  const res = await fetch(url || "reactions.json", { cache: "no-store" });
  if (!res.ok) throw new Error("reactions.json の取得に失敗: " + res.status);
  const data = await res.json();
  const lib = buildReactionIndex(data);
  if (typeof window !== "undefined") window.IonLib = lib;
  return lib;
}

if (typeof window !== "undefined") {
  window.buildReactionIndex = buildReactionIndex;
  window.loadReactionLibrary = loadReactionLibrary;
}
