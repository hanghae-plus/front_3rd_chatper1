import { renderPage } from "./router.js";
import { handleLinkClick, handleLogout, handleLogin } from "./eventHandlers.js";

document.addEventListener("click", (event) => {
  handleLinkClick(event);
  handleLogout(event);
});

document.addEventListener("submit", (event) => {
  handleLogin(event);

  if (event.target.id === "profile-form") {
    event.preventDefault();
    const username = document.querySelector("#username").value;
    const email = document.querySelector("#email").value;
    const bio = document.querySelector("#bio").value;
    localStorage.setItem("user", JSON.stringify({ username, email, bio }));
    alert("프로필이 업데이트되었습니다.");
  }
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
