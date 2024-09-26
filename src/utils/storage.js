import {Logger} from "./logger.js";

export class Storage {
    constructor() {
        this.logger = new Logger()
    }

    saveData(key, value) {
        try {
            const jsonValue = JSON.stringify(value)
            localStorage.setItem(key, jsonValue)
        } catch (error) {
            this.logger.log({
                type : 'error',
                location : 'class Storage',
                message : 'fail save data'
            })
        }
    }

    loadData(key) {
        try {
            const jsonValue = localStorage.getItem(key)
            return jsonValue ? JSON.parse(jsonValue) : null
        } catch (error) {
            this.logger.log({
                type : 'error',
                location : 'class Storage',
                message : 'fail load data'
            })
            return null
        }
    }

    removeData(key) {
        try {
            localStorage.removeItem(key)
        } catch (e) {
            this.logger.log({
                type : 'error',
                location : 'class Storage',
                message : 'fail remove data'
            })
        }
    }
}