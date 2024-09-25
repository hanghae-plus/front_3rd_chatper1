import authStore from "../store/authStore.js";

export default class Router {
  constructor() {
    this.routes = {};

    window.addEventListener("popstate", this.handlePopState.bind(this));
  }

  addRoute(path, handler) {
    this.routes[path] = handler;
  }

  navigateTo(path) {
    const isLoggedIn = authStore.getState("isLoggedIn");
    if (path === "/profile") {
      if (!isLoggedIn) {
        this.navigateTo("/login");
        return;
      }
    } else if (path === "/login") {
      if (isLoggedIn) {
        this.navigateTo("/");
        return;
      }
    }

    history.pushState(null, "", path);
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
      this.routes["*"]();
    }
  }
}
