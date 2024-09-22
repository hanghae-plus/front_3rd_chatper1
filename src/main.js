import { getInitComponent } from "./components/pages/Init/Init";
import { movePage } from "./utils/navigations/movePage";
import {
  IS_PATCH,
  ROUTES,
} from "./components/contents/navigations/navigations";

const renderPage = (path, id) => {
  const component = ROUTES[path] || ROUTES["/404"];
  const container = IS_PATCH.includes(path) ? "#main" : "#root";
  document.querySelector(container).innerHTML = component();
};

document.querySelector("#root").innerHTML = getInitComponent();

window.addEventListener("popstate", () => {
  const currentPath = window.location.pathname;
  renderPage(currentPath);
});

document.getElementById("login").addEventListener("click", (e) => {
  e.preventDefault();
  movePage("/login");
});

document.getElementById("home").addEventListener("click", (e) => {
  e.preventDefault();
  movePage("/");
});

const currentPath = window.location.pathname;
renderPage(currentPath);

if (!ROUTES.includes(currentPath)) {
  movePage("/404");
}
