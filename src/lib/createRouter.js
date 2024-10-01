import { createObserver } from "./createObserver";

export const createRouter = (routes) => {
  const { subscribe, notify } = createObserver();

  const getTarget = () => {
    const target = routes[window.location.pathname];
    return target ? target : routes["*"];
  };

  const push = (path) => {
    window.history.pushState(null, null, path);
    notify();
  };

  window.addEventListener("popstate", () => notify());

  return { push, subscribe, getTarget };
};
