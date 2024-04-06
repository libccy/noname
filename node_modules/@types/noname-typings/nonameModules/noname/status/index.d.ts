export namespace status {
    let paused: boolean;
    let paused2: boolean;
    let paused3: boolean;
    let over: boolean;
    let clicked: boolean;
    let auto: boolean;
    let event: GameEventPromise;
    let ai: {};
    let lastdragchange: any[];
    let skillaudio: any[];
    let dieClose: any[];
    let dragline: any[];
    let dying: any[];
    let globalHistory: GameHistory[];
    namespace cardtag {
        let yingbian_zhuzhan: any[];
        let yingbian_kongchao: any[];
        let yingbian_fujia: any[];
        let yingbian_canqu: any[];
        let yingbian_force: any[];
    }
    let renku: any[];
    let prehidden_skills: any[];
    let postReconnect: {};
    let extension: string | void;
    let dragged: boolean | void;
    let touchconfirmed: boolean | void;
}
export namespace _status { }
