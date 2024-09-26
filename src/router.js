import User from "./js/user.js";
import MainPage from "./pages/MainPage.js";
import ProfilePage from "./pages/ProfilePage.js";
import LoginPage from "./pages/LoginPage.js";
import ErrorPage from "./pages/ErrorPage.js";

class Router {
  constructor() {
    this.routes = {};
    window.addEventListener("popstate", this.handlePopState.bind(this));
  }

  addRoute(path, handler) {
    this.routes[path] = handler;
  }

  navigateTo(path) {
    history.pushState(null, "", path);
    return this.handleRoute(path);
  }

  handlePopState() {
    this.handleRoute(window.location.pathname);
  }

  async handleRoute(path) {
    let handler = this.routes[path] || this.routes["*"];
    if (handler) {
      await handler();
    } else {
      console.log("404 Not Found");
    }
  }
}

const router = new Router();

router.addRoute("/", () => {
  const mainPage = new MainPage();
  document.getElementById("root").innerHTML = mainPage.render();
  mainPage.init();
});

router.addRoute("/login", () => {
  const user = User.getUser();
  if (user) {
    router.navigateTo("/");
    return;
  }
  const loginPage = new LoginPage();
  document.getElementById("root").innerHTML = loginPage.render();
  loginPage.init();
});

router.addRoute("/profile", () => {
  const user = User.getUser();
  if (!user) {
    router.navigateTo("/login");
    return;
  }
  const profilePage = new ProfilePage();
  document.getElementById("root").innerHTML = profilePage.render();
  profilePage.init();
});

router.addRoute("/404", () => {
  document.getElementById("root").innerHTML = ErrorPage();
});

router.addRoute("*", () => {
  document.getElementById("root").innerHTML = ErrorPage();
});

export default router;
