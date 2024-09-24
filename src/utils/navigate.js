import { renderPage } from "../renderPage";

export const navigate = (path) => {
  window.history.pushState({}, path);
  renderPage(path);
};
