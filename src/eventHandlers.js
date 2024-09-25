import { navigate } from "./router.js";

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
    if (!username) return alert("아이디를 입력해주세요.");
    localStorage.setItem(
      "user",
      JSON.stringify({ username, email: "", bio: "" })
    );
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
    localStorage.setItem("user", JSON.stringify({ username, email, bio }));
    alert("프로필이 업데이트되었습니다.");
  }
};

export { handleLinkClick, handleLogin, handleLogout, handleUpdateProfile };
