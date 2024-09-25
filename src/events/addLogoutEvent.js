import {Store} from "../utils/store.js";
import {Logger} from "../utils/logger.js";

export const addLogoutEvent = () => {
    const store = new Store()
    const logger = new Logger()
    const logoutBtn = document.getElementById('logout');

    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            localStorage.removeItem('isLogin');
            localStorage.removeItem('user');
            store.setState({ isLogin: false });
            logger.log({
                type : 'event',
                location : 'addLogoutEvent',
                message : 'success logout event'
            })
        });
    }
};