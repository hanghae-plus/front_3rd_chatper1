import {Store} from "../utils/store.js";
import {Logger} from "../utils/logger.js";
import {Storage} from "../utils/storage.js";

export const addLogoutEvent = () => {
    const store = new Store()
    const logger = new Logger()
    const storage = new Storage()
    const logoutBtn = document.getElementById('logout');

    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            storage.removeData('isLogin')
            storage.removeData('user')
            store.setState({ isLogin: false });
            logger.log({
                type : 'event',
                location : 'addLogoutEvent',
                message : 'success logout event'
            })
        });
    }
};