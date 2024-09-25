import { isAuthenticated } from "../auth/auth";

export default function Router() {
  const routes = {};

  /**
   * 경로 추가
   * @param {string} path
   * @param {function} handler
   */
  const addRoute = (path, handler) => {
    routes[path] = handler;
  };

  /**
   * 라우터 가드
   * @param {string} path
   */
  const guard = (path) => {
    if (isAuthenticated() && path === "/login") {
      // 로그인 사용자가 로그인 페이지에 접근한 경우 홈 화면으로 전환
      navigateTo("/");
    } else if (!isAuthenticated() && path === "/profile") {
      // 비로그인 사용자가 프로필 페이지에 접근한 경우 로그인 페이지로 전환
      navigateTo("/login");
    } else {
      // 정상 접근 시 렌더링 && 비정상 URL 접근 시 404 화면
      const route = routes[path] || routes["/404"];
      route();
    }
  };

  const init = () => {
    guard(window.location.pathname);

    // popstate(앞으로가기/뒤로가기) 라우터 처리
    window.addEventListener("popstate", () => {
      guard(window.location.pathname);
    });
  };

  /**
   * 페이지 이동
   * @param {string} path
   */
  const navigateTo = (path) => {
    if (window.location.pathname !== path) {
      history.pushState(null, "", path);
      guard(path);
    }
  };

  return {
    addRoute,
    navigateTo,
    init,
    guard,
  };
}
