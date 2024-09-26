export default class Router {

    constructor() {
        this.routes = {};
        // popstate : 브라우저의 뒤로가기 버튼이나 history.back() 호출 등을 통해서만 발생된다.
        window.addEventListener('popstate', this.handlePopState.bind(this));

    }


    addRoute(path, handler) {
        this.routes[path] = handler;
    }

    navigateTo(path) {
        history.pushState(null, '', path);
        this.handleRoute(path);
        console.log('navigateTo' + path)
    }

    handlePopState() {
        console.log('handlePopState')
        this.handleRoute(window.location.pathname);
    }

    handleRoute(path) {
        const handler = this.routes[path];
        if (handler) {
            handler();
        } else {
            const notFoundHandler = this.routes['/error']
            notFoundHandler();
        }
    }

}