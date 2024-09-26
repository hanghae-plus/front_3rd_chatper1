import MainLayout from "./MainLayout";

export default class Router {
  constructor() {
    this.routes = {};
    window.addEventListener("popstate", this.handlePopState.bind(this));
    this.navigateTo = this.navigateTo.bind(this);
  }

  addRoute(path, page) {
    this.routes[path] = page;
  }

  navigateTo(path) {
    history.pushState(null, "", path);

    this.handleRoute(path);
  }

  handlePopState() {
    this.handleRoute(window.location.pathname);
  }

  handleRoute(path) {
    const user = localStorage.getItem("user");
    if (!user && path === "/profile") {
      this.navigateTo("/login");
      return;
    }

    if (user && path === "/login") {
      this.navigateTo("/");
      return;
    }

    const page = this.routes[path];
    if (page) {
      MainLayout({ path, page, onNavigateTo: this.navigateTo });
    } else {
      this.navigateTo("/404");
    }
  }
}
