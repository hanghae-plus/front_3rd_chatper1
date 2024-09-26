import ErrorBoundary from "../components/error-boundary.component";
import Error from "../components/error.component";
import Footer from "../components/footer.component";
import Header from "../components/header.component";
import Home from "../components/home.component";
import Login from "../components/login.component";
import Profile from "../components/profile.component";
import { isNullorUndefined } from "../util";
import {
  error,
  login,
  home,
  profile,
  metadata,
  footer,
  header,
  bodyLayout,
  errorBoundary,
} from "./html";

class Router {
  constructor() {
    this.routes = {};
    this.templates = {
      HOME: home,
      PROFILE: profile,
      LOGIN: login,
      ERROR: error,
      FOOTER: footer,
      HEADER: header,
      ERROR_BOUNDARY: errorBoundary,
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

  bodyLayoutInit() {
    document.body.innerHTML = bodyLayout;
  }

  activateLink(targetId, path) {
    document.getElementById("root").addEventListener("click", (event) => {
      if (event.target.type === "submit") return;
      event.preventDefault();
      if (event.target.id === targetId) {
        this.navigateTo(path);
      }
    });
  }

  activateLogout() {
    document.getElementById("root").addEventListener("click", (event) => {
      if (event.target.id !== "logout") return;
      event.preventDefault();
      if (!isNullorUndefined(localStorage.getItem("user"))) {
        localStorage.clear();
      }
      this.navigateTo("/login");
    });
  }

  checkLogin() {
    const isLogin = !isNullorUndefined(localStorage.getItem("user"));
    return isLogin;
  }

  activateErrorBoundary(targetId) {
    window.addEventListener("error", (event) => {
      ErrorBoundary(targetId, event.error);
    });
  }
}

export const router = new Router();

router.addRoute("/", () => {
  Header("HOME");
  Home();
  Footer();
});

router.addRoute("/profile", () => {
  if (!router.checkLogin()) {
    router.navigateTo("/login");
    return;
  }
  Header("PROFILE");
  Profile();
  Footer();
});

router.addRoute("/login", () => {
  if (router.checkLogin()) {
    router.navigateTo("/");
    return;
  }

  Login();
});

router.addRoute("/notFound", () => {
  Error();
});
