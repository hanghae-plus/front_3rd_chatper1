import { render } from "lit-html";
import { routes } from "./routes";

const root = document.querySelector("#root");

export const renderPage = (path) => {
  const route = routes[path] || routes["/404"];

  render(route.content(), root);
};
