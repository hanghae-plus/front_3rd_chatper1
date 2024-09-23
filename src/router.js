export default class Router {
  constructor() {
    if (Router.instance) {
      return Router.instance;
    }
    Router.instance = this;
    this.routes = [];

    window.addEventListener("popstate", () => {
      const path = window.location.pathname;

      this.push(path);
    });
  }

  currentPath() {
    return window.location.pathname;
  }

  addRoute(path, handler) {
    this.routes[path] = handler;
  }

  push(path) {
    history.pushState({}, "", path);

    const handler = this.routes[path];
    if (handler) {
      handler();
    } else {
      const notFoundPage = this.routes["*"];
      notFoundPage();
    }
  }
}
