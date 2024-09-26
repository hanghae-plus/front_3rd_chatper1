import { renderPage } from "./router.js";
import { navigate } from "./router.js";
import { user as userStore } from "./store/user.js";

const handleLinkClick = (event) => {
  if (event.target.tagName === "A" && event.target.href) {
    event.preventDefault();
    const href = event.target.getAttribute("href");
    navigate(href);
  }
};

const handleLogin = (event) => {
  if (event.target.id === "login-form") {
    event.preventDefault();
    const username = document.querySelector("#username").value;
    const { setUser } = userStore();
    if (!username) return alert("아이디를 입력해주세요.");
    setUser({ username, email: "", bio: "" });
    navigate("/profile");
  }
};

const handleLogout = (event) => {
  if (event.target.tagName === "A" && event.target.id === "logout") {
    event.preventDefault();
    localStorage.removeItem("user");
    navigate("/login");
  }
};

const handleUpdateProfile = (event) => {
  if (event.target.id === "profile-form") {
    event.preventDefault();
    const username = document.querySelector("#username").value;
    const email = document.querySelector("#email").value;
    const bio = document.querySelector("#bio").value;
    const { setUser } = userStore();
    setUser({ username, email, bio });
    alert("프로필이 업데이트되었습니다.");
  }
};

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
