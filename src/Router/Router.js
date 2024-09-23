import { ErrorPage } from "../Page/ErrorPage";

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

    goto(path) {
        window.history.pushState({}, '', path);
        window.dispatchEvent(new Event('popstate'));
    }

    handlePopState() {
        console.log('handlePopState!')
        this.handleRoute(window.location.pathname);
    }

    handleRoute(path) {
        console.log('path: ', path);
        const handler = this.routes[path];
        if (handler) {
            handler();
        } else {
            ErrorPage()
        }
    }
}
