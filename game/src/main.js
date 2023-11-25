// TODO: 补充一点描述

// 目前仍将五个游戏变量当作命名空间
import * as game from "./game.js"
import * as lib from "./lib.js"
import * as ui from "./ui.js"
import * as get from "./get.js"
import * as ai from "./ai.js"

// TODO: 决定`_status`的实现
const _status = {
    /* unresolved */
}

// 目前仍以lib.init.init表示初始化游戏，未来或许会直接将代码写在main.js
lib.init.init(lib, game, ui, get, ai, _status).catch(e => throw e);
