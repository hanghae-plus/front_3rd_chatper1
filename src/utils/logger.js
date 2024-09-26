import {Storage} from "./storage.js";

export class Logger {
    constructor() {
        if (Logger.instance) {
            return Logger.instance;
        }
        Logger.instance = this;
        this.logs = [];
        this.storage = new Storage()
    }

    //@TODO event 수집만을 위한 logger 메서드를 생성 하여 정해진 구조로만 받게 강제하고 저장하게 사용?

    log(logs) {
        const timestamp = new Date().toISOString();
        const newLog = { timestamp, ...logs };
        const existingLogs = this.storage.loadData('logger') || [];
        existingLogs.push(newLog);

        this.storage.saveData('logger', existingLogs)

        this.logs = existingLogs;
    }

    getLogs() {
        try {
           return [...this.logs, ...this.storage.loadData('logger') || []]
        } catch (e) {
            this.log({type : 'error', location : 'Logger' , message : 'log storage parse error'})
        }
    }
}