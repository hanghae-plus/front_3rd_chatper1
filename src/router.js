export default function createRouter(routes = {}) {
  /**
   * 경로 추가
   * @param {string} path
   * @param {HTMLElement} element
   */
  const addRoute = (path, element) => {
    routes[path] = element;
  };

  /**
   * 화면 렌더링
   * @param {string} path
   */
  const render = (path) => {
    // 로그인 정보 체크
    const isUser = JSON.parse(localStorage.getItem("user"));
    const isLoginPage = path === "/login";

    if (isUser && isLoginPage) {
      // 로그인 사용자가 로그인 페이지로 접근한 경우 홈 화면으로 전환
      navigateTo("/");
    } else if (!isUser && !isLoginPage && routes[path]) {
      // 비로그인 사용자가 로그인 페이지 외에 접근한 경우 로그인 페이지로 전환
      navigateTo("/login");
    } else {
      // 정상 접근 시 렌더링 && 비정상 URL 접근 시 404 화면
      const route = routes[path] || routes["/404"];
      document.querySelector("#root").innerHTML = route();
    }
  };

  /**
   * 페이지 이동
   * @param {string} path
   */
  const navigateTo = (path) => {
    if (window.location.pathname !== path) {
      history.pushState(null, "", path);
      render(path);
    }
  };

  return {
    addRoute,
    navigateTo,
    render,
  };
}
