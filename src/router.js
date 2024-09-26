import { HOME_PAGE, LOGIN_PAGE, PROFILE_PAGE, USERNAME } from "./constants";
import userStore from "./store/userStore";

class Router {
  constructor() {
    this.routes = [];
    this.notfound = () => {};
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

  addNotFoundRoute(handler) {
    this.notfound = handler;
  }

  push(path) {
    const validPath = this.routerGuard(path);
    history.pushState({}, "", validPath);

    const handler = this.routes[validPath];
    if (handler) {
      handler();
    } else {
      this.notfound();
    }
  }

  routerGuard(path) {
    if (path === LOGIN_PAGE && !!userStore.getState()[USERNAME]) {
      return HOME_PAGE;
    }
    if (path === PROFILE_PAGE && !userStore.getState()[USERNAME]) {
      return LOGIN_PAGE;
    }

    return path;
  }
}

const router = new Router();

export default router;
