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

    window.history.pushState(null, "", newPath);
    this.handleRoute(newPath);
  }

  handlePopState() {
    const path = window.location.pathname;
    const user = this.store.getState("user");

    if (path === "/login" && user) {
      window.history.replaceState(null, "", "/");
      this.handleRoute("/");
    } else if (path === "/profile" && !user) {
      window.history.replaceState(null, "", "/login");
      this.handleRoute("/login");
    } else {
      this.handleRoute(path);
    }
  }

  handleRoute(path) {
    const component = this.routes[path];
    if (component) {
      component().render();
      console.log(document.body.innerHTML);
    } else {
      this.routes["/404"]().render();
    }
  }
}
