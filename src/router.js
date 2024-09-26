export default class Router {
  constructor(store) {
    if (Router.instance) {
      return Router.instance;
    }
    this.routes = [];
    window.addEventListener("popstate", this.handlePopState.bind(this));
    this.store = store;
    Router.instance = this;
  }

  addRoute(path, component) {
    this.routes[path] = component;
  }

  push(path) {
    const user = this.store.getState("user");
    const pathSegments = path.split("/");
    const lastSegment = pathSegments.pop();
    const newPath = "/" + lastSegment;

    if (newPath === "/profile" && !user) {
      window.history.pushState(null, "", "/login");
      this.handleRoute("/login");
      return;
    }

    if (newPath === "/login" && user) {
      window.history.pushState(null, "", "/");
      this.handleRoute("/");
      return;
    }

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
