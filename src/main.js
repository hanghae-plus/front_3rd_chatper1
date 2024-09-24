import { renderPage } from "./renderPage";

const initialLoad = () => {
  const path = window.location.pathname;
  renderPage(path);
};

window.addEventListener("popstate", () => {
  initialLoad();
});

initialLoad();
