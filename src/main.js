import { getHomeComponent } from "./components/pages/Home/Home";
import { getInitComponent } from "./components/pages/Init/Init";
import { getLoginComponent } from "./components/pages/Login/Login";
import { getErrorComponent } from "./components/pages/Error/Error";

document.querySelector("#root").innerHTML = getInitComponent();

document.getElementById("login").addEventListener("click", (e) => {
  e.preventDefault();
  history.pushState({ page: "login" }, "loginPage", "login");
  document.querySelector("#main").innerHTML = getLoginComponent();
});

document.getElementById("home").addEventListener("click", (e) => {
  e.preventDefault();
  history.pushState({ page: 2 }, "mainPage", "/");
  document.querySelector("#main").innerHTML = getHomeComponent();
});

const currentPath = window.location.pathname;
const isPaths = ["/login", "/"];
if (!isPaths.includes(currentPath)) {
  history.replaceState({ page: "error" }, "errorPage", "error");
  document.querySelector("#main").innerHTML = getErrorComponent();
}
