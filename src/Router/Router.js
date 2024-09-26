import { Error } from '../Page/Error';

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
        this.handleRoute(window.location.pathname);
    }

    handleRoute(path) {
        const handler = this.routes[path];
        if (handler) {
            handler();
        } else {
            Error();
        }
    }

    init() {
        window.addEventListener('hashchange', () => {
            const path = window.location.hash.slice(1) || '/';
            this.handleRoute(path);
        });

        this.handleRoute(window.location.pathname || '/');
    }
}
