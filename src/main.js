import { navigateTo, router } from "./router";

window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (e) => {
    if (e.target.classList.contains("home")) {
      e.preventDefault();
      navigateTo("/");
    } else if (e.target.classList.contains("profile")) {
      e.preventDefault();
      navigateTo("/profile");
    } else if (e.target.classList.contains("login")) {
      e.preventDefault();
      navigateTo("/login");
    }
  });

  router();
});
