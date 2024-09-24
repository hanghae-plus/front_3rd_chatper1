import {Store} from "../utils/store.js";

export const addLogoutEvent = () => {
    const store = new Store()
    const logoutBtn = document.getElementById('logout');

    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            localStorage.removeItem('isLogin');
            localStorage.removeItem('user');
            store.setState({ isLogin: false });
        });
    }
};