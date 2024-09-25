export class Logger {
    constructor() {
        if (Logger.instance) {
            return Logger.instance;
        }
        Logger.instance = this;
        this.logs = [];
    }

    log(logs) {
        const timestamp = new Date().toISOString();
        const newLog = { timestamp, ...logs };
        const existingLogs = this.logs || [];
        existingLogs.push(newLog);

        localStorage.setItem('logger', JSON.stringify(existingLogs));

        this.logs = existingLogs;
    }

    getLogs() {
        try {
           return [...this.logs,...JSON.parse(localStorage.getItem('logger')) || []]
        } catch (e) {
            this.log({type : 'error', location : 'Logger' , message : 'log storage parse error'})
        }
    }
}