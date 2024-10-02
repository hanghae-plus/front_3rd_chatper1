import { createObserver } from "./createObserver";
import { NotFoundPage } from '../pages';

export const createRouter = (routes) => {
  const { subscribe, notify } = createObserver();

  const getTarget = () =>
    routes[window.location.pathname] ?? NotFoundPage

  const push = (path) => {
    window.history.pushState(null, null, path);
    notify();
  };

  window.addEventListener('popstate', () => notify());

  return { push, subscribe, getTarget }
};