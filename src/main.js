import { ErrorPage } from "./pages/error";
import { MainPage } from "./pages/home";
import { LoginPage } from "./pages/login";
import { ProfilePage } from "./pages/profile";
import { Store } from "./store";

const Router = (function () {
  const routes = {
    "/": MainPage,
    "/profile": ProfilePage,
    "/login": LoginPage,
    "/error": ErrorPage,
  };

  function addRoute(path, component) {
    routes[path] = component;
  }

  function navigate(path) {
    const component = routes[path] || routes["/error"];
    document.querySelector("#root").innerHTML = component();
    window.history.pushState(null, "", path);
  }

  function init() {
    document.querySelector("#root").innerHTML = MainPage();
    document.querySelector("nav").addEventListener("click", (e) => {
      if (e.target.tagName === "A") {
        e.preventDefault();
        const { pathname: path } = new URL(evt.target.href);
        navigate(path);
      }
    });

    window.addEventListener("popstate", () => {
      navigate(window.location.pathname);
    });
    console.log(window.location.pathname);
    navigate(window.location.pathname);
  }

  return {
    addRoute,
    navigate,
    init,
  };
})();

Router.init();

const store = new Store();

const form = document.querySelector("form");
const email = form.querySelector('input[type="text"]');
const password = form.querySelector('input[type="password"]');

form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(email.value);
});
