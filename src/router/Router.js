import UserStorage from "../utils/UserStorage.js";

export default class Router {
  constructor() {
    this.routes = {};

    window.addEventListener("popstate", this.handlePopState.bind(this));
  }

  // 경로와 핸들러를 추가하는 메서드
  addRoute(path, handler) {
    this.routes[path] = handler;
  }

  // 경로로 이동하는 메서드
  navigateTo(path) {
    const isLoggedIn = new UserStorage().get("name");

    // 로그인 상태가 아니라면 프로필 페이지로 이동
    if (path === "/profile" && !isLoggedIn) {
      history.pushState(null, "", "/login");
      this.handleRoute("/login");
      return;
    }

    // 로그인 상태라면 로그인 페이지로 이동
    if (path === "/login" && isLoggedIn) {
      history.pushState(null, "", "/");
      this.handleRoute("/");
      return;
    }

    history.pushState(null, "", path);
    this.handleRoute(path);
  }

  // 뒤로가기, 앞으로가기 시 발생하는 이벤트 핸들러
  handlePopState() {
    this.handleRoute(window.location.pathname);
  }

  // 경로에 해당하는 핸들러를 실행하는 메서드
  handleRoute(path) {
    const handler = this.routes[path];

    if (handler) {
      handler();
    } else {
      this.routes["*"]();
    }
  }
}
