import { createObserver } from "./createObserver";

export const createRouter = (routes) => {
  //console.log("routes", routes);
  const { subscribe, notify } = createObserver();

  //존재하지 않는 경로로 접근하면 404 페이지가 렌더링된다.
  const getTarget = () => {
    //console.log("현재 경로:", window.location.pathname);
    const target = routes[window.location.pathname];
    //console.log("타겟 컴포넌트:", target ? target : "404 페이지로 이동");
    return target ? target : routes["/404"];
  };

  const push = (path) => {
    window.history.pushState(null, null, path);
    notify();
  };

  window.addEventListener("popstate", () => notify());

  return { push, subscribe, getTarget };
};
