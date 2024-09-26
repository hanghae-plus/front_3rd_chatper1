import { goTo } from './util';

export const changeVisibilityBasedOnLoginStatus = (isUserLogin, loginButton, logoutButton, profileButton) => {
    if (typeof isUserLogin !== 'boolean') return;

    if (isUserLogin === true) {
        loginButton?.classList.add('hidden');
        profileButton?.classList.remove('hidden');
        logoutButton?.classList.remove('hidden');
    } else {
        logoutButton?.classList.add('hidden');
        profileButton?.classList.add('hidden');
        loginButton?.classList.remove('hidden');
    }
};

export const setLogoutButtonTappedEvent = (loginButton, logoutButton, profileButton, isUserLogin = false) => {
    logoutButton.addEventListener('click', function () {
        localStorage.removeItem('user');
        logoutButton.classList.add('hidden');
        loginButton.classList.remove('hidden');
        profileButton.classList.add('hidden');
        if (window.location.pathname === '/profile' && isUserLogin === true) {
            goTo('/');
        }
    });
};
