import { ErrorPage } from '../Page/ErrorPage';

export class Router {
    constructor() {
        this.routes = {};
        window.addEventListener('popstate', this.handlePopState.bind(this));
    }

    addRoute(path, handler) {
        this.routes[path] = handler;
    }

    navigateTo(path) {
        history.pushState(null, '', path);
        this.handleRoute(path);
    }

    handlePopState() {
        console.log('handlePopState!');
        this.handleRoute(window.location.pathname);
    }

    handleRoute(path) {
        console.log('path: ', path);
        const handler = this.routes[path];
        if (handler) {
            handler();
        } else {
            ErrorPage();
        }
    }

    init() {
        console.log('📌 router init');
        window.addEventListener('hashchange', () => {
            const path = window.location.hash.slice(1) || '/';
            console.log(window.location.pathname)
            this.handleRoute(path);
        });

        // 초기 라우트 처리
        this.handleRoute(window.location.pathname || '/');
    }
}
