export default class Router {
  constructor() {
    if (Router.instance) {
      return Router.instance;
    }
    this.routes = [];
    window.addEventListener("popstate", this.handlePopState.bind(this));
    Router.instance = this;
  }

  addRoute(path, component) {
    this.routes[path] = component;
  }

  push(path) {
    const pathSegments = path.split("/");
    const lastSegment = pathSegments.pop();
    const newPath = "/" + lastSegment;
    window.history.pushState(null, "", newPath);
    this.handleRoute(newPath);
  }

  handlePopState() {
    this.handleRoute(window.location.pathname);
  }

  handleRoute(path) {
    const component = this.routes[path];
    if (component) {
      component().render();
    } else {
      this.routes["/404"]().render();
    }
  }
}
