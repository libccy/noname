import { lib, game, ui, get, ai, _status } from "../../noname.js";
import characters from "./character.js";
import cards from "./card.js";
import pinyins from "./pinyin.js";
import skills from "./skill.js";
import translates from "./translate.js";

game.import("character", function () {
    return {
        name: "key",
        character: { ...characters },
        characterFilter: {
            key_jojiro(mode) {
                return mode == "chess" || mode == "tafang";
            },
            key_yuu(mode) {
                return (
                    mode == "identity" ||
                    mode == "doudizhu" ||
                    mode == "single" ||
                    (mode == "versus" && _status.mode != "standard" && _status.mode != "three")
                );
            },
            key_tomoya(mode) {
                return mode != "chess" && mode != "tafang" && mode != "stone";
            },
            key_sunohara(mode) {
                return mode != "guozhan";
            },
        },
        characterTitle: {
            key_satomi: "#rHeaven Burns Red",
            key_erika: "#rHeaven Burns Red",
            db_key_liyingxia: "#rHeaven Burns Red",
            key_kano: "#bAIR",
            key_mia: "#bLoopers",
            key_kotomi: "#gClannad<br>技能设计：落英逐紫裙",
            key_asara: "#bRewrite",
            key_yukito: "#bAIR",
            key_chihaya: "#bRewrite",
            key_rumi: "#rONE ~輝く季節へ~",
            key_youta: "#b神様になった日",
            key_sakuya: "#bRewrite",
            key_hiroto: "#b神様になった日",
            key_shizuku: "#bSummer Pockets",
            key_shiroha: "#bSummer Pockets",
            key_jojiro: "#bCharlotte<br>战棋专属角色",
            key_kotori: "#bRewrite",
            key_ryoichi: "#bSummer Pockets",
            key_yuu: "#bCharlotte",
            key_godan: "#rAngel Beats!",
            key_abyusa: "#rAngel Beats!",
            key_akiko: "#bKanon",
            key_kaori: "#bKanon",
            key_shiori: "#bKanon",
            key_miki: "#bSummer Pockets",
            key_shiorimiyuki: "#rAngel Beats!",
            key_shizuru: "#bRewrite",
            key_kyoko: "#bSummer Pockets",
            sp_key_kanade: "#rAngel Beats!",
            key_yuzuru: "#rAngel Beats!",
            key_tsumugi: "#bSummer Pockets",
            key_ayato: "#rAngel Beats!",
            key_nagisa: "#gClannad",
            key_tomoya: "#gClannad",
            key_noda: "#rAngel Beats!",
            key_hinata: "#rAngel Beats!",
            key_hisako: "#rAngel Beats!",
            key_doruji: "#bLittle Busters!",
            key_riki: "#bLittle Busters!",
            key_yuiko: "#bLittle Busters!",
            key_akane: "#bRewrite",
            key_sasami: "#bLittle Busters!",
            key_rin: "#bLittle Busters!",
            key_shiina: "#rAngel Beats!",
            key_inari: "#bSummer Pockets",
            key_saya: "#bLittle Busters!",
            key_harukakanata: "#bLittle Busters!",
            key_yui: "#rAngel Beats!",
            key_yoshino: "#bRewrite",
            key_kengo: "#bLittle Busters!",
            key_iwasawa: "#rAngel Beats!",
            key_masato: "#bLittle Busters!",
            key_yusa: "#bCharlotte",
            key_misa: "#rCharlotte",
            key_yukine: "#gClannad",
            key_komari: "#bLittle Busters!",
            key_umi: "#bSummer Pockets",
            key_rei: "#gHarmonia",
            key_lucia: "#bRewrite",
            key_kyousuke: "#bLittle Busters!",
            key_yuri: "#rAngel Beats!",
            key_haruko: "#bAIR",
            sp_key_yuri: "#bAngel Beats!",
            key_fuuko: "#gClannad",
        },
        card: { ...cards },
        skill: { ...skills },
        translate: { ...translates },
        pinyins: { ...pinyins },
    };
});
