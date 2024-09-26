import { navigateTo, router } from "./router";

window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () => {
  router();

  // 이벤트 위임
  const navElement = document.getElementById("header-nav");
  if (navElement) {
    navElement.addEventListener("click", (e) => {
      if (e.target && e.target.classList.contains("home")) {
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
  }
});
