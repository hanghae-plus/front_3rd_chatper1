export default class Router {
  constructor() {
    this.defaultPage = null;
    this.routeTable = [];
    window.addEventListener("popstate", this.route.bind(this));
    this.listeners = [];
    this.authGuard = {};
  }

  setDefaultPage(pathname, pagename) {
    this.defaultPage = {
      path: pathname,
      page: pagename,
    };
  }

  setErrorPage(page) {
    this.errorPage = page;
  }

  addRoutePath(path, page) {
    this.routeTable.push({ path, page });
  }

  addAuthGuard(path, guardFunction) {
    this.authGuard[path] = guardFunction;
  }

  route() {
    let path;
    try {
      path = new URL(window.location.href).pathname;
    } catch (error) {
      console.error("Error parsing URL:", error);
      path = window.location.pathname || "/";
    }

    if (this.authGuard[path]) {
      const guardResult = this.authGuard[path]();
      if (!guardResult) {
        return;
      }
    }

    if (path === "/") {
      if (this.defaultPage) {
        this.defaultPage.page.render();
      } else {
        console.error("default page가 없습니다.");
        this.renderErrorPage();
      }
      return;
    }

    const route = this.routeTable.find((route) => route.path === path);
    if (route) {
      const view =
        typeof route.page === "function" ? new route.page() : route.page;
      view.render();
    } else {
      this.renderErrorPage();
    }
  }
  async navigate(path) {
    window.history.pushState({}, "", path);
    await this.route();
  }
  renderErrorPage() {
    if (this.errorPage) {
      this.errorPage.render();
    } else {
      console.error("Error page is not set");
    }
  }
}
