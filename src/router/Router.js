import Error from "../components/Error";
import Login from "../components/Login";
import Main from "../components/Main";
import Profile from "../components/Profile";

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
    this.handlePopState(path);
  }

  handlePopState() {
    this.handleRoute(window.location.pathname);
  }

  handleRoute(path) {
    const handler = this.routes[path];
    console.log("handler", handler);
    if (handler) {
      handler();
    } else {
      this.errorPage();
    }
  }

  errorPage(){
    document.querySelector("#root").innerHTML = `${Error()}`;
  }
}

export const router = new Router();

// const pathInfo = [
//   { title: "홈", path: "/", component: Main() },
// { title: "로그인", path: "/login", component: Login() },
// { title: "프로필", path: "/profile", component: Profile() },
// ];

router.addRoute('/', ()=> Main());
router.addRoute('/login', ()=> Login());
router.addRoute('/profile', ()=> Profile());
