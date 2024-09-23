import { getInitComponent } from "./components/pages/Init/Init";
import { movePage } from "./utils/navigations/movePage";
import { render } from "./utils/rendering/render";

document.querySelector("#root").innerHTML = getInitComponent();

window.addEventListener("popstate", () => {
  const currentPath = window.location.pathname;
  render(currentPath);
});

document.getElementById("login").addEventListener("click", (e) => {
  e.preventDefault();
  movePage("/login");
});

document.getElementById("home").addEventListener("click", (e) => {
  e.preventDefault();
  movePage("/");
});
