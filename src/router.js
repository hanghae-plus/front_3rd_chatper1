/**
 ** 즉시 실행 함수 표현식으로 감싸서 단일 인스턴스를 생성?
 */
export const createRouter = (function () {
  const routes = {};

  function addRoute(path, handler) {
    routes[path] = handler;
  }

  function navigateTo(path) {
    history.pushState({ path }, "", path);
    const handler = routes[path] || routes["/404"];
    if (handler) handler();
  }

  function initRouter() {
    window.addEventListener("popstate", () => {
      const path = window.location.pathname || "/";
      navigateTo(path);
    });
    // 초기 페이지 로드
    navigateTo(window.location.pathname || "/");
  }

  return { addRoute, navigateTo, initRouter };
})();

export const router = createRouter;
export const navigateTo = router.navigateTo;
