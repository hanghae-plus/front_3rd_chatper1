import { render } from "lit-html";
import { routes } from "./routes";
import { attachEventHandler } from "./event/eventHandler";
import { getUserInfo } from "./localStorage/user";
import { setUpPage } from "./setup/setupHandler";

const root = document.querySelector("#root");

const getFinalPath = (path) => {
  const isValidPath = path in routes;
  if (!isValidPath) return "/404";

  const { requiresAuth, redirectIfAuth } = routes[path];
  const isLogin = !!getUserInfo();

  if (requiresAuth && !isLogin) return "/login";
  if (redirectIfAuth && isLogin) return "/";

  return path;
};

export const renderPage = (path) => {
  const newPath = getFinalPath(path);
  if (path !== newPath) window.history.replaceState({}, "", newPath);
  const route = routes[newPath];

  render(route.content(), root);

  setUpPage(newPath);
  attachEventHandler(newPath);
};
