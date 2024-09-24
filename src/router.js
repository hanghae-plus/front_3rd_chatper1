import { HOME_PAGE, LOGIN_PAGE, PROFILE_PAGE, USERNAME } from "./constants";
import UserInfo from "./UserInfo";

class Router {
  constructor() {
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
    const validPath = this.routerGuard(path);
    history.pushState({}, "", validPath);

    const handler = this.routes[validPath];
    if (handler) {
      handler();
    } else {
      const notFoundPage = this.routes["*"];
      notFoundPage();
    }
  }

  routerGuard(path) {
    const userInfo = new UserInfo();

    if (path === LOGIN_PAGE && !!userInfo.get(USERNAME)) {
      return HOME_PAGE;
    }
    if (path === PROFILE_PAGE && !userInfo.get(USERNAME)) {
      return LOGIN_PAGE;
    }

    return path;
  }
}

const router = new Router();

export default router;
