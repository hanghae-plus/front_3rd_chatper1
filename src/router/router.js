import Error from "../components/error.component";
import Home from "../components/home.component";
import Login from "../components/login.component";
import Profile from "../components/profile.component";
import { isNullorUndefined } from "../util";
import { error, login, home, profile, metadata } from "./html";

class Router {
  constructor() {
    this.routes = {};
    this.templates = {
      HOME: home,
      PROFILE: profile,
      LOGIN: login,
      ERROR: error,
    };
    window.addEventListener("popstate", this.handlePopState.bind(this));
  }

  addRoute(path, handler) {
    this.routes[path] = handler;
  }

  navigateTo(path) {
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
      router.navigateTo("/notFound");
    }
  }

  metadataInit(templateName) {
    document.head.innerHTML = metadata(templateName);
  }

  activateLink(elementId, path) {
    document.getElementById(elementId).addEventListener("click", (event) => {
      event.preventDefault();
      this.navigateTo(path);
    });
  }

  loginGuard() {
    const isLogin = !isNullorUndefined(localStorage.getItem("user"));
    if (!isLogin) {
      this.navigateTo("/login");
    }
    return isLogin;
  }
}

export const router = new Router();

router.addRoute("/", () => {
  Home();
});

router.addRoute("/profile", () => {
  router.loginGuard() && Profile();
});

router.addRoute("/login", () => {
  Login();
});

router.addRoute("/notFound", () => {
  Error();
});
