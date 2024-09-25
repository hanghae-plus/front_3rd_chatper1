import { renderPage } from "./router.js";
import {
  handleLinkClick,
  handleLogout,
  handleLogin,
  handleUpdateProfile,
} from "./eventHandlers.js";

document.addEventListener("click", (event) => {
  handleLinkClick(event);
  handleLogout(event);
});

document.addEventListener("submit", (event) => {
  handleLogin(event);
  handleUpdateProfile(event);
});

window.addEventListener("popstate", () => {
  renderPage();
});

document.addEventListener("DOMContentLoaded", () => {
  renderPage();
});

window.addEventListener("error", (event) => {
  document.querySelector("#root").innerHTML = /* HTML */ `
    <div
      class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
      class=""
      role="alert"
    >
      <strong class="font-bold block">오류 발생!</strong>
      <p class="block sm:inline">${event.message}</p>
    </div>
  `;
});
