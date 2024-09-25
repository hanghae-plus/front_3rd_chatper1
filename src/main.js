import { navigate, renderPage } from "./router.js";

const handleLinkClick = (event) => {
  if (event.target.tagName === "A" && event.target.href) {
    event.preventDefault();
    const href = event.target.getAttribute("href");
    navigate(href);
  }
};

const handleTabClick = () => {
  const tabs = document.querySelectorAll("a.tab");
  tabs.forEach((tab) => {
    tab.classList.remove("text-blue-600");
    tab.classList.remove("font-bold");
    tab.classList.add("text-gray-600");
  });
  const currentTab = window.location.pathname;
  const tab = document.querySelector(`a[href="${currentTab}"]`);
  if (!tab) return;
  tab.classList.remove("text-gray-600");
  tab.classList.add("text-blue-600");
  tab.classList.add("font-bold");
};

const handleLogin = () => {
  const username = document.querySelector("#username").value;
  if (!username) return alert("아이디를 입력해주세요.");
  localStorage.setItem(
    "user",
    JSON.stringify({ username, email: "", bio: "" })
  );
  navigate("/profile");
};

const handleLogout = (event) => {
  if (event.target.tagName === "A" && event.target.id === "logout") {
    event.preventDefault();
    localStorage.removeItem("user");
    navigate("/login");
  }
};

document.addEventListener("click", (event) => {
  handleLinkClick(event);
  handleLogout(event);
});

document.addEventListener("submit", (event) => {
  if (event.target.id === "login-form") {
    event.preventDefault();
    handleLogin();
  }
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
