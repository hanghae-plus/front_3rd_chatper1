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
    // 로그인 정보 조회
    const user = JSON.parse(localStorage.getItem("user"));
    const route = routes[path]
      ? user
        ? routes[path]
        : routes["/login"]
      : routes["/404"];
    document.querySelector("#root").innerHTML = route();
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
