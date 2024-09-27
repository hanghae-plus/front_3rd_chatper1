// import {Error} from '../templates/error.js';
import {error} from '../templates/error.js';
import {Login} from "../templates/login.js";
import {Profile} from "../templates/profile.js";
import {Main} from "../templates/main.js";

function isLoggedIn(){
    return localStorage.getItem('user') !== null;
}

function logout(){
    localStorage.removeItem('user');
    router.navigateTo('/login');
}

class Router {
    constructor() {
        this.routes = {};
        window.addEventListener('popstate', this.handlePopState.bind(this));
    }

    addRoute(path, handler) {
        this.routes[path] = handler;
    }
    beforeNavigate(callback){

    }
    navigateTo(path) {
        history.pushState(null, '', path);
        this.handleRoute(path);
    }

    handlePopState() {
        this.handleRoute(window.location.pathname);
    }

    handleRoute(path) {
        if(path === '/profile' && !isLoggedIn()){
            this.navigateTo('/login');
            return;
        }
        const handler = this.routes[path];
        if (handler) {
            handler();
        } else {
            this.routes['/404']();
        }
    }
}

const router = new Router();

router.addRoute('/profile', () => {
    document.querySelector('#root').innerHTML = Profile();

    const profileForm = document.getElementById('profile-form');
    if (profileForm) {
        profileForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const user = JSON.parse(localStorage.getItem('user')) || {};
            user.bio = document.getElementById('bio').value;
            user.username = document.getElementById('username').value;
            user.email = document.getElementById('email').value;
            localStorage.setItem('user', JSON.stringify(user));

            router.navigateTo('/profile');
        });
    }

    const logoutTab = document.getElementById('logout');
    if (logoutTab) {
        logoutTab.addEventListener('click', (event) => {
            event.preventDefault();
            logout();
        });
    }
});

router.addRoute('/', () => {
    document.querySelector('#root').innerHTML = Main();
    const logoutTab = document.getElementById('logout');
    if(logoutTab){
        logoutTab.addEventListener('click', (event) => {
            event.preventDefault();
            logout();
        });
    }
});

router.addRoute('/login', () => {
    document.querySelector('#root').innerHTML = Login();
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            localStorage.setItem('user', JSON.stringify({ username, email, bio: '' }));
            router.navigateTo('/');
        });
    }
});

router.addRoute('/404', () => {
    document.querySelector('#root').innerHTML = error();
});
document.querySelectorAll('a').forEach(anchor => {
    anchor.addEventListener('click', (event) => {
        event.preventDefault();
        const path = anchor.getAttribute('href');
        router.navigateTo(path);
    });
});

router.handleRoute(window.location.pathname);