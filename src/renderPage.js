import { render } from "lit-html";
import { routes } from "./routes";
import { attachEventHandler } from "./event/eventHandler";

const root = document.querySelector("#root");

const getFinalPath = (path) => {
  const isValidPath = path in routes;
  if (!isValidPath) return "/404";

  return path;
};

export const renderPage = (path) => {
  path = getFinalPath(path);
  const route = routes[path];

  render(route.content(), root);

  attachEventHandler(path);
};
