import home from "./routers/home";
import login from "./routers/login";
import notFound from "./routers/notFound";
import profile from "./routers/profile";

class Router {
  constructor() {
    this.routes = {};
    window.addEventListener("popstate", this.handlePopState.bind(this));
    this.navigateTo = this.navigateTo.bind(this);
  }

  addRoute(path, component) {
    this.routes[path] = component;
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

    const component = this.routes[path];
    if (component) {
      document.querySelector("#root").innerHTML = component;
      if (path === "/login") {
        login.event(this.navigateTo);
      } else if (path === "/") {
        home.event(this.navigateTo);
      } else if (path === "/profile") {
        profile.event(this.navigateTo);
      }
    } else {
      this.navigateTo("/404");
    }
  }
}

const router = new Router();

router.addRoute("/", home.component);
router.addRoute("/login", login.component);
router.addRoute("/profile", profile.component);
router.addRoute("/404", notFound.component);
router.navigateTo(window.location.pathname);

window.addEventListener("error", (error) => {
  document.querySelector(
    "#root"
  ).innerHTML = `<h1>오류 발생!</h1> ${error.message}`;
});
