/**
 * Game Logic for Chem-Assembler
 * 逕ｻ髱｢縺ｮ謠冗判譖ｴ譁ｰ縲√う繝ｳ繧ｿ繝ｩ繧ｯ繧ｷ繝ｧ繝ｳ縲√せ繝��繧ｸ騾ｲ陦後√♀繧医�UI繧､繝吶Φ繝医ｒ蛻ｶconst STAGES = [
    // --- 繧ｷ繝ｪ繝ｼ繧ｺ: 蝓ｺ譛ｬ蛻�ｭ� ---
    {
        name: "豌ｴ",
        formula: "H2O",
        series: "蝓ｺ譛ｬ蛻�ｭ�",
        desc: "逕溷多縺ｫ荳榊庄谺�縺ｪ譛繧ょ渕譛ｬ逧�↑蛹門粋迚ｩ縺ｧ縺吶る�邏�蜴溷ｭ�(O)縺ｫ2縺､縺ｮ豌ｴ邏�蜴溷ｭ�(H)縺檎ｵ仙粋縺励※縺�∪縺吶�",
        hint: "驟ｸ邏�(O)繧�1縺､驟咲ｽｮ縺吶ｋ縺�縺代〒縲∬�蜍慕噪縺ｫ2縺､縺ｮ豌ｴ邏�(H)縺瑚｣懷ｮ後＆繧後∪縺吶�",
        createTarget: () => {
            const m = new Molecule();
            m.addAtom('O', 400, 300);
            return m;
        }
    },
    {
        name: "莠碁�蛹也く邏�",
        formula: "CO2",
        series: "蝓ｺ譛ｬ蛻�ｭ�",
        desc: "貂ｩ證門喧繧ｬ繧ｹ縺ｨ縺励※繧ら衍繧峨ｌ繧狗┌濶ｲ辟｡閾ｭ縺ｮ豌嶺ｽ薙らく邏�(C)繧剃ｸｭ蠢�↓縲∽ｸ｡蛛ｴ縺ｫ驟ｸ邏�(O)縺後◎繧後◇繧御ｺ碁㍾邨仙粋縺ｧ邨仙粋縺励※縺�∪縺吶�",
        hint: "C繧剃ｸｭ蠢�↓縲∝ｷｦ蜿ｳ縺ｮO縺ｸ縲御ｺ碁㍾邨仙粋縲阪ｒ郢九℃縺ｾ縺励ｇ縺��",
        createTarget: () => {
            const m = new Molecule();
            const c = m.addAtom('C', 400, 300);
            const o1 = m.addAtom('O', 320, 300);
            const o2 = m.addAtom('O', 480, 300);
            m.addBond(c.id, o1.id, 2);
            m.addBond(c.id, o2.id, 2);
            return m;
        }
    },
    {
        name: "繧ｨ繧ｿ繝弱�繝ｫ",
        formula: "CH3CH2OH",
        series: "蝓ｺ譛ｬ蛻�ｭ�",
        desc: "縺企�縺ｮ繧｢繝ｫ繧ｳ繝ｼ繝ｫ謌仙�縺ｧ縺ゅｊ縲∵ｶ域ｯ呈ｶｲ縺ｨ縺励※繧ゆｽｿ繧上ｌ縺ｾ縺吶�2縺､縺ｮ轤ｭ邏�(C)縺檎ｹ九′繧翫√◎縺ｮ遶ｯ縺ｫ繝偵ラ繝ｭ繧ｭ繧ｷ蝓ｺ(-OH)縺檎ｵ仙粋縺励※縺�∪縺吶�",
        hint: "C - C - O 縺ｮ鬆�↓蜊倡ｵ仙粋縺ｧ郢九℃縺ｾ縺励ｇ縺��縺ｯ閾ｪ蜍輔〒蜈･繧翫∪縺吶ょｮ倩�蝓ｺ繝代Ξ繝�ヨ縺ｮ縲�-OH縲阪ｒ菴ｿ縺�％縺ｨ繧ゅ〒縺阪∪縺吶�",
        createTarget: () => {
            const m = new Molecule();
            const c1 = m.addAtom('C', 360, 300);
            const c2 = m.addAtom('C', 440, 300);
            const o = m.addAtom('O', 520, 300);
            m.addBond(c1.id, c2.id, 1);
            m.addBond(c2.id, o.id, 1);
            return m;
        }
    },
    {
        name: "驟｢驟ｸ",
        formula: "CH3COOH",
        series: "蝓ｺ譛ｬ蛻�ｭ�",
        desc: "鬟滄�縺ｫ蜷ｫ縺ｾ繧後ｋ驟ｸ蜻ｳ謌仙�縲らく邏�(C)縺ｮ髫｣縺ｮ轤ｭ邏�縺ｫ縲∽ｺ碁㍾邨仙粋縺ｮ驟ｸ邏�(=O)縺ｨ蜊倡ｵ仙粋縺ｮ繝偵ラ繝ｭ繧ｭ繧ｷ蝓ｺ(-OH)縺檎ｹ九′縺｣縺ｦ縺�∪縺吶�",
        hint: "繧ｫ繝ｫ繝懊く繧ｷ蝓ｺ(-COOH)繧堤く邏�縺ｫ郢九＄縺九，-C繧堤ｹ九＞縺�蠕後∝�遶ｯ縺ｮC縺ｫ=O縺ｨ-OH繧呈焔蜍輔〒驟咲ｽｮ縺励∪縺吶�",
        createTarget: () => {
            const m = new Molecule();
            const c1 = m.addAtom('C', 360, 300);
            const c2 = m.addAtom('C', 440, 300);
            const o1 = m.addAtom('O', 440, 220); // =O
            const o2 = m.addAtom('O', 520, 300); // -OH
            m.addBond(c1.id, c2.id, 1);
            m.addBond(c2.id, o1.id, 2);
            m.addBond(c2.id, o2.id, 1);
            return m;
        }
    },
    {
        name: "繝吶Φ繧ｼ繝ｳ",
        formula: "C6H6",
        series: "蝓ｺ譛ｬ蛻�ｭ�",
        desc: "莉｣陦ｨ逧�↑闃ｳ鬥呎酪蛹門粋迚ｩ縲�6縺､縺ｮ轤ｭ邏�(C)縺悟�隗貞ｽ｢繧貞ｽ｢謌舌＠縲∝腰邨仙粋縺ｨ莠碁㍾邨仙粋縺御ｺ､莠偵↓驟咲ｽｮ�亥�魑ｴ�峨＠縺ｦ縺�∪縺吶�",
        hint: "縲後�繝ｳ繧ｼ繝ｳ迺ｰ縲阪Δ繧ｸ繝･繝ｼ繝ｫ繧剃ｽｿ縺｣縺ｦ荳逋ｺ驟咲ｽｮ縺吶ｋ縺ｨ邁｡蜊倥〒縺吶�",
        createTarget: () => {
            const m = new Molecule();
            const R = 40;
            const cx = 400, cy = 300;
            const cIds = [];
            for (let i = 0; i < 6; i++) {
                const ang = (i * Math.PI) / 3;
                const c = m.addAtom('C', cx + R * Math.cos(ang), cy + R * Math.sin(ang));
                cIds.push(c.id);
            }
            for (let i = 0; i < 6; i++) {
                const next = (i + 1) % 6;
                const bType = i % 2 === 0 ? 2 : 1;
                m.addBond(cIds[i], cIds[next], bType);
            }
            return m;
        }
    },
    {
        name: "荵ｳ驟ｸ",
        formula: "CH3CH(OH)COOH",
        series: "蝓ｺ譛ｬ蛻�ｭ�",
        desc: "驕句虚譎ゅ�逍ｲ蜉ｴ迚ｩ雉ｪ繧�√Κ繝ｼ繧ｰ繝ｫ繝医↑縺ｩ縺ｮ荵ｳ陬ｽ蜩√↓蜷ｫ縺ｾ繧後ｋ驟ｸ蜻ｳ謌仙�縲ゆｸｭ蠢��轤ｭ邏�(C)縺ｯ4縺､縺ｮ逡ｰ縺ｪ繧句次蟄仙屮��縲，H3縲＾H縲，OOH�峨→邨仙粋縺励※縺翫ｊ縲∽ｸ肴哩轤ｭ邏�蜴溷ｭ舌→縺ｪ縺｣縺ｦ縺�∪縺吶�",
        hint: "荳ｭ蠢��C縺九ｉ縲∝ｷｦ縺ｫC(繝｡繝√Ν蝓ｺ)縲∽ｸ翫↓O(繝偵ラ繝ｭ繧ｭ繧ｷ蝓ｺ)縲∝承縺ｫC(繧ｫ繝ｫ繝懊く繧ｷ蝓ｺ)繧貞腰邨仙粋縺ｧ莨ｸ縺ｰ縺励∪縺吶ゅ＆繧峨↓蜿ｳ縺ｮC縺ｫ縺ｯ荳翫↓=O縲∝承縺ｫ-OH繧帝�鄂ｮ縺励∪縺吶�",
        createTarget: () => {
            const m = new Molecule();
            const c1 = m.addAtom('C', 400, 300); // 荳肴哩轤ｭ邏�
            const c2 = m.addAtom('C', 358, 300); // 繝｡繝√Ν蝓ｺ
            const o1 = m.addAtom('O', 400, 258); // 繝偵ラ繝ｭ繧ｭ繧ｷ蝓ｺ
            const c3 = m.addAtom('C', 442, 300); // 繧ｫ繝ｫ繝懊く繧ｷ蝓ｺ轤ｭ邏�
            const o2 = m.addAtom('O', 442, 258); // 繧ｫ繝ｫ繝懊く繧ｷ蝓ｺ =O
            const o3 = m.addAtom('O', 484, 300); // 繧ｫ繝ｫ繝懊く繧ｷ蝓ｺ -OH

            m.addBond(c1.id, c2.id, 1);
            m.addBond(c1.id, o1.id, 1);
            m.addBond(c1.id, c3.id, 1);
            m.addBond(c3.id, o2.id, 2);
            m.addBond(c3.id, o3.id, 1);
            return m;
        }
    },
    {
        name: "繝励Ο繝壹Φ",
        formula: "C3H6",
        series: "蝓ｺ譛ｬ蛻�ｭ�",
        desc: "譛繧ょ腰邏斐↑繧｢繝ｫ繧ｱ繝ｳ�井ｺ碁㍾邨仙粋繧貞性繧轤ｭ邏�蛹門粋迚ｩ�峨�1縺､縲ゅ�繝ｩ繧ｹ繝√ャ繧ｯ�医�繝ｪ繝励Ο繝斐Ξ繝ｳ�峨�蜴滓侭縺ｨ縺励※蠎�￥逕ｨ縺�ｉ繧後∪縺吶�",
        hint: "3縺､縺ｮ轤ｭ邏�(C)繧堤ｹ九℃縲√◎縺ｮ縺�■1邂�園繧偵御ｺ碁㍾邨仙粋縲阪↓縺励∪縺吶ゆｺ碁㍾邨仙粋縺ｮ遶ｯ縺ｮC縺九ｉ120蠎ｦ譁ｹ蜷代↓邨仙粋縺悟ｺ�′繧翫∪縺吶�",
        createTarget: () => {
            const m = new Molecule();
            const c1 = m.addAtom('C', 358, 300);
            const c2 = m.addAtom('C', 400, 300);
            const c3 = m.addAtom('C', 442, 300);
            m.addBond(c1.id, c2.id, 1);
            m.addBond(c2.id, c3.id, 2);
            return m;
        }
    },
    {
        name: "繧｢繧ｻ繝√Ξ繝ｳ",
        formula: "C2H2",
        series: "蝓ｺ譛ｬ蛻�ｭ�",
        desc: "荳蛾㍾邨仙粋繧呈戟縺､譛繧ょ腰邏斐↑繧｢繝ｫ繧ｭ繝ｳ縲る�邏�縺ｨ豺ｷ縺懊※辯�┥縺輔○繧九→3000邃�ｒ雜�∴繧矩ｫ俶ｸｩ�磯�邏�繧｢繧ｻ繝√Ξ繝ｳ轤趣ｼ峨↓縺ｪ繧翫�≡螻槭�貅ｶ謗･縺ｫ菴ｿ繧上ｌ縺ｾ縺吶�",
        hint: "2縺､縺ｮ轤ｭ邏�(C)繧堤ｹ九℃縲√御ｸ蛾㍾邨仙粋縲阪↓螟画峩縺励∪縺吶よｰｴ邏�縺ｯ霆ｸ荳翫�逶ｴ邱壽婿蜷托ｼ�180蠎ｦ�峨↓逵溘▲逶ｴ縺蝉ｼｸ縺ｳ縺ｾ縺吶�",
        createTarget: () => {
            const m = new Molecule();
            const c1 = m.addAtom('C', 379, 300);
            const c2 = m.addAtom('C', 421, 300);
            m.addBond(c1.id, c2.id, 3);
            return m;
        }
    },
    {
        name: "繧｢繝ｩ繝九Φ",
        formula: "CH3CH(NH2)COOH",
        series: "蝓ｺ譛ｬ蛻�ｭ�",
        desc: "繧ｿ繝ｳ繝代け雉ｪ繧呈ｧ区�縺吶ｋ繧｢繝溘ヮ驟ｸ縺ｮ1縺､縲ゆｸｭ蠢��轤ｭ邏�縺ｯ4縺､縺ｮ逡ｰ縺ｪ繧九げ繝ｫ繝ｼ繝暦ｼ�縲√Γ繝√Ν蝓ｺ縲√い繝溘ヮ蝓ｺ縲√き繝ｫ繝懊く繧ｷ蝓ｺ�峨→邨仙粋縺励◆荳肴哩轤ｭ邏�縺ｧ縺吶�",
        hint: "遯堤ｴ�(N)縺悟�逋ｻ蝣ｴ�∽ｸｭ蠢��C縺九ｉ蟾ｦ縺ｫC縲∽ｸ翫↓N縲∝承縺ｫC繧貞腰邨仙粋縺ｧ郢九℃縺ｾ縺吶ょ承縺ｮC縺ｫ繧ｫ繝ｫ繝懊く繧ｷ蝓ｺ��=O 縺ｨ -OH�峨ｒ菴懊ｌ縺ｰ螳梧�縺ｧ縺吶�",
        createTarget: () => {
            const m = new Molecule();
            const c1 = m.addAtom('C', 400, 300); // 荳肴哩轤ｭ邏�
            const c2 = m.addAtom('C', 358, 300); // 繝｡繝√Ν蝓ｺ
            const n = m.addAtom('N', 400, 258);  // 繧｢繝溘ヮ蝓ｺ
            const c3 = m.addAtom('C', 442, 300); // 繧ｫ繝ｫ繝懊く繧ｷ轤ｭ邏�
            const o1 = m.addAtom('O', 442, 258); // =O
            const o2 = m.addAtom('O', 484, 300); // -OH
            
            m.addBond(c1.id, c2.id, 1);
            m.addBond(c1.id, n.id, 1);
            m.addBond(c1.id, c3.id, 1);
            m.addBond(c3.id, o1.id, 2);
            m.addBond(c3.id, o2.id, 1);
            return m;
        }
    },
    {
        name: "繧｢繧ｻ繝医ル繝医Μ繝ｫ",
        formula: "CH3CN",
        series: "蝓ｺ譛ｬ蛻�ｭ�",
        desc: "繧｢繧ｻ繝医ル繝医Μ繝ｫ縺ｯ縲∵･ｵ諤ｧ貅ｶ蟐偵ｄ蛹門ｭｦ蜷域� of 蜴滓侭縺ｨ縺励※驥崎ｦ√↑譛画ｩ溷喧蜷育黄縲らく邏�縺ｨ遯堤ｴ�縺ｮ髢薙↓荳蛾㍾邨仙粋(C竕｡N)繧呈戟縺｣縺ｦ縺�∪縺吶�",
        hint: "C - C - N 縺ｮ鬆�↓郢九℃縲，-N縺ｮ邨仙粋繧偵御ｸ蛾㍾邨仙粋縲阪↓繝医げ繝ｫ縺励∪縺吶ゆｸ蛾㍾邨仙粋縺ｫ繧医ｊ縲∝�蟄仙�菴薙′荳逶ｴ邱壹↓荳ｦ縺ｳ縺ｾ縺吶�",
        createTarget: () => {
            const m = new Molecule();
            const c1 = m.addAtom('C', 358, 300);
            const c2 = m.addAtom('C', 400, 300);
            const n = m.addAtom('N', 442, 300);
            m.addBond(c1.id, c2.id, 1);
            m.addBond(c2.id, n.id, 3);
            return m;
        }
    },

    // --- 繧ｷ繝ｪ繝ｼ繧ｺ: 鬟ｽ蜥檎く蛹匁ｰｴ邏� (繧｢繝ｫ繧ｫ繝ｳ繝ｻ逡ｰ諤ｧ菴�) ---
    {
        name: "繧ｨ繧ｿ繝ｳ",
        formula: "C2H6",
        series: "鬟ｽ蜥檎く蛹匁ｰｴ邏�",
        desc: "譛繧ょ腰邏斐↑轤ｭ邏�-轤ｭ邏�蜊倡ｵ仙粋繧呈戟縺､繧｢繝ｫ繧ｫ繝ｳ縺ｧ縺吶�",
        hint: "轤ｭ邏�(C)繧�2縺､蜊倡ｵ仙粋縺ｧ郢九℃縺ｾ縺吶�",
        createTarget: () => {
            const m = new Molecule();
            const c1 = m.addAtom('C', 379, 300);
            const c2 = m.addAtom('C', 421, 300);
            m.addBond(c1.id, c2.id, 1);
            return m;
        }
    },
    {
        name: "繝励Ο繝代Φ",
        formula: "C3H8",
        series: "鬟ｽ蜥檎く蛹匁ｰｴ邏�",
        desc: "螳ｶ蠎ｭ逕ｨ縺ｮLP繧ｬ繧ｹ縺ｮ荳ｻ謌仙�縺ｨ縺励※遏･繧峨ｌ繧狗く邏�謨ｰ3縺ｮ繧｢繝ｫ繧ｫ繝ｳ縺ｧ縺吶�",
        hint: "3縺､縺ｮ轤ｭ邏�(C)繧呈ｨｪ縺ｫ蜊倡ｵ仙粋縺ｧ郢九℃縺ｾ縺吶�",
        createTarget: () => {
            const m = new Molecule();
            const c1 = m.addAtom('C', 358, 300);
            const c2 = m.addAtom('C', 400, 300);
            const c3 = m.addAtom('C', 442, 300);
            m.addBond(c1.id, c2.id, 1);
            m.addBond(c2.id, c3.id, 1);
            return m;
        }
    },
    {
        name: "繝悶ち繝ｳ",
        formula: "C4H10",
        series: "鬟ｽ蜥檎く蛹匁ｰｴ邏�",
        desc: "繝ｩ繧､繧ｿ繝ｼ縺ｮ辯�侭縺ｪ縺ｩ縺ｫ菴ｿ繧上ｌ繧狗く邏�謨ｰ4縺ｮ逶ｴ骼悶い繝ｫ繧ｫ繝ｳ縺ｧ縺吶�",
        hint: "4縺､縺ｮ轤ｭ邏�(C)繧呈ｨｪ荳蛻励↓蜊倡ｵ仙粋縺ｧ郢九℃縺ｾ縺吶�",
        createTarget: () => {
            const m = new Molecule();
            const c1 = m.addAtom('C', 337, 300);
            const c2 = m.addAtom('C', 379, 300);
            const c3 = m.addAtom('C', 421, 300);
            const c4 = m.addAtom('C', 463, 300);
            m.addBond(c1.id, c2.id, 1);
            m.addBond(c2.id, c3.id, 1);
            m.addBond(c3.id, c4.id, 1);
            return m;
        }
    },
    {
        name: "繝壹Φ繧ｿ繝ｳ",
        formula: "C5H12",
        series: "鬟ｽ蜥檎く蛹匁ｰｴ邏�",
        desc: "轤ｭ邏�謨ｰ5縺ｮ逶ｴ骼悶い繝ｫ繧ｫ繝ｳ縺ｧ縺吶�",
        hint: "5縺､縺ｮ轤ｭ邏�(C)繧呈ｨｪ荳蛻励↓蜊倡ｵ仙粋縺ｧ郢九℃縺ｾ縺吶�",
        createTarget: () => {
            const m = new Molecule();
            const c1 = m.addAtom('C', 316, 300);
            const c2 = m.addAtom('C', 358, 300);
            const c3 = m.addAtom('C', 400, 300);
            const c4 = m.addAtom('C', 442, 300);
            const c5 = m.addAtom('C', 484, 300);
            m.addBond(c1.id, c2.id, 1);
            m.addBond(c2.id, c3.id, 1);
            m.addBond(c3.id, c4.id, 1);
            m.addBond(c4.id, c5.id, 1);
            return m;
        }
    },
    {
        name: "繝倥く繧ｵ繝ｳ",
        formula: "C6H14",
        series: "鬟ｽ蜥檎く蛹匁ｰｴ邏�",
        desc: "轤ｭ邏�謨ｰ6縺ｮ逶ｴ骼悶い繝ｫ繧ｫ繝ｳ縺ｧ縺吶よｺｶ蜑､縺ｪ縺ｩ縺ｫ繧医￥菴ｿ繧上ｌ縺ｾ縺吶�",
        hint: "6縺､縺ｮ轤ｭ邏�(C)繧呈ｨｪ荳蛻励↓蜊倡ｵ仙粋縺ｧ郢九℃縺ｾ縺吶�",
        createTarget: () => {
            const m = new Molecule();
            const c1 = m.addAtom('C', 295, 300);
            const c2 = m.addAtom('C', 337, 300);
            const c3 = m.addAtom('C', 379, 300);
            const c4 = m.addAtom('C', 421, 300);
            const c5 = m.addAtom('C', 463, 300);
            const c6 = m.addAtom('C', 505, 300);
            m.addBond(c1.id, c2.id, 1);
            m.addBond(c2.id, c3.id, 1);
            m.addBond(c3.id, c4.id, 1);
            m.addBond(c4.id, c5.id, 1);
            m.addBond(c5.id, c6.id, 1);
            return m;
        }
    },
    {
        name: "繝倥�繧ｿ繝ｳ",
        formula: "C7H16",
        series: "鬟ｽ蜥檎く蛹匁ｰｴ邏�",
        desc: "轤ｭ邏�謨ｰ7縺ｮ逶ｴ骼悶い繝ｫ繧ｫ繝ｳ縺ｧ縺吶�",
        hint: "7縺､縺ｮ轤ｭ邏�(C)繧呈ｨｪ荳蛻励↓蜊倡ｵ仙粋縺ｧ郢九℃縺ｾ縺吶�",
        createTarget: () => {
            const m = new Molecule();
            const c1 = m.addAtom('C', 274, 300);
            const c2 = m.addAtom('C', 316, 300);
            const c3 = m.addAtom('C', 358, 300);
            const c4 = m.addAtom('C', 400, 300);
            const c5 = m.addAtom('C', 442, 300);
            const c6 = m.addAtom('C', 484, 300);
            const c7 = m.addAtom('C', 526, 300);
            m.addBond(c1.id, c2.id, 1);
            m.addBond(c2.id, c3.id, 1);
            m.addBond(c3.id, c4.id, 1);
            m.addBond(c4.id, c5.id, 1);
            m.addBond(c5.id, c6.id, 1);
            m.addBond(c6.id, c7.id, 1);
            return m;
        }
    },
    {
        name: "2-繝｡繝√Ν繝励Ο繝代Φ",
        formula: "C4H10",
        series: "鬟ｽ蜥檎く蛹匁ｰｴ邏�",
        desc: "繝悶ち繝ｳ縺ｮ讒矩�逡ｰ諤ｧ菴難ｼ医う繧ｽ繝悶ち繝ｳ�峨〒縺吶�",
        hint: "荳ｭ蠢��轤ｭ邏�(C)縺九ｉ3譛ｬ縺ｮ轤ｭ邏�譫昴ｒ謾ｾ蟆�憾��蟄暦ｼ峨↓莨ｸ縺ｰ縺励∪縺吶�",
        createTarget: () => {
            const m = new Molecule();
            const c1 = m.addAtom('C', 400, 300);
            const c2 = m.addAtom('C', 358, 300);
            const c3 = m.addAtom('C', 442, 300);
            const c4 = m.addAtom('C', 400, 258);
            m.addBond(c1.id, c2.id, 1);
            m.addBond(c1.id, c3.id, 1);
            m.addBond(c1.id, c4.id, 1);
            return m;
        }
    },
    {
        name: "2-繝｡繝√Ν繝悶ち繝ｳ",
        formula: "C5H12",
        series: "鬟ｽ蜥檎く蛹匁ｰｴ邏�",
        desc: "繝壹Φ繧ｿ繝ｳ縺ｮ讒矩�逡ｰ諤ｧ菴難ｼ医う繧ｽ繝壹Φ繧ｿ繝ｳ�峨〒縺吶�",
        hint: "轤ｭ邏�4縺､縺ｮ逶ｴ骼悶ｒ菴懊ｊ縲∝ｷｦ縺九ｉ2逡ｪ逶ｮ縺ｮ轤ｭ邏�縺九ｉ荳翫↓繝｡繝√Ν蝓ｺ�育く邏�1縺､�峨ｒ莨ｸ縺ｰ縺励∪縺吶�",
        createTarget: () => {
            const m = new Molecule();
            const c1 = m.addAtom('C', 358, 300);
            const c2 = m.addAtom('C', 400, 300);
            const c3 = m.addAtom('C', 442, 300);
            const c4 = m.addAtom('C', 484, 300);
            const c5 = m.addAtom('C', 400, 258);
            m.addBond(c1.id, c2.id, 1);
            m.addBond(c2.id, c3.id, 1);
            m.addBond(c3.id, c4.id, 1);
            m.addBond(c2.id, c5.id, 1);
            return m;
        }
    },
    {
        name: "2,2-繧ｸ繝｡繝√Ν繝励Ο繝代Φ",
        formula: "C5H12",
        series: "鬟ｽ蜥檎く蛹匁ｰｴ邏�",
        desc: "繝壹Φ繧ｿ繝ｳ縺ｮ讒矩�逡ｰ諤ｧ菴難ｼ医ロ繧ｪ繝壹Φ繧ｿ繝ｳ�峨〒縺吶ょｯｾ遘ｰ諤ｧ縺ｮ鬮倥＞蜊∝ｭ玲ｧ矩�繧偵＠縺ｦ縺�∪縺吶�",
        hint: "荳ｭ蠢��轤ｭ邏�(C)縺九ｉ荳贋ｸ句ｷｦ蜿ｳ縺ｮ4譁ｹ蜷代↓轤ｭ邏�繧貞腰邨仙粋縺ｧ郢九℃縺ｾ縺吶�",
        createTarget: () => {
            const m = new Molecule();
            const c1 = m.addAtom('C', 400, 300);
            const c2 = m.addAtom('C', 358, 300);
            const c3 = m.addAtom('C', 442, 300);
            const c4 = m.addAtom('C', 400, 258);
            const c5 = m.addAtom('C', 400, 342);
            m.addBond(c1.id, c2.id, 1);
            m.addBond(c1.id, c3.id, 1);
            m.addBond(c1.id, c4.id, 1);
            m.addBond(c1.id, c5.id, 1);
            return m;
        }
    },
    {
        name: "2-繝｡繝√Ν繝壹Φ繧ｿ繝ｳ",
        formula: "C6H14",
        series: "鬟ｽ蜥檎く蛹匁ｰｴ邏�",
        desc: "繝倥く繧ｵ繝ｳ縺ｮ讒矩�逡ｰ諤ｧ菴薙�1縺､縺ｧ縺吶�",
        hint: "轤ｭ邏�5縺､縺ｮ逶ｴ骼悶ｒ菴懊ｊ縲∝ｷｦ縺九ｉ2逡ｪ逶ｮ縺ｮ轤ｭ邏�縺九ｉ荳翫↓繝｡繝√Ν蝓ｺ繧剃ｼｸ縺ｰ縺励∪縺吶�",
        createTarget: () => {
            const m = new Molecule();
            const c1 = m.addAtom('C', 316, 300);
            const c2 = m.addAtom('C', 358, 300);
            const c3 = m.addAtom('C', 400, 300);
            const c4 = m.addAtom('C', 442, 300);
            const c5 = m.addAtom('C', 484, 300);
            const c6 = m.addAtom('C', 358, 258);
            m.addBond(c1.id, c2.id, 1);
            m.addBond(c2.id, c6.id, 1);
            m.addBond(c2.id, c3.id, 1);
            m.addBond(c3.id, c4.id, 1);
            m.addBond(c4.id, c5.id, 1);
            return m;
        }
    },
    {
        name: "3-繝｡繝√Ν繝壹Φ繧ｿ繝ｳ",
        formula: "C6H14",
        series: "鬟ｽ蜥檎く蛹匁ｰｴ邏�",
        desc: "繝倥く繧ｵ繝ｳ縺ｮ讒矩�逡ｰ諤ｧ菴薙�1縺､縺ｧ縺吶�",
        hint: "轤ｭ邏�5縺､縺ｮ逶ｴ骼悶ｒ菴懊ｊ縲∽ｸｭ螟ｮ縺ｮ3逡ｪ逶ｮ縺ｮ轤ｭ邏�縺九ｉ荳翫↓繝｡繝√Ν蝓ｺ繧剃ｼｸ縺ｰ縺励∪縺吶�",
        createTarget: () => {
            const m = new Molecule();
            const c1 = m.addAtom('C', 316, 300);
            const c2 = m.addAtom('C', 358, 300);
            const c3 = m.addAtom('C', 400, 300);
            const c4 = m.addAtom('C', 442, 300);
            const c5 = m.addAtom('C', 484, 300);
            const c6 = m.addAtom('C', 400, 258);
            m.addBond(c1.id, c2.id, 1);
            m.addBond(c2.id, c3.id, 1);
            m.addBond(c3.id, c4.id, 1);
            m.addBond(c4.id, c5.id, 1);
            m.addBond(c3.id, c6.id, 1);
            return m;
        }
    },
    {
        name: "2,2-繧ｸ繝｡繝√Ν繝悶ち繝ｳ",
        formula: "C6H14",
        series: "鬟ｽ蜥檎く蛹匁ｰｴ邏�",
        desc: "繝倥く繧ｵ繝ｳ縺ｮ讒矩�逡ｰ諤ｧ菴薙�1縺､縺ｧ縺吶�",
        hint: "轤ｭ邏�4縺､縺ｮ逶ｴ骼悶ｒ菴懊ｊ縲∝ｷｦ縺九ｉ2逡ｪ逶ｮ縺ｮ轤ｭ邏�縺ｫ荳贋ｸ�2縺､縺ｮ繝｡繝√Ν蝓ｺ繧堤ｹ九℃縺ｾ縺吶�",
        createTarget: () => {
            const m = new Molecule();
            const c1 = m.addAtom('C', 358, 300);
            const c2 = m.addAtom('C', 400, 300);
            const c3 = m.addAtom('C', 442, 300);
            const c4 = m.addAtom('C', 484, 300);
            const c5 = m.addAtom('C', 400, 258);
            const c6 = m.addAtom('C', 400, 342);
            m.addBond(c1.id, c2.id, 1);
            m.addBond(c2.id, c3.id, 1);
            m.addBond(c3.id, c4.id, 1);
            m.addBond(c2.id, c5.id, 1);
            m.addBond(c2.id, c6.id, 1);
            return m;
        }
    },
    {
        name: "2,3-繧ｸ繝｡繝√Ν繝悶ち繝ｳ",
        formula: "C6H14",
        series: "鬟ｽ蜥檎く蛹匁ｰｴ邏�",
        desc: "繝倥く繧ｵ繝ｳ縺ｮ讒矩�逡ｰ諤ｧ菴薙�1縺､縺ｧ縺吶�",
        hint: "轤ｭ邏�4縺､縺ｮ逶ｴ骼悶ｒ菴懊ｊ縲∽ｸｭ螟ｮ縺ｮ2縺､縺ｮ轤ｭ邏��亥ｷｦ縺九ｉ2逡ｪ逶ｮ縺ｨ3逡ｪ逶ｮ�峨°繧峨◎繧後◇繧御ｸ翫↓繝｡繝√Ν蝓ｺ繧剃ｼｸ縺ｰ縺励∪縺吶�",
        createTarget: () => {
            const m = new Molecule();
            const c1 = m.addAtom('C', 358, 300);
            const c2 = m.addAtom('C', 400, 300);
            const c3 = m.addAtom('C', 442, 300);
            const c4 = m.addAtom('C', 484, 300);
            const c5 = m.addAtom('C', 400, 258);
            const c6 = m.addAtom('C', 442, 258);
            m.addBond(c1.id, c2.id, 1);
            m.addBond(c2.id, c3.id, 1);
            m.addBond(c3.id, c4.id, 1);
            m.addBond(c2.id, c5.id, 1);
            m.addBond(c3.id, c6.id, 1);
            return m;
        }
    },
    {
        name: "2-繝｡繝√Ν繝倥く繧ｵ繝ｳ",
        formula: "C7H16",
        series: "鬟ｽ蜥檎く蛹匁ｰｴ邏�",
        desc: "繝倥�繧ｿ繝ｳ縺ｮ讒矩�逡ｰ諤ｧ菴薙�1縺､縺ｧ縺吶�",
        hint: "轤ｭ邏�6縺､縺ｮ逶ｴ骼悶ｒ菴懊ｊ縲∝ｷｦ縺九ｉ2逡ｪ逶ｮ縺ｮ轤ｭ邏�縺九ｉ荳翫↓繝｡繝√Ν蝓ｺ繧剃ｼｸ縺ｰ縺励∪縺吶�",
        createTarget: () => {
            const m = new Molecule();
            const c1 = m.addAtom('C', 295, 300);
            const c2 = m.addAtom('C', 337, 300);
            const c3 = m.addAtom('C', 379, 300);
            const c4 = m.addAtom('C', 421, 300);
            const c5 = m.addAtom('C', 463, 300);
            const c6 = m.addAtom('C', 505, 300);
            const c7 = m.addAtom('C', 337, 258);
            m.addBond(c1.id, c2.id, 1);
            m.addBond(c2.id, c3.id, 1);
            m.addBond(c3.id, c4.id, 1);
            m.addBond(c4.id, c5.id, 1);
            m.addBond(c5.id, c6.id, 1);
            m.addBond(c2.id, c7.id, 1);
            return m;
        }
    },
    {
        name: "3-繝｡繝√Ν繝倥く繧ｵ繝ｳ",
        formula: "C7H16",
        series: "鬟ｽ蜥檎く蛹匁ｰｴ邏�",
        desc: "繝倥�繧ｿ繝ｳ縺ｮ讒矩�逡ｰ諤ｧ菴薙�1縺､縺ｧ縺吶ゅ％縺ｮ蛻�ｭ舌�3逡ｪ逶ｮ縺ｮ轤ｭ邏�縺御ｸ肴哩轤ｭ邏�縺ｫ縺ｪ繧翫∪縺吶�",
        hint: "轤ｭ邏�6縺､縺ｮ逶ｴ骼悶ｒ菴懊ｊ縲∝ｷｦ縺九ｉ3逡ｪ逶ｮ縺ｮ轤ｭ邏�縺九ｉ荳翫↓繝｡繝√Ν蝓ｺ繧剃ｼｸ縺ｰ縺励∪縺吶ゅ％縺ｮ3逡ｪ逶ｮ縺ｮ轤ｭ邏�縺御ｸ肴哩轤ｭ邏�縺ｧ縺吶�",
        createTarget: () => {
            const m = new Molecule();
            const c1 = m.addAtom('C', 295, 300);
            const c2 = m.addAtom('C', 337, 300);
            const c3 = m.addAtom('C', 379, 300); // 荳肴哩轤ｭ邏�
            const c4 = m.addAtom('C', 421, 300);
            const c5 = m.addAtom('C', 463, 300);
            const c6 = m.addAtom('C', 505, 300);
            const c7 = m.addAtom('C', 379, 258);
            m.addBond(c1.id, c2.id, 1);
            m.addBond(c2.id, c3.id, 1);
            m.addBond(c3.id, c4.id, 1);
            m.addBond(c4.id, c5.id, 1);
            m.addBond(c5.id, c6.id, 1);
            m.addBond(c3.id, c7.id, 1);
            return m;
        }
    },
    {
        name: "2,2-繧ｸ繝｡繝√Ν繝壹Φ繧ｿ繝ｳ",
        formula: "C7H16",
        series: "鬟ｽ蜥檎く蛹匁ｰｴ邏�",
        desc: "繝倥�繧ｿ繝ｳ縺ｮ讒矩�逡ｰ諤ｧ菴薙�1縺､縺ｧ縺吶�",
        hint: "轤ｭ邏�5縺､縺ｮ逶ｴ骼悶ｒ菴懊ｊ縲∝ｷｦ縺九ｉ2逡ｪ逶ｮ縺ｮ轤ｭ邏�縺ｫ荳贋ｸ�2縺､縺ｮ繝｡繝√Ν蝓ｺ繧堤ｹ九℃縺ｾ縺吶�",
        createTarget: () => {
            const m = new Molecule();
            const c1 = m.addAtom('C', 316, 300);
            const c2 = m.addAtom('C', 358, 300);
            const c3 = m.addAtom('C', 400, 300);
            const c4 = m.addAtom('C', 442, 300);
            const c5 = m.addAtom('C', 484, 300);
            const c6 = m.addAtom('C', 358, 258);
            const c7 = m.addAtom('C', 358, 342);
            m.addBond(c1.id, c2.id, 1);
            m.addBond(c2.id, c3.id, 1);
            m.addBond(c3.id, c4.id, 1);
            m.addBond(c4.id, c5.id, 1);
            m.addBond(c2.id, c6.id, 1);
            m.addBond(c2.id, c7.id, 1);
            return m;
        }
    },
    {
        name: "2,3-繧ｸ繝｡繝√Ν繝壹Φ繧ｿ繝ｳ",
        formula: "C7H16",
        series: "鬟ｽ蜥檎く蛹匁ｰｴ邏�",
        desc: "繝倥�繧ｿ繝ｳ縺ｮ讒矩�逡ｰ諤ｧ菴薙�1縺､縺ｧ縺吶�3逡ｪ逶ｮ縺ｮ轤ｭ邏�縺御ｸ肴哩轤ｭ邏�縺ｫ縺ｪ繧翫∪縺吶�",
        hint: "轤ｭ邏�5縺､縺ｮ逶ｴ骼悶ｒ菴懊ｊ縲∝ｷｦ縺九ｉ2逡ｪ逶ｮ縺ｨ3逡ｪ逶ｮ縺ｮ轤ｭ邏�縺九ｉ縺昴ｌ縺槭ｌ荳翫↓繝｡繝√Ν蝓ｺ繧剃ｼｸ縺ｰ縺励∪縺吶�3逡ｪ逶ｮ縺ｮ轤ｭ邏�縺御ｸ肴哩轤ｭ邏�縺ｧ縺吶�",
        createTarget: () => {
            const m = new Molecule();
            const c1 = m.addAtom('C', 316, 300);
            const c2 = m.addAtom('C', 358, 300);
            const c3 = m.addAtom('C', 400, 300); // 荳肴哩轤ｭ邏�
            const c4 = m.addAtom('C', 442, 300);
            const c5 = m.addAtom('C', 484, 300);
            const c6 = m.addAtom('C', 358, 258);
            const c7 = m.addAtom('C', 400, 258);
            m.addBond(c1.id, c2.id, 1);
            m.addBond(c2.id, c3.id, 1);
            m.addBond(c3.id, c4.id, 1);
            m.addBond(c4.id, c5.id, 1);
            m.addBond(c2.id, c6.id, 1);
            m.addBond(c3.id, c7.id, 1);
            return m;
        }
    },
    {
        name: "3,3-繧ｸ繝｡繝√Ν繝壹Φ繧ｿ繝ｳ",
        formula: "C7H16",
        series: "鬟ｽ蜥檎く蛹匁ｰｴ邏�",
        desc: "繝倥�繧ｿ繝ｳ縺ｮ讒矩�逡ｰ諤ｧ菴薙�1縺､縺ｧ縺吶�",
        hint: "轤ｭ邏�5縺､縺ｮ逶ｴ骼悶ｒ菴懊ｊ縲∽ｸｭ螟ｮ縺ｮ3逡ｪ逶ｮ縺ｮ轤ｭ邏�縺ｫ荳贋ｸ�2縺､縺ｮ繝｡繝√Ν蝓ｺ繧堤ｹ九℃縺ｾ縺吶�",
        createTarget: () => {
            const m = new Molecule();
            const c1 = m.addAtom('C', 316, 300);
            const c2 = m.addAtom('C', 358, 300);
            const c3 = m.addAtom('C', 400, 300);
            const c4 = m.addAtom('C', 442, 300);
            const c5 = m.addAtom('C', 484, 300);
            const c6 = m.addAtom('C', 400, 258);
            const c7 = m.addAtom('C', 400, 342);
            m.addBond(c1.id, c2.id, 1);
            m.addBond(c2.id, c3.id, 1);
            m.addBond(c3.id, c4.id, 1);
            m.addBond(c4.id, c5.id, 1);
            m.addBond(c3.id, c6.id, 1);
            m.addBond(c3.id, c7.id, 1);
            return m;
        }
    },
    {
        name: "2,4-繧ｸ繝｡繝√Ν繝壹Φ繧ｿ繝ｳ",
        formula: "C7H16",
        series: "鬟ｽ蜥檎く蛹匁ｰｴ邏�",
        desc: "繝倥�繧ｿ繝ｳ縺ｮ讒矩�逡ｰ諤ｧ菴薙�1縺､縺ｧ縺吶�",
        hint: "轤ｭ邏�5縺､縺ｮ逶ｴ骼悶ｒ菴懊ｊ縲∝ｷｦ縺九ｉ2逡ｪ逶ｮ縺ｨ4逡ｪ逶ｮ縺ｮ轤ｭ邏�縺九ｉ縺昴ｌ縺槭ｌ荳翫↓繝｡繝√Ν蝓ｺ繧剃ｼｸ縺ｰ縺励∪縺吶�",
        createTarget: () => {
            const m = new Molecule();
            const c1 = m.addAtom('C', 316, 300);
            const c2 = m.addAtom('C', 358, 300);
            const c3 = m.addAtom('C', 400, 300);
            const c4 = m.addAtom('C', 442, 300);
            const c5 = m.addAtom('C', 484, 300);
            const c6 = m.addAtom('C', 358, 258);
            const c7 = m.addAtom('C', 442, 258);
            m.addBond(c1.id, c2.id, 1);
            m.addBond(c2.id, c3.id, 1);
            m.addBond(c3.id, c4.id, 1);
            m.addBond(c4.id, c5.id, 1);
            m.addBond(c2.id, c6.id, 1);
            m.addBond(c4.id, c7.id, 1);
            return m;
        }
    },
    {
        name: "3-繧ｨ繝√Ν繝壹Φ繧ｿ繝ｳ",
        formula: "C7H16",
        series: "鬟ｽ蜥檎く蛹匁ｰｴ邏�",
        desc: "繝倥�繧ｿ繝ｳ縺ｮ讒矩�逡ｰ諤ｧ菴薙�1縺､縺ｧ縺吶�",
        hint: "轤ｭ邏�5縺､縺ｮ逶ｴ骼悶ｒ菴懊ｊ縲∽ｸｭ螟ｮ縺ｮ3逡ｪ逶ｮ縺ｮ轤ｭ邏�縺九ｉ荳翫↓繧ｨ繝√Ν蝓ｺ�育く邏�2縺､縺ｮ骼�: -CH2-CH3�峨ｒ莨ｸ縺ｰ縺励∪縺吶�",
        createTarget: () => {
            const m = new Molecule();
            const c1 = m.addAtom('C', 316, 300);
            const c2 = m.addAtom('C', 358, 300);
            const c3 = m.addAtom('C', 400, 300);
            const c4 = m.addAtom('C', 442, 300);
            const c5 = m.addAtom('C', 484, 300);
            const c6 = m.addAtom('C', 400, 258);
            const c7 = m.addAtom('C', 400, 216);
            m.addBond(c1.id, c2.id, 1);
            m.addBond(c2.id, c3.id, 1);
            m.addBond(c3.id, c4.id, 1);
            m.addBond(c4.id, c5.id, 1);
            m.addBond(c3.id, c6.id, 1);
            m.addBond(c6.id, c7.id, 1);
            return m;
        }
    },
    {
        name: "2,2,3-繝医Μ繝｡繝√Ν繝悶ち繝ｳ",
        formula: "C7H16",
        series: "鬟ｽ蜥檎く蛹匁ｰｴ邏�",
        desc: "繝倥�繧ｿ繝ｳ縺ｮ讒矩�逡ｰ諤ｧ菴薙�1縺､縺ｧ縺吶�3逡ｪ逶ｮ縺ｮ轤ｭ邏�縺御ｸ肴哩轤ｭ邏�縺ｫ縺ｪ繧翫∪縺吶�",
        hint: "轤ｭ邏�4縺､縺ｮ逶ｴ骼悶ｒ菴懊ｊ縲∝ｷｦ縺九ｉ2逡ｪ逶ｮ縺ｫ荳贋ｸ�2縺､縲�3逡ｪ逶ｮ縺ｫ荳翫↓1縺､縺ｮ繝｡繝√Ν蝓ｺ繧帝�鄂ｮ縺励∪縺吶�3逡ｪ逶ｮ縺ｮC縺御ｸ肴哩轤ｭ邏�縺ｧ縺吶�",
        createTarget: () => {
            const m = new Molecule();
            const c1 = m.addAtom('C', 358, 300);
            const c2 = m.addAtom('C', 400, 300);
            const c3 = m.addAtom('C', 442, 300); // 荳肴哩轤ｭ邏�
            const c4 = m.addAtom('C', 484, 300);
            const c5 = m.addAtom('C', 400, 258);
            const c6 = m.addAtom('C', 400, 342);
            const c7 = m.addAtom('C', 442, 258);
            m.addBond(c1.id, c2.id, 1);
            m.addBond(c2.id, c3.id, 1);
            m.addBond(c3.id, c4.id, 1);
            m.addBond(c2.id, c5.id, 1);
            m.addBond(c2.id, c6.id, 1);
            m.addBond(c3.id, c7.id, 1);
            return m;
        }
    }
];ｵ仙粋縲阪↓螟画峩縺励∪縺吶よｰｴ邏�縺ｯ霆ｸ荳翫�逶ｴ邱壽婿蜷托ｼ�180蠎ｦ�峨↓逵溘▲逶ｴ縺蝉ｼｸ縺ｳ縺ｾ縺吶�",
        createTarget: () => {
            const m = new Molecule();
            const c1 = m.addAtom('C', 379, 300);
            const c2 = m.addAtom('C', 421, 300);
            m.addBond(c1.id, c2.id, 3);
            return m;
        }
    },
    {
        name: "繧｢繝ｩ繝九Φ",
        formula: "CH竄イH(NH竄�)COOH",
        desc: "繧ｿ繝ｳ繝代け雉ｪ繧呈ｧ区�縺吶ｋ繧｢繝溘ヮ驟ｸ縺ｮ1縺､縲ゆｸｭ蠢��轤ｭ邏�縺ｯ4縺､縺ｮ逡ｰ縺ｪ繧九げ繝ｫ繝ｼ繝暦ｼ�縲√Γ繝√Ν蝓ｺ縲√い繝溘ヮ蝓ｺ縲√き繝ｫ繝懊く繧ｷ蝓ｺ�峨→邨仙粋縺励◆荳肴哩轤ｭ邏�縺ｧ縺吶�",
        hint: "遯堤ｴ�(N)縺悟�逋ｻ蝣ｴ�∽ｸｭ蠢��C縺九ｉ蟾ｦ縺ｫC縲∽ｸ翫↓N縲∝承縺ｫC繧貞腰邨仙粋縺ｧ郢九℃縺ｾ縺吶ょ承縺ｮC縺ｫ繧ｫ繝ｫ繝懊く繧ｷ蝓ｺ��=O 縺ｨ -OH�峨ｒ菴懊ｌ縺ｰ螳梧�縺ｧ縺吶�",
        createTarget: () => {
            const m = new Molecule();
            const c1 = m.addAtom('C', 400, 300); // 荳肴哩轤ｭ邏�
            const c2 = m.addAtom('C', 358, 300); // 繝｡繝√Ν蝓ｺ
            const n = m.addAtom('N', 400, 258);  // 繧｢繝溘ヮ蝓ｺ
            const c3 = m.addAtom('C', 442, 300); // 繧ｫ繝ｫ繝懊く繧ｷ轤ｭ邏�
            const o1 = m.addAtom('O', 442, 258); // =O
            const o2 = m.addAtom('O', 484, 300); // -OH
            
            m.addBond(c1.id, c2.id, 1);
            m.addBond(c1.id, n.id, 1);
            m.addBond(c1.id, c3.id, 1);
            m.addBond(c3.id, o1.id, 2);
            m.addBond(c3.id, o2.id, 1);
            return m;
        }
    },
    {
        name: "繧｢繧ｻ繝医ル繝医Μ繝ｫ",
        formula: "CH竄イN",
        desc: "繧｢繧ｻ繝医ル繝医Μ繝ｫ縺ｯ縲∵･ｵ諤ｧ貅ｶ蟐偵ｄ蛹門ｭｦ蜷域�縺ｮ蜴滓侭縺ｨ縺励※驥崎ｦ√↑譛画ｩ溷喧蜷育黄縲らく邏�縺ｨ遯堤ｴ�縺ｮ髢薙↓荳蛾㍾邨仙粋(C竕｡N)繧呈戟縺｣縺ｦ縺�∪縺吶�",
        hint: "C - C - N 縺ｮ鬆�↓郢九℃縲，-N縺ｮ邨仙粋繧偵御ｸ蛾㍾邨仙粋縲阪↓繝医げ繝ｫ縺励∪縺吶ゆｸ蛾㍾邨仙粋縺ｫ繧医ｊ縲∝�蟄仙�菴薙′荳逶ｴ邱壹↓荳ｦ縺ｳ縺ｾ縺吶�",
        createTarget: () => {
            const m = new Molecule();
            const c1 = m.addAtom('C', 358, 300);
            const c2 = m.addAtom('C', 400, 300);
            const n = m.addAtom('N', 442, 300);
            m.addBond(c1.id, c2.id, 1);
            m.addBond(c2.id, n.id, 3);
            return m;
        }
    }
];

class Game {
    constructor() {
        this.currentStageIndex = 0;
        this.userMolecule = new Molecule();
        this.selectedTool = 'select'; // 'select', 'bond', 'erase'
        this.selectedBondType = 1;     // 1, 2, 3
        this.selectedAtomType = 'C';   // 'C', 'O', 'N', 'Cl'
        this.selectedModule = null;    // 'benzene', 'oh', 'cooh', 'nh2'
        this.asymmetricMode = false;   // 荳肴哩轤ｭ邏�繝槭�繧ｯ繝｢繝ｼ繝峨′ ON 縺九←縺�°
        
        // 繝峨Λ繝�げ迥ｶ諷�
        this.isDragging = false;
        this.draggedAtom = null;
        this.bondStartAtom = null;
        
        // 螻･豁ｴ繧ｹ繧ｿ繝�け (邁｡譏填ndo逕ｨ)
        this.history = [];

        this.initDOMElements();
        this.initEventListeners();
        
        // 最初のシリーズの最初のステージをロード
        const firstStageIdx = parseInt(this.stageSelect.value);
        this.loadStage(isNaN(firstStageIdx) ? 0 : firstStageIdx);
    }

    initDOMElements() {
        this.svg = document.getElementById('chem-svg');
        this.atomsGroup = document.getElementById('atoms-group');
        this.bondsGroup = document.getElementById('bonds-group');
        this.uiGroup = document.getElementById('ui-group');
        
        this.coordDisplay = document.getElementById('coord-display');
        this.btnVerify = document.getElementById('btn-verify');
        this.btnClearAll = document.getElementById('btn-clear-all');
        this.seriesSelect = document.getElementById('select-series');
        this.stageSelect = document.getElementById('select-stage');
        
        this.targetName = document.getElementById('target-name');
        this.targetFormula = document.getElementById('target-formula');
        this.targetDesc = document.getElementById('target-desc');
        this.verifyResult = document.getElementById('verify-result');
        
        this.winModal = document.getElementById('win-modal');
        this.btnNextStage = document.getElementById('btn-next-stage');

        // 豁｣隗｣縺ｮ萓狗､ｺ繝ｻ荳肴哩轤ｭ邏�髢｢騾｣縺ｮDOM隕∫ｴ�
        this.btnShowTarget = document.getElementById('btn-show-target');
        this.btnCloseTarget = document.getElementById('btn-close-target');
        this.targetModal = document.getElementById('target-modal');
        this.checkAsymmetricMode = document.getElementById('check-asymmetric-mode');
        this.targetBonds = document.getElementById('target-bonds');
        this.targetAtoms = document.getElementById('target-atoms');
        this.winMolDetails = document.getElementById('win-mol-details');

        // 繧ｹ繝��繧ｸ驕ｸ謚櫁い縺ｮ霑ｽ蜉�
        // シリーズ選択肢の追加
        const seriesSet = new Set();
        STAGES.forEach(s => {
            if (s.series) seriesSet.add(s.series);
        });
        seriesSet.forEach(seriesName => {
            const opt = document.createElement('option');
            opt.value = seriesName;
            opt.textContent = seriesName;
            this.seriesSelect.appendChild(opt);
        });

        // 最初のシリーズのステージリストを初期構築
        if (this.seriesSelect.value) {
            this.updateStageOptions(this.seriesSelect.value);
        }
    }

    // 指定されたシリーズに属するステージで問題ドロップダウンを再構築する
    updateStageOptions(selectedSeries) {
        this.stageSelect.innerHTML = '';
        let count = 1;
        STAGES.forEach((stage, idx) => {
            if (stage.series === selectedSeries) {
                const opt = document.createElement('option');
                opt.value = idx;
                opt.textContent = `${count}. ${stage.name}`;
                this.stageSelect.appendChild(opt);
                count++;
            }
        });
    }

    initEventListeners() {
        // 繝��繝ｫ蛻�崛
        document.querySelectorAll('.tool-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.tool-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.selectedTool = btn.dataset.tool;
                this.selectedModule = null; // 繝｢繧ｸ繝･繝ｼ繝ｫ驕ｸ謚槭ｒ隗｣髯､
                document.querySelectorAll('.mod-btn').forEach(b => b.classList.remove('active'));
            });
        });

        // 邨仙粋謨ｰ蛻�崛
        document.querySelectorAll('.bond-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.bond-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.selectedBondType = parseInt(btn.dataset.bond);
                
                // 邨仙粋驕ｸ謚槭ｒ縺励◆蝣ｴ蜷医∵桃菴懊Δ繝ｼ繝峨ｒ蠑ｷ蛻ｶ逧�↓縲檎ｵ仙粋縲阪↓縺吶ｋ
                document.getElementById('btn-tool-bond').click();
            });
        });

        // 蜴溷ｭ仙�譖ｿ
        document.querySelectorAll('.atom-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.atom-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.selectedAtomType = btn.dataset.atom;
                this.selectedModule = null; // 繝｢繧ｸ繝･繝ｼ繝ｫ驕ｸ謚槭ｒ隗｣髯､
                document.querySelectorAll('.mod-btn').forEach(b => b.classList.remove('active'));
                
                // 蜴溷ｭ宣∈謚槭ｒ縺励◆蝣ｴ蜷医∵桃菴懊Δ繝ｼ繝峨ｒ蠑ｷ蛻ｶ逧�↓縲碁∈謚橸ｼ磯�鄂ｮ�峨阪↓縺吶ｋ
                document.getElementById('btn-tool-select').click();
            });
        });

        // 螳倩�蝓ｺ/迺ｰ繝｢繧ｸ繝･繝ｼ繝ｫ
        document.querySelectorAll('.mod-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const wasActive = btn.classList.contains('active');
                document.querySelectorAll('.mod-btn').forEach(b => b.classList.remove('active'));
                if (!wasActive) {
                    btn.classList.add('active');
                    this.selectedModule = btn.dataset.module;
                    // 繝｢繧ｸ繝･繝ｼ繝ｫ驟咲ｽｮ譎ゅ�荳譎ら噪縺ｫ驕ｸ謚槭ヤ繝ｼ繝ｫ謇ｱ縺�↓縺吶ｋ
                    this.selectedTool = 'select';
                    document.querySelectorAll('.tool-btn').forEach(b => b.classList.remove('active'));
                    document.getElementById('btn-tool-select').classList.add('active');
                } else {
                    this.selectedModule = null;
                }
            });
        });

        // 繧ｹ繝��繧ｸ螟画峩
        this.seriesSelect.addEventListener('change', (e) => {
            const selectedSeries = e.target.value;
            this.updateStageOptions(selectedSeries);
            const firstStageIdx = parseInt(this.stageSelect.value);
            if (!isNaN(firstStageIdx)) {
                this.loadStage(firstStageIdx);
            }
        });

        this.stageSelect.addEventListener('change', (e) => {
            this.loadStage(parseInt(e.target.value));
        });

        // 繧｢繧ｯ繧ｷ繝ｧ繝ｳ繝懊ち繝ｳ
        this.btnVerify.addEventListener('click', () => this.verifyCurrentStructure());
        this.btnClearAll.addEventListener('click', () => {
            this.saveState();
            this.userMolecule = new Molecule();
            this.fitCanvasToTarget();
            this.updateDrawing();
        });

        this.btnNextStage.addEventListener('click', () => {
            this.winModal.classList.add('hidden');
            
            // 現在のシリーズに属するステージの絶対インデックス一覧を取得
            const currentSeries = this.seriesSelect.value;
            const seriesStageIndices = [];
            STAGES.forEach((stage, idx) => {
                if (stage.series === currentSeries) {
                    seriesStageIndices.push(idx);
                }
            });
            
            // 現在の絶対インデックスの位置を探し、次へ進める
            const currentPos = seriesStageIndices.indexOf(this.currentStageIndex);
            let nextIdx = seriesStageIndices[0]; // デフォルトは最初に戻る
            if (currentPos !== -1 && currentPos + 1 < seriesStageIndices.length) {
                nextIdx = seriesStageIndices[currentPos + 1];
            }
            
            this.stageSelect.value = nextIdx;
            this.loadStage(nextIdx);
        });

        // 荳肴哩轤ｭ邏�繝槭�繧ｯ繝｢繝ｼ繝峨�ON/OFF蛻�ｊ譖ｿ縺�
        this.checkAsymmetricMode.addEventListener('change', (e) => {
            this.asymmetricMode = e.target.checked;
            this.clearUIOverlay();
            this.updateDrawing();
        });

        // 縺頑焔譛ｬ繝｢繝ｼ繝繝ｫ縺ｮ陦ｨ遉ｺ
        this.btnShowTarget.addEventListener('click', () => {
            this.renderTargetAnswer();
            this.targetModal.classList.remove('hidden');
        });

        this.btnCloseTarget.addEventListener('click', () => {
            this.targetModal.classList.add('hidden');
        });

        // SVG繧ｭ繝｣繝ｳ繝舌せ荳翫〒縺ｮ繧､繝ｳ繧ｿ繝ｩ繧ｯ繧ｷ繝ｧ繝ｳ
        this.svg.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        this.svg.addEventListener('mousedown', (e) => this.handleMouseDown(e));
        this.svg.addEventListener('mouseleave', () => this.clearUIOverlay());
        window.addEventListener('mouseup', (e) => this.handleMouseUp(e));
        
        // 繧ｭ繝ｼ繝懊�繝峨す繝ｧ繝ｼ繝医き繝�ヨ (Undo/Redo, 繝��繝ｫ蛻�崛縺ｪ縺ｩ)
        window.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
                e.preventDefault();
                this.undo();
            }
            if (e.key === 'Delete') {
                e.preventDefault();
                if (confirm("縺吶∋縺ｦ縺ｮ蜴溷ｭ舌→邨仙粋繧呈ｶ亥悉縺励∪縺吶°��")) {
                    this.saveState();
                    this.userMolecule = new Molecule();
                    this.fitCanvasToTarget();
                    this.updateDrawing();
                    this.verifyResult.classList.add('hidden');
                }
            }
        });
    }

    saveState() {
        // 邁｡譏薙ョ繧｣繝ｼ繝励さ繝斐�縺ｫ繧医ｋ迥ｶ諷九�菫晏ｭ�
        const serialized = JSON.stringify({
            atoms: this.userMolecule.atoms,
            bonds: this.userMolecule.bonds,
            deletedBonds: this.userMolecule.deletedBonds
        });
        this.history.push(serialized);
        if (this.history.length > 30) this.history.shift(); // 螻･豁ｴ譛螟ｧ30莉ｶ
    }

    undo() {
        if (this.history.length === 0) return;
        const previousState = JSON.parse(this.history.pop());
        
        this.userMolecule = new Molecule();
        if (previousState.deletedBonds) {
            this.userMolecule.deletedBonds = previousState.deletedBonds;
        }
        previousState.atoms.forEach(a => {
            const atom = new Atom(a.id, a.element, a.x, a.y, a.isLocked);
            if (a.benzeneCenter) atom.benzeneCenter = a.benzeneCenter;
            if (a.benzeneAngle !== undefined) atom.benzeneAngle = a.benzeneAngle;
            this.userMolecule.atoms.push(atom);
        });
        previousState.bonds.forEach(b => {
            this.userMolecule.bonds.push(new Bond(b.atomId1, b.atomId2, b.type));
        });
        this.updateDrawing();
        this.verifyResult.classList.add('hidden');
    }

    loadStage(index) {
        this.currentStageIndex = index;
        this.userMolecule = new Molecule();
        this.history = [];
        
        // ドロップダウンの表示を同期させる
        const loadedStage = STAGES[index];
        if (loadedStage) {
            if (this.seriesSelect && this.seriesSelect.value !== loadedStage.series) {
                this.seriesSelect.value = loadedStage.series;
                this.updateStageOptions(loadedStage.series);
            }
            if (this.stageSelect && parseInt(this.stageSelect.value) !== index) {
                this.stageSelect.value = index;
            }
        }
        
        // 荳肴哩轤ｭ邏�繝｢繝ｼ繝峨ｒ隗｣髯､繝ｻ繝√ぉ繝�け繝懊ャ繧ｯ繧ｹ繧丹FF縺ｫ蛻晄悄蛹�
        this.asymmetricMode = false;
        if (this.checkAsymmetricMode) {
            this.checkAsymmetricMode.checked = false;
        }

        const stage = STAGES[index];
        this.targetName.textContent = stage.name;
        this.targetFormula.textContent = stage.formula;
        this.targetDesc.textContent = stage.desc;
        this.verifyResult.classList.add('hidden');
        
        this.fitCanvasToTarget(); // 繧ｹ繝��繧ｸ縺ｮ繧ｿ繝ｼ繧ｲ繝�ヨ繧ｵ繧､繧ｺ縺ｫ閾ｪ蜍輔ヵ繧｣繝�ヨ
        this.updateDrawing();
    }

    // 繝槭え繧ｹ菴咲ｽｮ縺九ｉ繧ｰ繝ｪ繝�ラ蠎ｧ讓吶∈縺ｮ繧ｹ繝翫ャ繝� (蠅礼ｯ牙庄閭ｽ莠､轤ｹ縺ｸ縺ｮ繝槭げ繝阪ャ繝亥精逹)
    getSnappedCoords(e) {
        const rect = this.svg.getBoundingClientRect();
        const rawX = e.clientX - rect.left;
        const rawY = e.clientY - rect.top;
        
        // 迴ｾ蝨ｨ縺ｮ viewBox 蛟､繧貞虚逧�↓蜿門ｾ励＠縺ｦ豁｣遒ｺ縺ｫ繧ｹ繧ｱ繝ｼ繝ｫ��が繝輔そ繝�ヨ螟画鋤
        const viewBox = this.svg.viewBox.baseVal;
        const vx = viewBox.x;
        const vy = viewBox.y;
        const vw = viewBox.width;
        const vh = viewBox.height;
        
        const scaleX = vw / rect.width;
        const scaleY = vh / rect.height;
        const x = vx + rawX * scaleX;
        const y = vy + rawY * scaleY;
        
        // 1. 蛻晏屓縺ｮ驟咲ｽｮ�医く繝｣繝ｳ繝舌せ縺ｫ縺ｾ縺�驥榊次蟄舌′縺ｪ縺��ｴ蜷茨ｼ�
        const heavyAtoms = this.userMolecule.atoms.filter(a => a.element !== 'H');
        if (heavyAtoms.length === 0) {
            const snapX = Math.round(x / GRID_SIZE) * GRID_SIZE;
            const snapY = Math.round(y / GRID_SIZE) * GRID_SIZE;
            return { x: snapX, y: snapY, rawX: x, rawY: y, isValid: true };
        }
        
        // 2. 縺吶〒縺ｫ蜴溷ｭ舌′縺ゅｋ蝣ｴ蜷茨ｼ壽磁邯壼庄閭ｽ縺ｪ縲梧ｭ｣隕上�蠅礼ｯ牙庄閭ｽ蠎ｧ讓吶阪ｒ縺吶∋縺ｦ繝ｪ繧ｹ繝医い繝��
        const validCoords = [];
        this.userMolecule.atoms.forEach(atom => {
            if (atom.element === 'H') return;
            
            // 謗･邯壼�縺ｮ蜴溷ｭ舌↓遨ｺ縺咲ｵ仙粋謇九′縺ゅｋ蝣ｴ蜷医�縺ｿ縲∝捉繧翫↓謗･邯壼庄閭ｽ
            if (this.userMolecule.getFreeValency(atom.id) < 1) return;

            const dirs = [];

            // 繝吶Φ繧ｼ繝ｳ迺ｰ縺ｮ轤ｭ邏�縲√∪縺溘� C=C 莠碁㍾邨仙粋繧呈戟縺､轤ｭ邏�縺ｧ縺ゅｋ縺九�蛻､螳�
            const isBenzeneAtom = !!(atom.benzeneCenter && atom.benzeneAngle !== undefined);
            
            let isDoubleBondC = false;
            let dbNeighbor = null;
            if (atom.element === 'C') {
                const neighbors = this.userMolecule.getNeighbors(atom.id);
                dbNeighbor = neighbors.find(n => n.atom.element === 'C' && n.type === 2);
                if (dbNeighbor) {
                    isDoubleBondC = true;
                }
            }

            if (isBenzeneAtom) {
                // 縲舌�繝ｳ繧ｼ繝ｳ迺ｰ轤ｭ邏�縲代�繝ｳ繧ｼ繝ｳ迺ｰ縺ｮ螟門�縺ｸ縺ｮ蟒ｶ髟ｷ邱壻ｸ翫せ繝翫ャ繝励ぎ繧､繝臥せ縺ｮ縺ｿ霑ｽ蜉� (逶ｴ隗�4譁ｹ蜷代�霑ｽ蜉�縺励↑縺�)
                dirs.push({
                    x: atom.benzeneCenter.x + (GRID_SIZE * 1.666) * Math.cos(atom.benzeneAngle),
                    y: atom.benzeneCenter.y + (GRID_SIZE * 1.666) * Math.sin(atom.benzeneAngle)
                });
            } else if (isDoubleBondC && dbNeighbor) {
                // 縲燭=C莠碁㍾邨仙粋轤ｭ邏�縲台ｺ碁㍾邨仙粋縺ｮ逶ｸ謇九°繧�120蠎ｦ螟門�縺ｮ2譁ｹ蜷代�縺ｿ霑ｽ蜉� (逶ｴ隗�4譁ｹ蜷代�霑ｽ蜉�縺励↑縺�)
                const baseAngle = Math.atan2(dbNeighbor.atom.y - atom.y, dbNeighbor.atom.x - atom.x);
                const angles = [baseAngle + (2 * Math.PI) / 3, baseAngle - (2 * Math.PI) / 3];
                angles.forEach(ang => {
                    dirs.push({
                        x: atom.x + GRID_SIZE * Math.cos(ang),
                        y: atom.y + GRID_SIZE * Math.sin(ang)
                    });
                });
            } else {
                // 縲宣壼ｸｸ縺ｮ蜴溷ｭ� (sp3轤ｭ邏�縺ｪ縺ｩ)縲第ｰｴ蟷ｳ繝ｻ蝙ら峩譁ｹ蜷代� GRID_SIZE 髮｢繧後◆4莠､轤ｹ
                dirs.push(
                    { x: atom.x + GRID_SIZE, y: atom.y },
                    { x: atom.x - GRID_SIZE, y: atom.y },
                    { x: atom.x, y: atom.y + GRID_SIZE },
                    { x: atom.x, y: atom.y - GRID_SIZE }
                );
            }

            // 縺吶〒縺ｫ莉悶�驥榊次蟄舌′鄂ｮ縺九ｌ縺ｦ縺�ｋ蠎ｧ讓吶�髯､螟�
            dirs.forEach(pt => {
                const existing = this.findAtomAt(pt.x, pt.y, 8);
                if (!existing) {
                    validCoords.push(pt);
                }
            });
        });

        // 繝槭え繧ｹ蠎ｧ讓吶↓譛繧りｿ代＞譛牙柑縺ｪ蠎ｧ讓吶ｒ謗｢縺�
        let bestCoord = null;
        let minDistance = 35; // 繧ｹ繝翫ャ繝怜精逹縺励″縺�､ (35px莉･蜀�↑繧峨�繧ｰ繝阪ャ繝亥精逹)

        validCoords.forEach(pt => {
            const dx = pt.x - x;
            const dy = pt.y - y;
            const dist = Math.sqrt(dx*dx + dy*dy);
            if (dist < minDistance) {
                minDistance = dist;
                bestCoord = pt;
            }
        });

        if (bestCoord) {
            // 繧ｹ繝翫ャ繝怜庄閭ｽ縺ｪ轤ｹ縺瑚ｦ九▽縺九▲縺�
            return { x: bestCoord.x, y: bestCoord.y, rawX: x, rawY: y, isValid: true };
        } else {
            // 遽�峇螟厄ｼ夐�鄂ｮ荳榊庄�亥精逹縺帙★蝓ｺ譛ｬ繧ｰ繝ｪ繝�ラ繧定ｿ斐☆縺� isValid = false��
            const snapX = Math.round(x / GRID_SIZE) * GRID_SIZE;
            const snapY = Math.round(y / GRID_SIZE) * GRID_SIZE;
            return { x: snapX, y: snapY, rawX: x, rawY: y, isValid: false };
        }
    }

    handleMouseMove(e) {
        const coords = this.getSnappedCoords(e);
        this.coordDisplay.textContent = `X: ${Math.round(coords.rawX)}, Y: ${Math.round(coords.rawY)} (Snap: ${coords.x}, ${coords.y})`;
        
        // 1. 邨仙粋邱壹ラ繝ｩ繝�げ荳ｭ縺ｮ繝励Ξ繝薙Η繝ｼ謠冗判
        if (this.selectedTool === 'bond' && this.isDragging && this.bondStartAtom) {
            this.drawBondPreview(this.bondStartAtom.x, this.bondStartAtom.y, coords.rawX, coords.rawY);
        }
        // 2. 蜴溷ｭ宣�鄂ｮ繝｢繝ｼ繝会ｼ医ヤ繝ｼ繝ｫ縺� 'select' 縺九▽ 繝｢繧ｸ繝･繝ｼ繝ｫ縺碁∈謚槭＆繧後※縺�↑縺�√°縺､ 繝峨Λ繝�げ遘ｻ蜍穂ｸｭ縺ｧ縺ｪ縺�√°縺､ 繝槭え繧ｹ縺ｮ荳九↓譌｢蟄伜次蟄舌′縺ｪ縺�ｼ�
        else if (this.selectedTool === 'select' && !this.selectedModule && !this.isDragging) {
            const clickedAtom = this.findAtomAt(coords.rawX, coords.rawY);
            
            if (!clickedAtom && coords.isValid) {
                // 譛繧りｿ代＞隕ｪ蜴溷ｭ舌ｒ謗｢縺励※繝励Ξ繝薙Η繝ｼ縺ｫ郢九＄邨仙粋繧呈緒縺�
                const nearest = this.findNearestAtom(coords.x, coords.y);
                const parentAtom = nearest ? nearest.atom : null;
                this.drawAtomPreview(this.selectedAtomType, coords.x, coords.y, parentAtom);
            } else {
                // 譛牙柑縺ｪ菴咲ｽｮ縺ｧ縺ｪ縺�√∪縺溘�譌｢蟄倥い繝医Β縺ｮ荳翫↑繧峨�繝ｬ繝薙Η繝ｼ繧呈ｶ亥悉
                this.clearUIOverlay();
            }
        }
    }

    handleMouseDown(e) {
        const coords = this.getSnappedCoords(e);
        const clickedAtom = this.findAtomAt(coords.rawX, coords.rawY);
        
        // --- 荳肴哩轤ｭ邏�繝槭�繧ｯ繝｢繝ｼ繝� (ON) 譎ゅ�迚ｹ蛻･蜃ｦ逅� ---
        if (this.asymmetricMode) {
            if (clickedAtom && clickedAtom.element === 'C') {
                this.saveState();
                clickedAtom.isAsymmetricMarked = !clickedAtom.isAsymmetricMarked;
                this.updateDrawing();
            }
            return; // 荳肴哩繝槭�繧ｯ繝｢繝ｼ繝画凾縺ｯ莉悶�驟咲ｽｮ/邱ｨ髮�虚菴懊ｒ螳悟�縺ｫ繝悶Ο繝�け
        }

        if (this.selectedTool === 'select') {
            if (this.selectedModule) {
                // 繝｢繧ｸ繝･繝ｼ繝ｫ�亥ｮ倩�蝓ｺ/迺ｰ�蛾�鄂ｮ蜃ｦ逅�
                this.placeModule(this.selectedModule, coords.x, coords.y, clickedAtom);
                this.selectedModule = null;
                document.querySelectorAll('.mod-btn').forEach(b => b.classList.remove('active'));
            } else if (clickedAtom) {
                if (clickedAtom.element === this.selectedAtomType && !clickedAtom.isLocked && !clickedAtom.benzeneCenter) {
                    // 蜷後§蜴溷ｭ千ｨｮ繧帝㍾縺ｭ縺ｦ繧ｯ繝ｪ繝�け縺励◆蝣ｴ蜷医�蜑企勁 (繝吶Φ繧ｼ繝ｳ迺ｰ繝｢繧ｸ繝･繝ｼ繝ｫ縺ｮ蜴溷ｭ蝉ｻ･螟�)
                    this.saveState();
                    this.userMolecule.removeAtom(clickedAtom.id);
                    this.autoCleanIsolatedAtoms(); // 蟄､遶九＠縺溷次蟄舌�閾ｪ蜍墓ｶ亥悉
                    this.autoLayoutBonds();
                    this.updateDrawing();
                } else {
                    // 縲先怙譁ｰ繝ｫ繝ｼ繝ｫ縲大挨蜈�ｴ�縺ｸ縺ｮ逶ｴ謗･荳頑嶌縺阪ｒ蟒�ｭ｢縲ら焚縺ｪ繧句�邏�縺ｾ縺溘�繝ｭ繝�け縺輔ｌ縺溷次蟄舌ｒ繧ｯ繝ｪ繝�け縺励◆蝣ｴ蜷医�遘ｻ蜍輔ラ繝ｩ繝�げ繧帝幕蟋�
                    this.isDragging = true;
                    this.draggedAtom = clickedAtom;
                    this.saveState();
                }
            } else {
                // 遨ｺ縺榊慍繧偵け繝ｪ繝�け縺励◆繧牙次蟄舌ｒ譁ｰ隕城�鄂ｮ (譛牙柑縺ｪ蠅礼ｯ臥せ縺ｧ縺ゅｌ縺ｰ繧ｵ繧､繝ｬ繝ｳ繝医↓驟咲ｽｮ)
                if (coords.isValid) {
                    this.saveState();
                    this.userMolecule.addAtom(this.selectedAtomType, coords.x, coords.y);
                    this.autoConnectAdjacentAtoms();
                    this.autoLayoutBonds();
                    this.updateDrawing();
                }
            }
        } else if (this.selectedTool === 'bond') {
            if (clickedAtom) {
                // 邨仙粋縺ｮ謠冗判髢句ｧ�
                this.isDragging = true;
                this.bondStartAtom = clickedAtom;
            }
        } else if (this.selectedTool === 'erase') {
            // 豸医＠繧ｴ繝�繝��繝ｫ: 蜴溷ｭ舌∪縺溘�邨仙粋繧呈ｶ亥悉
            this.saveState();
            if (clickedAtom) {
                this.userMolecule.removeAtom(clickedAtom.id);
                this.autoCleanIsolatedAtoms();
            } else {
                // 邨仙粋邱壹�繧ｯ繝ｪ繝�け蛻､螳�
                const clickedBond = this.findBondAt(coords.rawX, coords.rawY);
                if (clickedBond) {
                    this.userMolecule.removeBond(clickedBond.atomId1, clickedBond.atomId2);
                    this.autoCleanIsolatedAtoms();
                }
            }
            this.autoLayoutBonds();
            this.updateDrawing();
        }
    }

    handleMouseUp(e) {
        if (!this.isDragging) return;
        
        const coords = this.getSnappedCoords(e);
        
        if (this.selectedTool === 'select' && this.draggedAtom) {
            // 遘ｻ蜍輔ラ繝ｩ繝�げ邨ゆｺ�ｼ壹せ繝翫ャ繝怜ｺｧ讓吶↓蝗ｺ螳�
            this.draggedAtom.x = coords.x;
            this.draggedAtom.y = coords.y;
            this.autoConnectAdjacentAtoms();
            this.autoLayoutBonds();
            this.updateDrawing();
        } else if (this.selectedTool === 'bond' && this.bondStartAtom) {
            const endAtom = this.findAtomAt(coords.rawX, coords.rawY);
            // 蛻･縺ｮ蜴溷ｭ舌↓逹蝨ｰ縺励◆縺�
            if (endAtom && endAtom.id !== this.bondStartAtom.id) {
                const existing = this.userMolecule.getBond(this.bondStartAtom.id, endAtom.id);
                if (existing) {
                    const maxType = this.getMaxBondType(this.bondStartAtom.element, endAtom.element);
                    if (maxType > 1) {
                        const currentType = Number(existing.type) || 1;
                        let nextType = currentType;
                        let found = false;

                        for (let i = 1; i <= maxType; i++) {
                            let testType = currentType + i;
                            if (testType > maxType) {
                                testType = 1;
                            }
                            if (testType === currentType) break;

                            const diff = testType - currentType;
                            const free1 = this.userMolecule.getFreeValency(this.bondStartAtom.id);
                            const free2 = this.userMolecule.getFreeValency(endAtom.id);

                            if (diff <= 0 || (free1 >= diff && free2 >= diff)) {
                                nextType = testType;
                                found = true;
                                break;
                            }
                        }

                        if (found && nextType !== currentType) {
                            this.saveState();
                            this.userMolecule.addBond(this.bondStartAtom.id, endAtom.id, nextType);
                        }
                    }
                } else {
                    // 譁ｰ隕冗ｵ仙粋繧堤ｵ舌�縺ｮ縺ｫ蜊∝�縺ｪ遨ｺ縺咲ｵ仙粋謇九′縺ゅｋ縺九メ繧ｧ繝�け
                    // 驕ｸ謚槭＆繧後◆邨仙粋谺｡謨ｰ縺後◎繧ゅ◎繧ゆｸ｡蜴溷ｭ舌�髯千阜繧定ｶ�∴縺ｦ縺�↑縺�°繧ゅメ繧ｧ繝�け
                    const maxType = this.getMaxBondType(this.bondStartAtom.element, endAtom.element);
                    const reqType = Math.min(this.selectedBondType, maxType);
                    if (this.userMolecule.getFreeValency(this.bondStartAtom.id) >= reqType && this.userMolecule.getFreeValency(endAtom.id) >= reqType) {
                        this.saveState();
                        this.userMolecule.addBond(this.bondStartAtom.id, endAtom.id, reqType);
                    }
                }
            }
            // 繝励Ξ繝薙Η繝ｼ豸亥悉
            this.clearUIOverlay();
        }
        
        this.isDragging = false;
        this.draggedAtom = null;
        this.bondStartAtom = null;
        this.autoLayoutBonds();
        this.updateDrawing();
    }

    // 蠎ｧ讓呵ｿ代￥縺ｫ縺ゅｋ蜴溷ｭ舌ｒ蜿門ｾ暦ｼ医け繝ｪ繝�け蛻､螳壼濠蠕��蠎�ａ縺ｮ28px��
    findAtomAt(x, y, radius = 28) {
        return this.userMolecule.atoms.find(atom => {
            const dx = atom.x - x;
            const dy = atom.y - y;
            return Math.sqrt(dx*dx + dy*dy) <= radius;
        }) || null;
    }

    // 蠎ｧ讓呵ｿ代￥縺ｫ縺ゅｋ邨仙粋邱壹ｒ蜿門ｾ�
    findBondAt(x, y, threshold = 10) {
        return this.userMolecule.bonds.find(bond => {
            const a1 = this.userMolecule.atoms.find(a => a.id === bond.atomId1);
            const a2 = this.userMolecule.atoms.find(a => a.id === bond.atomId2);
            if (!a1 || !a2) return false;
            
            // 轤ｹ縺ｨ邱壼�縺ｮ霍晞屬
            const l2 = (a1.x - a2.x)**2 + (a1.y - a2.y)**2;
            if (l2 === 0) return false;
            let t = ((x - a1.x) * (a2.x - a1.x) + (y - a1.y) * (a2.y - a1.y)) / l2;
            t = Math.max(0, Math.min(1, t));
            const projX = a1.x + t * (a2.x - a1.x);
            const projY = a1.y + t * (a2.y - a1.y);
            const dist = Math.sqrt((x - projX)**2 + (y - projY)**2);
            return dist <= threshold;
        }) || null;
    }

    // 迺ｰ繝ｻ螳倩�蝓ｺ繝｢繧ｸ繝･繝ｼ繝ｫ縺ｮ驟咲ｽｮ
    placeModule(moduleType, x, y, clickedAtom) {
        // 繝｢繧ｸ繝･繝ｼ繝ｫ驟咲ｽｮ譎ゅ�蟄､遶句宛髯舌メ繧ｧ繝�け
        if (this.userMolecule.atoms.length > 0) {
            let canPlace = false;
            if (moduleType === 'benzene' || moduleType === 'cyclopentane' || moduleType === 'cyclohexane') {
                // 迺ｰ繝｢繧ｸ繝･繝ｼ繝ｫ縺ｮ縺�★繧後°縺ｮ鬆らせ縺梧里蟄伜次蟄舌↓霑代＞縺�
                let R = GRID_SIZE * 0.833;
                let count = 6;
                if (moduleType === 'cyclopentane') {
                    R = GRID_SIZE * 0.85;
                    count = 5;
                } else if (moduleType === 'cyclohexane') {
                    R = GRID_SIZE;
                    count = 6;
                }
                for (let i = 0; i < count; i++) {
                    let ang;
                    if (moduleType === 'benzene') {
                        ang = (i * Math.PI) / 3;
                    } else if (moduleType === 'cyclohexane') {
                        ang = (i * Math.PI) / 3 - Math.PI / 2;
                    } else {
                        ang = i * (2 * Math.PI / 5) - Math.PI / 2;
                    }
                    const bx = x + R * Math.cos(ang);
                    const by = y + R * Math.sin(ang);
                    if (this.isNearAnyExistingAtom(bx, by)) {
                        canPlace = true;
                        break;
                    }
                }
            } else if (clickedAtom) {
                // 螳倩�蝓ｺ縺ｯ繧ｯ繝ｪ繝�け縺励◆蜴溷ｭ舌↓邨仙粋縺吶ｋ縺溘ａ蟶ｸ縺ｫ驟咲ｽｮ蜿ｯ閭ｽ
                canPlace = true;
            }
            if (!canPlace) return; // 蟄､遶九＠縺滉ｽ咲ｽｮ縺ｪ繧蛾�鄂ｮ縺励↑縺�
        }

        this.saveState();

        if (moduleType === 'benzene' || moduleType === 'cyclopentane' || moduleType === 'cyclohexane') {
            // 迺ｰ繝｢繧ｸ繝･繝ｼ繝ｫ縺ｮ驟咲ｽｮ
            let R = GRID_SIZE * 0.833;
            let count = 6;
            if (moduleType === 'cyclopentane') {
                R = GRID_SIZE * 0.85;
                count = 5;
            } else if (moduleType === 'cyclohexane') {
                R = GRID_SIZE;
                count = 6;
            }

            const newCAtoms = [];
            for (let i = 0; i < count; i++) {
                let ang;
                if (moduleType === 'benzene') {
                    ang = (i * Math.PI) / 3;
                } else if (moduleType === 'cyclohexane') {
                    ang = (i * Math.PI) / 3 - Math.PI / 2;
                } else {
                    ang = i * (2 * Math.PI / 5) - Math.PI / 2;
                }
                const c = this.userMolecule.addAtom('C', x + R * Math.cos(ang), y + R * Math.sin(ang));
                if (moduleType === 'benzene') {
                    c.benzeneCenter = { x, y };
                    c.benzeneAngle = ang;
                }
                newCAtoms.push(c);
            }
            // 迺ｰ迥ｶ縺ｫ邨仙粋繧貞ｼｵ繧�
            for (let i = 0; i < count; i++) {
                const next = (i + 1) % count;
                const type = (moduleType === 'benzene' && i % 2 === 0) ? 2 : 1;
                this.userMolecule.addBond(newCAtoms[i].id, newCAtoms[next].id, type);
            }
        } else if (clickedAtom) {
            // 螳倩�蝓ｺ縺ｯ縲梧里蟄倥�蜴溷ｭ舌ｒ繧ｯ繝ｪ繝�け縺励※謗･邯壹阪☆繧�
            const baseAtom = clickedAtom;
            
            // 遨ｺ縺�※縺�ｋ譁ｹ蜷代ｒ迚ｹ螳壹☆繧�
            const neighbors = this.userMolecule.getNeighbors(baseAtom.id);
            const angles = neighbors.map(n => Math.atan2(n.atom.y - baseAtom.y, n.atom.x - baseAtom.x));
            
            // 遨ｺ縺肴婿蜷� (繝�ヵ繧ｩ繝ｫ繝医�蜿ｳ譁ｹ蜷托ｼ�0繝ｩ繧ｸ繧｢繝ｳ)
            let targetAng = 0;
            if (angles.length > 0) {
                // 譌｢縺ｫ謗･邯壹′縺ゅｋ蝣ｴ蜷医√◎縺ｮ蟷ｳ蝮��繧ｯ繝医Ν縺ｮ蜿榊ｯｾ蛛ｴ縺ｫ縺吶ｋ
                let sumX = 0, sumY = 0;
                angles.forEach(ang => {
                    sumX += Math.cos(ang);
                    sumY += Math.sin(ang);
                });
                targetAng = Math.atan2(-sumY, -sumX);
                // 90蠎ｦ蛻ｻ縺ｿ縺ｫ繧ｹ繝翫ャ繝励＆縺帙ｋ
                targetAng = Math.round(targetAng / (Math.PI / 2)) * (Math.PI / 2);
            }

            const dx = GRID_SIZE * Math.cos(targetAng);
            const dy = GRID_SIZE * Math.sin(targetAng);

            if (moduleType === 'oh') {
                // -OH 驟咲ｽｮ
                const o = this.userMolecule.addAtom('O', baseAtom.x + dx, baseAtom.y + dy);
                this.userMolecule.addBond(baseAtom.id, o.id, 1);
            } else if (moduleType === 'cooh') {
                // -COOH 驟咲ｽｮ (C=O 縺ｨ -OH 繧帝�鄂ｮ)
                const c = this.userMolecule.addAtom('C', baseAtom.x + dx, baseAtom.y + dy);
                this.userMolecule.addBond(baseAtom.id, c.id, 1);
                
                // C縺九ｉ縺輔ｉ縺ｫ譫晏�縺九ｌ繧剃ｼｸ縺ｰ縺�
                // 騾ｲ陦梧婿蜷托ｼ�argetAng�峨↓蟇ｾ縺励※90蠎ｦ譖ｲ縺後▲縺滉ｽ咲ｽｮ縺ｫ莠碁㍾邨仙粋O縲∫峩騾ｲ譁ｹ蜷代↓蜊倡ｵ仙粋OH繧帝�鄂ｮ
                const angO1 = targetAng + Math.PI / 2; // 90蠎ｦ荳�/蟾ｦ
                const o1 = this.userMolecule.addAtom('O', c.x + GRID_SIZE * Math.cos(angO1), c.y + GRID_SIZE * Math.sin(angO1));
                this.userMolecule.addBond(c.id, o1.id, 2); // C=O (莠碁㍾邨仙粋)

                const o2 = this.userMolecule.addAtom('O', c.x + GRID_SIZE * Math.cos(targetAng), c.y + GRID_SIZE * Math.sin(targetAng));
                this.userMolecule.addBond(c.id, o2.id, 1); // C-OH (蜊倡ｵ仙粋)
            } else if (moduleType === 'nh2') {
                // -NH2 驟咲ｽｮ
                const n = this.userMolecule.addAtom('N', baseAtom.x + dx, baseAtom.y + dy);
                this.userMolecule.addBond(baseAtom.id, n.id, 1);
            }
        } else {
            // 蜴溷ｭ舌′驕ｸ謚槭＆繧後★縺ｫ遨ｺ蝨ｰ繧偵け繝ｪ繝�け縺励◆蝣ｴ蜷医�縲∝腰縺ｫ譁ｰ隕上↓O/N縺ｪ縺ｩ繧堤ｽｮ縺�※郢九＄蝓ｺ遉弱↓縺吶ｋ縺溘ａ繝｡繝�そ繝ｼ繧ｸ陦ｨ遉ｺ
            alert("螳倩�蝓ｺ繧堤ｵ仙粋縺吶ｋ縺ｫ縺ｯ縲∵磁邯壼�縺ｮ譌｢蟄倥�蜴溷ｭ撰ｼ�縺ｪ縺ｩ�峨ｒ繧ｯ繝ｪ繝�け縺励※縺上□縺輔＞縲�");
        }
        this.autoConnectAdjacentAtoms();
        this.autoLayoutBonds();
        this.updateDrawing();
    }

    // 邨仙粋謠冗判荳ｭ縺ｮ繝励Ξ繝薙Η繝ｼ�井ｸ譎ら噪縺ｪ遐ｴ邱夊｡ｨ遉ｺ縺ｪ縺ｩ��
    drawBondPreview(x1, y1, x2, y2) {
        this.clearUIOverlay();
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', x1);
        line.setAttribute('y1', y1);
        line.setAttribute('x2', x2);
        line.setAttribute('y2', y2);
        line.setAttribute('stroke', 'rgba(0, 242, 254, 0.6)');
        line.setAttribute('stroke-width', '4');
        line.setAttribute('stroke-dasharray', '5,5');
        this.uiGroup.appendChild(line);
    }

    // 蜴溷ｭ宣�鄂ｮ繝励Ξ繝薙Η繝ｼ�亥濠騾乗�縺ｮ荳ｸ縺ｨ蜈�ｴ�險伜捷縲√♀繧医�邨仙粋邱壹�陦ｨ遉ｺ��
    drawAtomPreview(element, x, y, parentAtom) {
        this.clearUIOverlay();

        // 1. 隕ｪ蜴溷ｭ舌′縺ゅｋ蝣ｴ蜷医√◎縺薙°繧峨�繝励Ξ繝薙Η繝ｼ邨仙粋邱壹ｒ謠冗判 (蜊企乗�)
        if (parentAtom) {
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            const dx = x - parentAtom.x;
            const dy = y - parentAtom.y;
            const len = Math.sqrt(dx*dx + dy*dy);
            if (len > 0) {
                const ux = dx / len;
                const uy = dy / len;
                const offsetStart = 10;
                const offsetEnd = element === 'H' ? 6 : 10;
                line.setAttribute('x1', parentAtom.x + ux * offsetStart);
                line.setAttribute('y1', parentAtom.y + uy * offsetStart);
                line.setAttribute('x2', x - ux * offsetEnd);
                line.setAttribute('y2', y - uy * offsetEnd);
                line.setAttribute('stroke', 'rgba(255, 255, 255, 0.25)');
                line.setAttribute('stroke-width', '2');
                line.setAttribute('stroke-dasharray', '3,3');
                this.uiGroup.appendChild(line);
            }
        }

        // 2. 蜊企乗�縺ｮ蜴溷ｭ千帥
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', x);
        circle.setAttribute('cy', y);
        circle.setAttribute('r', element === 'H' ? '6' : '10');
        circle.setAttribute('fill', '#0f141c');
        circle.setAttribute('stroke', `var(--color-${element.toLowerCase()})`);
        circle.setAttribute('stroke-width', '2');
        circle.setAttribute('opacity', '0.45'); // 蜊企乗�
        this.uiGroup.appendChild(circle);

        // 3. 蜊企乗�縺ｮ蜴溷ｭ先枚蟄�
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', x);
        text.setAttribute('y', y + (element === 'H' ? 2.0 : 3.0));
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('class', 'svg-atom-text');
        text.setAttribute('fill', `var(--color-${element.toLowerCase()})`);
        text.style.fontSize = element === 'H' ? '6.5px' : '9px';
        text.textContent = element;
        text.setAttribute('opacity', '0.45'); // 蜊企乗�
        this.uiGroup.appendChild(text);
    }

    // 縺薙�蜴溷ｭ舌′縲∝�蟄仙�縺ｧ莠碁㍾邨仙粋縺ｾ縺溘�荳蛾㍾邨仙粋縺ｮ縺�★繧後°繧呈怏縺吶ｋ轤ｭ邏�縺ｮ譫昴ヤ繝ｪ繝ｼ縺ｫ螻槭＠縺ｦ縺�ｋ縺句�蟶ｰ蛻､螳�
    belongsToSp2SpTree(atomId, visited = new Set()) {
        visited.add(atomId);
        
        const neighbors = this.userMolecule.getNeighbors(atomId);
        
        // 1. 閾ｪ霄ｫ縺御ｺ碁㍾邨仙粋(2)縺倶ｸ蛾㍾邨仙粋(3)縺ｫ逶ｴ謗･郢九′縺｣縺ｦ縺�ｋ縺�
        const hasSp2Sp = neighbors.some(n => n.type === 2 || n.type === 3);
        if (hasSp2Sp) return true;
        
        // 2. 髫｣謗･縺吶ｋ驥榊次蟄舌�蜈医′郢九′縺｣縺ｦ縺�ｋ縺句�蟶ｰ謗｢邏｢
        for (let i = 0; i < neighbors.length; i++) {
            const nextAtom = neighbors[i].atom;
            if (nextAtom.element === 'H') continue;
            if (!visited.has(nextAtom.id)) {
                if (this.belongsToSp2SpTree(nextAtom.id, visited)) {
                    return true;
                }
            }
        }
        return false;
    }

    clearUIOverlay() {
        this.uiGroup.innerHTML = '';
    }

    // 莠碁㍾邨仙粋 (C=C) 縺ｯ 120蠎ｦ譁ｹ蜷代∽ｸ蛾㍾邨仙粋 (C竕｡C) 縺ｯ 180蠎ｦ逶ｴ邱壽婿蜷代√◎繧御ｻ･螟悶� sp3 驥榊次蟄舌�逶ｴ隗偵げ繝ｪ繝�ラ荳翫↓閾ｪ蜍輔い繧ｸ繝｣繧ｹ繝医☆繧�
    autoLayoutBonds() {
        let changed = false;
        
        // 1. sp2 (莠碁㍾邨仙粋) 縺翫ｈ縺ｳ sp (荳蛾㍾邨仙粋) 縺ｮ閾ｪ蜍輔Ξ繧､繧｢繧ｦ繝�
        this.userMolecule.bonds.forEach(bond => {
            if (bond.type !== 2 && bond.type !== 3) return; // 莠碁㍾邨仙粋(2)縺ｾ縺溘�荳蛾㍾邨仙粋(3)縺ｮ縺ｿ蟇ｾ雎｡
            
            const a1 = this.userMolecule.atoms.find(a => a.id === bond.atomId1);
            const a2 = this.userMolecule.atoms.find(a => a.id === bond.atomId2);
            if (!a1 || !a2 || a1.element !== 'C' || a2.element !== 'C') return;
            
            // 繝吶Φ繧ｼ繝ｳ迺ｰ縺ｮ蜴溷ｭ舌�髯､螟�
            if (a1.benzeneCenter || a2.benzeneCenter) return;
            
            const adjustNeighbors = (centerAtom, partnerAtom) => {
                const neighbors = this.userMolecule.getNeighbors(centerAtom.id)
                    .filter(n => n.atom.id !== partnerAtom.id && n.atom.element !== 'H');
                
                if (neighbors.length === 0) return;
                
                const baseAngle = Math.atan2(partnerAtom.y - centerAtom.y, partnerAtom.x - centerAtom.x);
                
                let targetAngles = [];
                if (bond.type === 2) {
                    // 莠碁㍾邨仙粋��120蠎ｦ螟門�縺ｮ2譁ｹ蜷�
                    targetAngles = [baseAngle + (2 * Math.PI) / 3, baseAngle - (2 * Math.PI) / 3];
                } else if (bond.type === 3) {
                    // 荳蛾㍾邨仙粋��180蠎ｦ蜿榊ｯｾ蛛ｴ縺ｮ逶ｴ邱壻ｸ翫�1譁ｹ蜷代�縺ｿ
                    targetAngles = [baseAngle + Math.PI];
                }
                
                neighbors.forEach((n, idx) => {
                    const neighborAtom = n.atom;
                    
                    // 繧ｺ繝ｬ繧偵メ繧ｧ繝�け縺励∵怙繧りｿ代＞隗貞ｺｦ繧帝∈縺ｶ�井ｸ蛾㍾邨仙粋縺ｮ蝣ｴ蜷医�1縺､縺�縺代↑縺ｮ縺ｧ縺昴ｌ繧帝∈縺ｶ��
                    let bestAngle = targetAngles[0];
                    let minDist = Infinity;
                    
                    targetAngles.forEach(ang => {
                        const tx = centerAtom.x + GRID_SIZE * Math.cos(ang);
                        const ty = centerAtom.y + GRID_SIZE * Math.sin(ang);
                        const d = Math.sqrt((neighborAtom.x - tx)**2 + (neighborAtom.y - ty)**2);
                        if (d < minDist) {
                            minDist = d;
                            bestAngle = ang;
                        }
                    });
                    
                    // 繧ゅ＠ 2px 莉･荳翫ぜ繝ｬ縺ｦ縺�ｋ蝣ｴ蜷医∵ｭ｣縺励＞菴咲ｽｮ縺ｫ蠑ｷ蛻ｶ遘ｻ蜍�
                    if (minDist > 2) {
                        const targetX = centerAtom.x + GRID_SIZE * Math.cos(bestAngle);
                        const targetY = centerAtom.y + GRID_SIZE * Math.sin(bestAngle);
                        
                        // 繧ｵ繝悶ヤ繝ｪ繝ｼ蜈ｨ菴薙ｒ蟷ｳ陦檎ｧｻ蜍�
                        const dx = targetX - neighborAtom.x;
                        const dy = targetY - neighborAtom.y;
                        
                        this.translateSubtree(neighborAtom.id, centerAtom.id, dx, dy, new Set());
                        changed = true;
                    }
                });
            };
            
            adjustNeighbors(a1, a2);
            adjustNeighbors(a2, a1);
        });

        // 2. sp3 (蜊倡ｵ仙粋縺ｮ縺ｿ) 縺ｮ驥榊次蟄舌ｒ縲∵怙繧りｿ代＞逶ｴ隗偵げ繝ｪ繝�ラ莠､轤ｹ (GRID_SIZE 縺ｮ蛟肴焚) 縺ｫ蜷ｸ逹繧｢繧ｸ繝｣繧ｹ繝�
        //    窶ｻ莠碁㍾邨仙粋(2)縺ｾ縺溘�荳蛾㍾邨仙粋(3)縺ｮ繝�Μ繝ｼ縺ｫ郢九′縺｣縺ｦ縺�ｋ譫晏次蟄舌�縲�
        //      sp2/sp繧｢繧ｸ繝｣繧ｹ繝医�120蠎ｦ/180蠎ｦ縺ｮ蟷ｾ菴募ｭｦ隗偵ｒ菫昴▽縺溘ａ縲∫峩隗偵げ繝ｪ繝�ラ蜷ｸ逹縺九ｉ髯､螟悶☆繧九�
        const sp3Atoms = this.userMolecule.atoms.filter(atom => {
            if (atom.element === 'H') return false;
            if (atom.benzeneCenter) return false; // 繝吶Φ繧ｼ繝ｳ縺ｯ蝗ｺ螳壹Ξ繧､繧｢繧ｦ繝�
            
            // 縺薙�蜴溷ｭ舌′莠碁㍾邨仙粋(2)繧�ｸ蛾㍾邨仙粋(3)縺ｮ繝�Μ繝ｼ縺ｫ謗･邯壹＆繧後※縺�ｋ縺九メ繧ｧ繝�け
            return !this.belongsToSp2SpTree(atom.id);
        });

        sp3Atoms.forEach(atom => {
            const targetX = Math.round(atom.x / GRID_SIZE) * GRID_SIZE;
            const targetY = Math.round(atom.y / GRID_SIZE) * GRID_SIZE;
            
            const dx = targetX - atom.x;
            const dy = targetY - atom.y;
            
            if (Math.abs(dx) > 2 || Math.abs(dy) > 2) {
                // 蛻�ｭ仙�菴薙�蟷ｳ陦檎ｧｻ蜍輔↓繧医ｋ邏ｯ遨阪ぜ繝ｬ繧帝亟縺舌◆繧√∝�菴鍋ｧｻ蜍包ｼ�arentId = null�峨�螳溯｡後＠縺ｪ縺��
                // sp3 迥ｶ諷九〒繧ｺ繝ｬ縺ｦ縺�ｋ蝣ｴ蜷医�縲∵眠隕城�鄂ｮ繧�ラ繝ｩ繝�げ遲峨〒縺ｮ謫堺ｽ懊↓繧医ｋ繧ゅ�縺ｪ縺ｮ縺ｧ縲�
                // 縺昴�蜴溷ｭ仙腰菴薙∪縺溘�縺昴�蜈医�sp3驛ｨ蛻�事縺ｮ縺ｿ繧貞虚縺九☆縲�
                // 蠅�阜��p2/sp蛛ｴ�峨∈騾�ｵ√＆縺帙↑縺�◆繧√∵磁邯壹＆繧後※縺�ｋ髫｣謗･蜴溷ｭ舌′縺ゅｌ縺ｰ縺昴ｌ繧� parentId 縺ｫ縺吶ｋ縲�
                const neighbors = this.userMolecule.getNeighbors(atom.id);
                const parentId = neighbors.length > 0 ? neighbors[0].atom.id : null;
                
                if (parentId !== null) {
                    this.translateSubtree(atom.id, parentId, dx, dy, new Set());
                    changed = true;
                }
            }
        });
        
        if (changed) {
            this.updateDrawing();
        }
    }

    // 迚ｹ螳壹�蜴溷ｭ舌°繧牙�縺ｮ繧ｵ繝悶ヤ繝ｪ繝ｼ蜈ｨ菴薙ｒ蟷ｳ陦檎ｧｻ蜍輔＆縺帙ｋ蜀榊ｸｰ繝倥Ν繝代�
    translateSubtree(atomId, parentId, dx, dy, visited) {
        visited.add(atomId);
        const atom = this.userMolecule.atoms.find(a => a.id === atomId);
        if (atom) {
            atom.x += dx;
            atom.y += dy;
        }
        
        const neighbors = this.userMolecule.getNeighbors(atomId)
            .filter(n => n.atom.id !== parentId && n.atom.element !== 'H');
            
        neighbors.forEach(n => {
            if (!visited.has(n.atom.id)) {
                this.translateSubtree(n.atom.id, atomId, dx, dy, visited);
            }
        });
    }

    // 豁｣隗｣縺ｮ萓狗､ｺ�医♀謇区悽�峨ｒ繝ｬ繝ｳ繝繝ｪ繝ｳ繧ｰ縺吶ｋ
    renderTargetAnswer() {
        this.targetBonds.innerHTML = '';
        this.targetAtoms.innerHTML = '';

        const targetMol = STAGES[this.currentStageIndex].createTarget();
        const heavyAtoms = targetMol.atoms.filter(a => a.element !== 'H');
        if (heavyAtoms.length === 0) return;

        // 1. 繝舌え繝ｳ繝�ぅ繝ｳ繧ｰ繝懊ャ繧ｯ繧ｹ縺ｮ險育ｮ励→繧ｻ繝ｳ繧ｿ繝ｪ繝ｳ繧ｰ
        let minX = Infinity, maxX = -Infinity;
        let minY = Infinity, maxY = -Infinity;
        heavyAtoms.forEach(a => {
            if (a.x < minX) minX = a.x;
            if (a.x > maxX) maxX = a.x;
            if (a.y < minY) minY = a.y;
            if (a.y > maxY) maxY = a.y;
        });

        // 繧ｿ繝ｼ繧ｲ繝�ヨ蛛ｴ豌ｴ邏�繧ょ性繧√ｋ縺溘ａ縲∵ｰｴ邏�繧りｨ育ｮ�
        const hydrogens = targetMol.calculateHydrogens();
        hydrogens.forEach(h => {
            if (h.x < minX) minX = h.x;
            if (h.x > maxX) maxX = h.x;
            if (h.y < minY) minY = h.y;
            if (h.y > maxY) maxY = h.y;
        });

        const cx = (minX + maxX) / 2;
        const cy = (minY + maxY) / 2;

        // target-svg 縺ｮ荳ｭ蠢� (200, 200) 縺ｫ蟷ｳ陦檎ｧｻ蜍輔☆繧九◆繧√�繧ｪ繝輔そ繝�ヨ
        const offsetX = 200 - cx;
        const offsetY = 200 - cy;

        // 2. 邨仙粋縺ｮ謠冗判
        // 竭� 豌ｴ邏�縺ｮ邨仙粋
        hydrogens.forEach(h => {
            const parent = targetMol.atoms.find(a => a.id === h.parentId);
            if (parent) {
                this.renderTargetBond(parent.x + offsetX, parent.y + offsetY, h.x + offsetX, h.y + offsetY, 1, true);
            }
        });

        // 竭｡ 驥榊次蟄宣俣縺ｮ邨仙粋
        targetMol.bonds.forEach(bond => {
            const a1 = targetMol.atoms.find(a => a.id === bond.atomId1);
            const a2 = targetMol.atoms.find(a => a.id === bond.atomId2);
            if (a1 && a2 && a1.element !== 'H' && a2.element !== 'H') {
                this.renderTargetBond(a1.x + offsetX, a1.y + offsetY, a2.x + offsetX, a2.y + offsetY, bond.type, false);
            }
        });

        // 3. 蜴溷ｭ舌�謠冗判
        // 竭� 豌ｴ邏�
        hydrogens.forEach(h => {
            this.renderTargetAtom(h.element, h.x + offsetX, h.y + offsetY);
        });

        // 竭｡ 驥榊次蟄�
        heavyAtoms.forEach(a => {
            this.renderTargetAtom(a.element, a.x + offsetX, a.y + offsetY);
        });
    }

    renderTargetAtom(element, x, y) {
        const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', x);
        circle.setAttribute('cy', y);
        circle.setAttribute('r', element === 'H' ? '6' : '10');
        circle.setAttribute('fill', '#0f141c');
        circle.setAttribute('stroke', `var(--color-${element.toLowerCase()})`);
        circle.setAttribute('stroke-width', '2');
        
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', x);
        text.setAttribute('y', y + (element === 'H' ? 2.0 : 3.0));
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('class', 'svg-atom-text');
        text.setAttribute('fill', `var(--color-${element.toLowerCase()})`);
        text.style.fontSize = element === 'H' ? '6.5px' : '9px';
        text.textContent = element;

        group.appendChild(circle);
        group.appendChild(text);
        this.targetAtoms.appendChild(group);
    }

    renderTargetBond(x1, y1, x2, y2, type, isHConnection = false) {
        const dx = x2 - x1;
        const dy = y2 - y1;
        const len = Math.sqrt(dx*dx + dy*dy);
        if (len === 0) return;
        
        const ux = dx / len;
        const uy = dy / len;

        const offsetStart = 10;
        const offsetEnd = isHConnection ? 6 : 10;
        
        const sx = x1 + ux * offsetStart;
        const sy = y1 + uy * offsetStart;
        const ex = x2 - ux * offsetEnd;
        const ey = y2 - uy * offsetEnd;

        const strokeColor = isHConnection ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.4)';

        if (type === 1) {
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', sx);
            line.setAttribute('y1', sy);
            line.setAttribute('x2', ex);
            line.setAttribute('y2', ey);
            line.setAttribute('stroke', strokeColor);
            line.setAttribute('stroke-width', isHConnection ? '1.5' : '3');
            this.targetBonds.appendChild(line);
        } else if (type === 2) {
            const line1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            const line2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            const nx = -uy * 2.5;
            const ny = ux * 2.5;
            
            line1.setAttribute('x1', sx + nx);
            line1.setAttribute('y1', sy + ny);
            line1.setAttribute('x2', ex + nx);
            line1.setAttribute('y2', ey + ny);
            line1.setAttribute('stroke', strokeColor);
            line1.setAttribute('stroke-width', '2.2');
            
            line2.setAttribute('x1', sx - nx);
            line2.setAttribute('y1', sy - ny);
            line2.setAttribute('x2', ex - nx);
            line2.setAttribute('y2', ey - ny);
            line2.setAttribute('stroke', strokeColor);
            line2.setAttribute('stroke-width', '2.2');
            
            this.targetBonds.appendChild(line1);
            this.targetBonds.appendChild(line2);
        }
    }

    // SVG謠冗判縺ｮ譖ｴ譁ｰ
    updateDrawing() {
        this.atomsGroup.innerHTML = '';
        this.bondsGroup.innerHTML = '';
        
        // 閾ｪ蜍戊｣懷ｮ梧ｰｴ邏�(H)縺ｮ險育ｮ�
        const hydrogens = this.userMolecule.calculateHydrogens();

        // 1. 豌ｴ邏�(H)縺ｮ邨仙粋邱壹�縺ｿ繧呈怙閭碁擇縺ｫ謠冗判�亥､ｪ縺�㍾蜴溷ｭ宣俣邨仙粋縺ｮ荳九ｒ騾壹☆��
        hydrogens.forEach(h => {
            const parent = this.userMolecule.atoms.find(a => a.id === h.parentId);
            if (parent) {
                this.renderBond(parent.x, parent.y, h.x, h.y, 1, true); // 豌ｴ邏�縺ｮ邨仙粋縺ｯ蟶ｸ縺ｫ蜊倡ｵ仙粋
            }
        });

        // 2. 驥榊次蟄宣俣縺ｮ邨仙粋邱壹ｒ謠冗判
        this.userMolecule.bonds.forEach(bond => {
            const a1 = this.userMolecule.atoms.find(a => a.id === bond.atomId1);
            const a2 = this.userMolecule.atoms.find(a => a.id === bond.atomId2);
            if (!a1 || !a2) return;
            
            this.renderBond(a1.x, a1.y, a2.x, a2.y, bond.type, false, bond);
        });

        // 3. 豌ｴ邏�蜴溷ｭ�(H)閾ｪ菴薙�謠冗判
        hydrogens.forEach(h => {
            this.renderAtom(h.id, h.element, h.x, h.y, false);
        });

        // 4. 驥榊次蟄舌�謠冗判 (荳逡ｪ謇句燕縺ｫ謠上￥縺溘ａ譛蠕後↓陦後≧)
        this.userMolecule.atoms.forEach(atom => {
            this.renderAtom(atom.id, atom.element, atom.x, atom.y, atom.isLocked, atom.isAsymmetricMarked);
        });
    }

    renderAtom(id, element, x, y, isLocked, isAsymmetricMarked = false) {
        const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        group.setAttribute('class', 'svg-atom-node');
        group.setAttribute('data-id', id);
        
        // 蜴溷ｭ千帥�郁レ譎ｯ��
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', x);
        circle.setAttribute('cy', y);
        circle.setAttribute('r', element === 'H' ? '6' : '10'); // 蜴溷ｭ舌�螟ｧ縺阪＆繧堤ｴ�80%縺ｫ邵ｮ蟆� (H:6px, 驥榊次蟄�:10px)
        circle.setAttribute('fill', '#0f141c');
        circle.setAttribute('stroke', `var(--color-${element.toLowerCase()})`);
        circle.setAttribute('stroke-width', '2');
        if (isLocked) {
            circle.setAttribute('stroke-dasharray', '3,3');
        }
        
        // 蜴溷ｭ先枚蟄�
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', x);
        text.setAttribute('y', y + (element === 'H' ? 2.0 : 3.0)); // 譁�ｭ励�蝙ら峩謠�∴繧貞ｰ上＆縺上↑縺｣縺溷濠蠕�↓蜷医ｏ縺帙※蠕ｮ隱ｿ謨ｴ
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('class', 'svg-atom-text');
        text.setAttribute('fill', `var(--color-${element.toLowerCase()})`);
        text.style.fontSize = element === 'H' ? '6.5px' : '9px'; // 繝輔か繝ｳ繝医し繧､繧ｺ繧らｸｮ蟆�
        text.textContent = element;

        group.appendChild(circle);
        group.appendChild(text);

        // 荳肴哩轤ｭ邏�繝槭�繧ｯ (*) 縺ｮ謠冗判
        if (element === 'C' && isAsymmetricMarked) {
            const star = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            star.setAttribute('x', x + 7.5);
            star.setAttribute('y', y - 4);
            star.setAttribute('class', 'svg-asymmetric-star');
            star.style.fontSize = '12px';
            star.textContent = '*';
            group.appendChild(star);
        }
        
        this.atomsGroup.appendChild(group);
    }

    renderBond(x1, y1, x2, y2, type, isHConnection = false, bondObj = null) {
        const dx = x2 - x1;
        const dy = y2 - y1;
        const len = Math.sqrt(dx*dx + dy*dy);
        if (len === 0) return;
        
        const ux = dx / len;
        const uy = dy / len;

        // 蜴溷ｭ舌Λ繝吶Ν縺ｨ驥阪↑繧峨↑縺�ｈ縺�∫ｫｯ繧貞ｰ代＠邵ｮ繧√ｋ (驥榊次蟄舌�蜊雁ｾ�10, 豌ｴ邏�縺ｯ蜊雁ｾ�6縺ｫ驕ｩ蜷�)
        const offsetStart = 10;
        const offsetEnd = isHConnection ? 6 : 10;
        
        const sx = x1 + ux * offsetStart;
        const sy = y1 + uy * offsetStart;
        const ex = x2 - ux * offsetEnd;
        const ey = y2 - uy * offsetEnd;

        const strokeColor = isHConnection ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.4)';

        // 1. 隕九◆逶ｮ縺ｮ邱夲ｼ医ン繧ｸ繝･繧｢繝ｫ�峨ｒ謠冗判縺吶ｋ
        if (type === 1) {
            // 蜊倡ｵ仙粋
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', sx);
            line.setAttribute('y1', sy);
            line.setAttribute('x2', ex);
            line.setAttribute('y2', ey);
            line.setAttribute('stroke', strokeColor);
            line.setAttribute('stroke-width', '3');
            line.setAttribute('pointer-events', 'none'); // 繧ｯ繝ｪ繝�け蛻､螳壹ｒ騾城℃
            this.bondsGroup.appendChild(line);
        } else if (type === 2) {
            // 莠碁㍾邨仙粋 (蟷ｳ陦後↑2譛ｬ縺ｮ邱�)
            const nx = -uy;
            const ny = ux;
            const gap = 5; // 邱壹←縺�＠縺ｮ髫咎俣繧貞ｺ�￡縺ｦ隕冶ｪ肴ｧ繧｢繝��

            for (let offset of [-gap, gap]) {
                const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                line.setAttribute('x1', sx + nx * offset);
                line.setAttribute('y1', sy + ny * offset);
                line.setAttribute('x2', ex + nx * offset);
                line.setAttribute('y2', ey + ny * offset);
                line.setAttribute('stroke', strokeColor);
                line.setAttribute('stroke-width', '2.5');
                line.setAttribute('pointer-events', 'none');
                this.bondsGroup.appendChild(line);
            }
        } else if (type === 3) {
            // 荳蛾㍾邨仙粋
            const nx = -uy;
            const ny = ux;
            const gap = 6.5;

            // 荳ｭ螟ｮ縲∝ｷｦ縲∝承
            const offsets = [-gap, 0, gap];
            offsets.forEach(offset => {
                const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                line.setAttribute('x1', sx + nx * offset);
                line.setAttribute('y1', sy + ny * offset);
                line.setAttribute('x2', ex + nx * offset);
                line.setAttribute('y2', ey + ny * offset);
                line.setAttribute('stroke', strokeColor);
                line.setAttribute('stroke-width', offset === 0 ? '2.5' : '1.8');
                line.setAttribute('pointer-events', 'none');
                this.bondsGroup.appendChild(line);
            });
        }

        // 2. 蛻､螳夂畑縺ｮ騾乗�縺ｪ螟ｪ縺�ｷ壹ｒ驥阪�縺ｦ謠冗判縺励√け繝ｪ繝�け繝ｻ繝繝悶Ν繧ｯ繝ｪ繝�け繧､繝吶Φ繝医ｒ繧｢繧ｿ繝�メ縺吶ｋ
        if (!isHConnection && bondObj) {
            const hitLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            hitLine.setAttribute('x1', sx);
            hitLine.setAttribute('y1', sy);
            hitLine.setAttribute('x2', ex);
            hitLine.setAttribute('y2', ey);
            hitLine.setAttribute('stroke', '#ffffff');
            hitLine.setAttribute('stroke-opacity', '0'); // 繧､繝吶Φ繝医ｒ讀懃衍縺吶ｋ騾乗�險ｭ螳�
            hitLine.setAttribute('stroke-width', '20');    // 蛻､螳夂ｯ�峇繧偵＆繧峨↓蠎�￡縺ｦ20px縺ｫ險ｭ螳夲ｼ医け繝ｪ繝�け縺励ｄ縺吶￥��
            hitLine.style.cursor = 'pointer';
            hitLine.setAttribute('class', 'svg-bond-hitbox');
            
            // 繝阪う繝�ぅ繝悶�click縺ｨdblclick繧､繝吶Φ繝医ｒ菴ｿ逕ｨ縺励√ち繧､繝槭�驕�ｻｶ繧貞ｮ悟�縺ｫ謗帝勁
            hitLine.addEventListener('mousedown', (e) => {
                e.stopPropagation(); // 繧ｭ繝｣繝ｳ繝舌せ蜈ｨ菴薙�mousedown�亥次蟄舌�荳頑嶌縺阪�驟咲ｽｮ�峨′襍ｰ繧九�繧貞ｮ悟�縺ｫ髦ｻ豁｢��
            });
            hitLine.addEventListener('click', (e) => {
                e.stopPropagation();
                this.handleBondInteraction(bondObj, false); // 繧ｷ繝ｳ繧ｰ繝ｫ繧ｯ繝ｪ繝�け縺ｧ谺｡謨ｰ繝医げ繝ｫ
            });
            hitLine.addEventListener('dblclick', (e) => {
                e.stopPropagation();
                this.handleBondInteraction(bondObj, true); // 繝繝悶Ν繧ｯ繝ｪ繝�け縺ｧ蛻�妙
            });
            hitLine.addEventListener('contextmenu', (e) => {
                e.preventDefault(); // 繝悶Λ繧ｦ繧ｶ縺ｮ蜿ｳ繧ｯ繝ｪ繝�け繝｡繝九Η繝ｼ繧呈椛蛻ｶ
                e.stopPropagation();
                this.handleBondInteraction(bondObj, true); // 蜿ｳ繧ｯ繝ｪ繝�け縺ｧ蛻�妙
            });
            this.bondsGroup.appendChild(hitLine);
        }
    }

    // 迴ｾ蝨ｨ邨�∩遶九※繧峨ｌ縺ｦ縺�ｋ蛻�ｭ舌�讀懆ｨｼ
    verifyCurrentStructure() {
        const stage = STAGES[this.currentStageIndex];
        const targetMolecule = stage.createTarget();
        
        this.verifyResult.classList.remove('hidden');
        this.verifyResult.className = "result-message animate-pulse";
        this.verifyResult.textContent = "讒矩�蛻､螳壻ｸｭ...";
        
        // 蟆代＠驕�ｻｶ繧貞�繧後※蛻､螳夲ｼ医ご繝ｼ繝�逧�ｼ泌���
        setTimeout(() => {
            // 1. 蛻�ｭ舌ヨ繝昴Ο繧ｸ繝ｼ讒矩�縺ｮ荳閾ｴ蛻､螳�
            const isStructureCorrect = verifyMolecule(this.userMolecule, targetMolecule);
            if (!isStructureCorrect) {
                this.verifyResult.className = "result-message error";
                this.verifyResult.textContent = "荳堺ｸ閾ｴ縺ｧ縺吶らｵ仙粋縺ｮ謨ｰ繧�ｨｮ鬘槭∫ｹ九′縺｣縺ｦ縺�ｋ蜴溷ｭ舌�鬆�分繧堤｢ｺ隱阪＠縺ｦ縺上□縺輔＞縲�";
                return;
            }

            // 2. 荳肴哩轤ｭ邏�繝槭�繧ｯ繝｢繝ｼ繝� (ON) 譎ゅ�荳肴哩轤ｭ邏�繝槭�繧ｯ蛻､螳�
            if (this.asymmetricMode) {
                // 繝ｦ繝ｼ繧ｶ繝ｼ縺ｮ蜈ｨ轤ｭ邏����峨↓縺､縺�※縲∵悽迚ｩ縺ｧ縺ゅｋ縺九→繝槭�繧ｯ迥ｶ諷九′荳閾ｴ縺励※縺�ｋ縺玖ｵｰ譟ｻ
                const carbonAtoms = this.userMolecule.atoms.filter(a => a.element === 'C');
                
                let asymmetricErrors = [];
                carbonAtoms.forEach(atom => {
                    const actualAsymmetric = this.userMolecule.isAsymmetricCarbon(atom.id);
                    const userMarked = atom.isAsymmetricMarked;
                    
                    if (actualAsymmetric && !userMarked) {
                        asymmetricErrors.push(`(X:${Math.round(atom.x)}, Y:${Math.round(atom.y)}) 縺ｮ轤ｭ邏�縺ｯ荳肴哩轤ｭ邏�縺ｧ縺吶′縲�* 繝槭�繧ｯ縺後≠繧翫∪縺帙ｓ縲Ａ);
                    } else if (!actualAsymmetric && userMarked) {
                        asymmetricErrors.push(`(X:${Math.round(atom.x)}, Y:${Math.round(atom.y)}) 縺ｮ轤ｭ邏�縺ｫ * 繝槭�繧ｯ縺後≠繧翫∪縺吶′縲√％繧後�荳肴哩轤ｭ邏�縺ｧ縺ｯ縺ゅｊ縺ｾ縺帙ｓ縲Ａ);
                    }
                });

                if (asymmetricErrors.length > 0) {
                    this.verifyResult.className = "result-message error";
                    this.verifyResult.textContent = "蛻�ｭ先ｧ矩�縺ｯ蜷医▲縺ｦ縺�∪縺吶′縲∽ｸ肴哩轤ｭ邏���*�峨�繝槭�繧ｯ謖�ｮ壹′豁｣縺励￥縺ゅｊ縺ｾ縺帙ｓ縲�n" + asymmetricErrors[0];
                    return;
                }
            }

            // 3. 縺吶∋縺ｦ蜷域�ｼ
            this.verifyResult.className = "result-message success";
            this.verifyResult.textContent = "豁｣隗｣縺ｧ縺呻ｼ∵ｧ矩�縺翫ｈ縺ｳ荳肴哩轤ｭ邏�縺ｮ菴咲ｽｮ縺悟ｮ悟�縺ｫ荳閾ｴ縺励∪縺励◆��";
            
            // 蜍晏茜繝｢繝ｼ繝繝ｫ縺ｮ陦ｨ遉ｺ
            this.showWinModal(stage);
        }, 800);
    }

    showWinModal(stage) {
        this.winMolDetails.innerHTML = `
            <h3>${stage.name}</h3>
            <div class="formula-badge" style="margin:10px auto;">${stage.formula}</div>
            <p>${stage.desc}</p>
        `;
        setTimeout(() => {
            this.winModal.classList.remove('hidden');
        }, 1200);
    }

    // 髫｣謗･縺吶ｋ驥榊次蟄舌←縺�＠繧定�蜍輔〒蜊倡ｵ仙粋縺ｧ邨舌� (繧ｰ繝ｪ繝�ラ謗･邯壹�60px縺ｫ蜴ｳ譬ｼ縺ｫ蛻ｶ髯�)
    autoConnectAdjacentAtoms() {
        const threshold = GRID_SIZE + 2; // GRID_SIZE 莉倩ｿ代�縺ｿ險ｱ蜿ｯ縺吶ｋ繧医≧蜴ｳ譬ｼ蛹�
        const atoms = this.userMolecule.atoms;
        
        for (let i = 0; i < atoms.length; i++) {
            for (let j = i + 1; j < atoms.length; j++) {
                const a1 = atoms[i];
                const a2 = atoms[j];
                
                // 豌ｴ邏�(H)縺ｯ閾ｪ蜍戊｣懷ｮ後＆繧後ｋ縺溘ａ辟｡隕�
                if (a1.element === 'H' || a2.element === 'H') continue;
                
                const dx = a1.x - a2.x;
                const dy = a1.y - a2.y;
                const dist = Math.sqrt(dx*dx + dy*dy);
                
                if (dist <= threshold) {
                    // 蝓ｺ譛ｬ�壽ｰｴ蟷ｳ縺ｾ縺溘�蝙ら峩縺ｫ逶ｴ邱壻ｸ翫↓荳ｦ繧薙〒縺�ｋ蝣ｴ蜷医�縺ｿ閾ｪ蜍慕ｵ仙粋
                    const isHorizontal = Math.abs(dy) < 2; // 險ｱ螳ｹ繧ｺ繝ｬ繧�2px縺ｫ蜴ｳ譬ｼ蛹�
                    const isVertical = Math.abs(dx) < 2;
                    let allowConnect = isHorizontal || isVertical;

                    // 縲蝉ｾ句､�1縲代�繝ｳ繧ｼ繝ｳ迺ｰ縺ｮ繧ｹ繝翫ャ繝励ぎ繧､繝臥せ縺ｫ鄂ｮ縺九ｌ縺溷次蟄舌�蝣ｴ蜷�
                    if (!allowConnect) {
                        const checkBenzeneGuide = (benzeneAtom, targetAtom) => {
                            if (benzeneAtom.benzeneCenter && benzeneAtom.benzeneAngle !== undefined) {
                                // 繝吶Φ繧ｼ繝ｳ鬆らせ縺九ｉ螟門�縺ｫ莨ｸ縺ｰ縺励◆繧ｬ繧､繝臥せ (GRID_SIZE * 1.666 = 70px)
                                const sx = benzeneAtom.benzeneCenter.x + (GRID_SIZE * 1.666) * Math.cos(benzeneAtom.benzeneAngle);
                                const sy = benzeneAtom.benzeneCenter.y + (GRID_SIZE * 1.666) * Math.sin(benzeneAtom.benzeneAngle);
                                const d = Math.sqrt((targetAtom.x - sx)**2 + (targetAtom.y - sy)**2);
                                return d < 2; // 螳悟�縺ｫ繧ｹ繝翫ャ繝怜精逹縺励※縺�ｋ縺溘ａ2px莉･蜀�〒蛻､螳�
                            }
                            return false;
                        };
                        if (checkBenzeneGuide(a1, a2) || checkBenzeneGuide(a2, a1)) {
                            allowConnect = true;
                        }
                    }

                    // 縲蝉ｾ句､�2縲舛=C 莠碁㍾邨仙粋縺ｮ120蠎ｦ繧ｹ繝翫ャ繝励ぎ繧､繝臥せ縺ｫ鄂ｮ縺九ｌ縺溷次蟄舌�蝣ｴ蜷�
                    if (!allowConnect) {
                        const checkCcGuide = (cAtom, targetAtom) => {
                            if (cAtom.element !== 'C') return false;
                            
                            // 逶ｸ謇句�縺ｮ莠碁㍾邨仙粋轤ｭ邏�繧呈爾縺�
                            const neighbors = this.userMolecule.getNeighbors(cAtom.id);
                            const dbNeighbor = neighbors.find(n => n.atom.element === 'C' && n.type === 2);
                            if (dbNeighbor) {
                                const baseAngle = Math.atan2(dbNeighbor.atom.y - cAtom.y, dbNeighbor.atom.x - cAtom.x);
                                // 120蠎ｦ螟門�縺ｮ繧ｬ繧､繝臥せ�郁ｷ晞屬 GRID_SIZE��
                                const angles = [baseAngle + (2 * Math.PI) / 3, baseAngle - (2 * Math.PI) / 3];
                                return angles.some(ang => {
                                    const sx = cAtom.x + GRID_SIZE * Math.cos(ang);
                                    const sy = cAtom.y + GRID_SIZE * Math.sin(ang);
                                    const d = Math.sqrt((targetAtom.x - sx)**2 + (targetAtom.y - sy)**2);
                                    return d < 2; // 螳悟�縺ｫ繧ｹ繝翫ャ繝怜精逹縺励※縺�ｋ縺溘ａ2px莉･蜀�〒蛻､螳�
                                });
                            }
                            return false;
                        };
                        if (checkCcGuide(a1, a2) || checkCcGuide(a2, a1)) {
                            allowConnect = true;
                        }
                    }

                    if (allowConnect) {
                        // 譌｢縺ｫ邨仙粋縺悟ｭ伜惠縺励↑縺��ｴ蜷医√°縺､謇句虚蜑企勁螻･豁ｴ縺ｫ蜷ｫ縺ｾ繧後↑縺��ｴ蜷医√°縺､荳｡蜴溷ｭ舌↓遨ｺ縺肴焔縺�1莉･荳翫≠繧句�ｴ蜷医�縺ｿ蜊倡ｵ仙粋(1)繧定ｿｽ蜉�縺吶ｋ
                        const key = [a1.id, a2.id].sort().join('_');
                        if (!this.userMolecule.deletedBonds.includes(key) && !this.userMolecule.getBond(a1.id, a2.id)) {
                            if (this.userMolecule.getFreeValency(a1.id) >= 1 && this.userMolecule.getFreeValency(a2.id) >= 1) {
                                console.log(`[AutoConnect] ${a1.element}(${a1.x}, ${a1.y}) - ${a2.element}(${a2.x}, ${a2.y}) dist=${dist.toFixed(1)} dx=${dx.toFixed(1)} dy=${dy.toFixed(1)}`);
                                this.userMolecule.addBond(a1.id, a2.id, 1);
                            }
                        }
                    }
                }
            }
        }
    }

    // 邨仙粋縺ｮ繧ｯ繝ｪ繝�け繝ｻ繝繝悶Ν繧ｯ繝ｪ繝�け繧､繝ｳ繧ｿ繝ｩ繧ｯ繧ｷ繝ｧ繝ｳ
    handleBondInteraction(bond, isDoubleClick) {
        if (isDoubleClick) {
            // 繝繝悶Ν繧ｯ繝ｪ繝�け縺ｧ邨仙粋縺ｮ蛻�妙�亥炎髯､��
            this.saveState();
            this.userMolecule.removeBond(bond.atomId1, bond.atomId2);
            this.autoCleanIsolatedAtoms(); // 蟄､遶九＠縺溷次蟄舌�繧ｯ繝ｪ繝ｼ繝ｳ繧｢繝��
            this.updateDrawing();
        } else {
            // 繧ｷ繝ｳ繧ｰ繝ｫ繧ｯ繝ｪ繝�け縺ｧ邨仙粋谺｡謨ｰ縺ｮ繝医げ繝ｫ (遘ｻ陦悟庄閭ｽ縺ｪ譛牙柑縺ｪ谺｡謨ｰ繧呈爾邏｢)
            const a1 = this.userMolecule.atoms.find(a => a.id === bond.atomId1);
            const a2 = this.userMolecule.atoms.find(a => a.id === bond.atomId2);
            if (!a1 || !a2) return;

            const maxType = this.getMaxBondType(a1.element, a2.element);
            if (maxType <= 1) return; // 蜊倡ｵ仙粋縺励°菴懊ｌ縺ｪ縺�ｵ仙粋�井ｾ�: C-Cl�峨�螟画峩荳榊庄

            const currentType = Number(bond.type) || 1;
            let nextType = currentType;
            let found = false;

            // 譛螟ｧ maxType 蝗槭Ν繝ｼ繝励＠縺ｦ縲∵ｬ｡縺ｫ遘ｻ陦悟庄閭ｽ縺ｪ邨仙粋谺｡謨ｰ繧呈爾邏｢縺吶ｋ
            for (let i = 1; i <= maxType; i++) {
                let testType = currentType + i;
                if (testType > maxType) {
                    testType = 1;
                }
                if (testType === currentType) break; // 荳蜻ｨ縺励◆繧臥ｵゆｺ�

                const diff = testType - currentType;
                const free1 = this.userMolecule.getFreeValency(bond.atomId1);
                const free2 = this.userMolecule.getFreeValency(bond.atomId2);

                // 貂帙ｉ縺吶ヨ繧ｰ繝ｫ縺ｧ縺ゅｋ縺九√∪縺溘�蠅励ｄ縺吶�縺ｫ蜊∝�縺ｪ遨ｺ縺肴焔縺後≠繧句�ｴ蜷医�縺ｿ險ｱ蜿ｯ
                if (diff <= 0 || (free1 >= diff && free2 >= diff)) {
                    nextType = testType;
                    found = true;
                    break;
                }
            }

            if (found && nextType !== currentType) {
                this.saveState();
                bond.type = nextType;
                this.autoLayoutBonds();
                this.updateDrawing();
            }
        }
    }

    // 謗･邯壹＠縺ｦ縺�ｋ驥榊次蟄舌′縺ｪ縺�ｼ亥ｭ､遶九＠縺滂ｼ牙次蟄舌ｒ閾ｪ蜍墓ｶ亥悉
    autoCleanIsolatedAtoms() {
        if (this.userMolecule.atoms.length <= 1) return;
        
        const toRemove = [];
        this.userMolecule.atoms.forEach(atom => {
            if (atom.isLocked) return;
            
            const neighbors = this.userMolecule.getNeighbors(atom.id);
            if (neighbors.length === 0) {
                toRemove.push(atom.id);
            }
        });
        
        if (toRemove.length > 0) {
            toRemove.forEach(id => {
                this.userMolecule.removeAtom(id);
            });
        }
    }

    // 謖�ｮ壹＆繧後◆蠎ｧ讓吶�霑代￥縺ｫ譌｢蟄倥�蜴溷ｭ舌′縺ゅｋ縺九メ繧ｧ繝�け縺吶ｋ
    isNearAnyExistingAtom(x, y, threshold = 75) {
        const nearest = this.findNearestAtom(x, y);
        return nearest ? nearest.distance <= threshold : false;
    }

    // 謖�ｮ壹＆繧後◆蠎ｧ讓吶°繧画怙繧りｿ代＞譌｢蟄伜次蟄舌ｒ謗｢縺�
    findNearestAtom(x, y) {
        let bestDist = Infinity;
        let nearest = null;
        this.userMolecule.atoms.forEach(atom => {
            const dx = atom.x - x;
            const dy = atom.y - y;
            const dist = Math.sqrt(dx*dx + dy*dy);
            if (dist < bestDist) {
                bestDist = dist;
                nearest = atom;
            }
        });
        return nearest ? { atom: nearest, distance: bestDist } : null;
    }

    // 豁｣隗｣繧ｿ繝ｼ繧ｲ繝�ヨ蛻�ｭ舌�螟ｧ縺阪＆縺ｫ繧ｭ繝｣繝ｳ繝舌せ繧定�蜍輔ヵ繧｣繝�ヨ縺輔○繧�
    fitCanvasToTarget() {
        const stage = STAGES[this.currentStageIndex];
        const targetMolecule = stage.createTarget();
        
        const bounds = this.calculateTargetBounds(targetMolecule);
        const W = bounds.maxX - bounds.minX;
        const H = bounds.maxY - bounds.minY;
        const cx = (bounds.minX + bounds.maxX) / 2;
        const cy = (bounds.minY + bounds.maxY) / 2;
        
        // 菴咏區繧貞性繧√◆隕夜㍽縺ｮ蠎�＆繧定ｨ育ｮ� (GRID_SIZE = 60縺ｪ縺ｮ縺ｧ縲∝ｷｦ蜿ｳ120px縲∽ｸ贋ｸ�90px遞句ｺｦ縺ｮ菴咏區)
        let viewW = Math.max(360, W + 240); // 譛蟆丞ｹ�ｒ360px縺ｫ險ｭ螳�
        let viewH = Math.max(270, H + 180); // 譛蟆城ｫ倥＆繧�270px縺ｫ險ｭ螳�
        
        // 繧｢繧ｹ繝壹け繝域ｯ斐ｒ 4:3 (800:600) 縺ｫ邯ｭ謖√☆繧�
        if (viewW / viewH > 4 / 3) {
            viewH = viewW * (3 / 4);
        } else {
            viewW = viewH * (4 / 3);
        }
        
        const vx = cx - viewW / 2;
        const vy = cy - viewH / 2;
        
        this.svg.setAttribute('viewBox', `${vx} ${vy} ${viewW} ${viewH}`);
    }

    // 繧ｿ繝ｼ繧ｲ繝�ヨ蛻�ｭ舌�蠎ｧ讓吝｢�阜繧定ｨ育ｮ�
    calculateTargetBounds(targetMolecule) {
        if (targetMolecule.atoms.length === 0) {
            return { minX: 400, maxX: 400, minY: 300, maxY: 300 };
        }
        
        let minX = Infinity, maxX = -Infinity;
        let minY = Infinity, maxY = -Infinity;
        
        targetMolecule.atoms.forEach(atom => {
            minX = Math.min(minX, atom.x);
            maxX = Math.max(maxX, atom.x);
            minY = Math.min(minY, atom.y);
            maxY = Math.max(maxY, atom.y);
        });
        
        return { minX, maxX, minY, maxY };
    }

    // 謗･邯壹＠縺ｦ縺�ｋ2縺､縺ｮ蜴溷ｭ舌�蜈�ｴ�遞ｮ縺九ｉ縲∝喧蟄ｦ逧�↓蜿悶ｊ蠕励ｋ譛螟ｧ邨仙粋谺｡謨ｰ (1:蜊�, 2:莠碁㍾, 3:荳蛾㍾) 繧定ｿ斐☆
    getMaxBondType(element1, element2) {
        const getValency = (elem) => {
            switch(elem) {
                case 'C': return 4;
                case 'N': return 3;
                case 'O': return 2;
                case 'Cl': return 1;
                case 'H': return 1;
                default: return 1;
            }
        };
        // 荳｡蜴溷ｭ舌�譛螟ｧ謇九�譛蟆丞､縲√°縺､迴ｾ螳溘�蜈ｱ譛臥ｵ仙粋縺ｮ譛螟ｧ谺｡謨ｰ縺ｧ縺ゅｋ 3 繧帝剞逡悟､縺ｨ縺吶ｋ
        return Math.min(getValency(element1), getValency(element2), 3);
    }
}

// 襍ｷ蜍�
window.addEventListener('DOMContentLoaded', () => {
    window.game = new Game();
});
