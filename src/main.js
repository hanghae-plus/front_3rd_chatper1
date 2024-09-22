import { getHomeComponent } from "./components/pages/Home/Home";
import { getInitComponent } from "./components/pages/Init/Init";
import { getLoginComponent } from "./components/pages/Login/Login";

document.querySelector("#root").innerHTML = getInitComponent();

document.getElementById("login").addEventListener("click", (e) => {
  e.preventDefault();
  history.pushState({ page: "login" }, "login", "login");
  document.querySelector("#main").innerHTML = getLoginComponent();
});

document.getElementById("main").addEventListener("click", (e) => {
  e.preventDefault();
  history.pushState({ page: 2 }, "main", "main");
  document.querySelector("#main").innerHTML = getHomeComponent();
});
