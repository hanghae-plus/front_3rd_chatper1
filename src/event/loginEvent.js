import { login } from "../localStorage/user";
import { navigate } from "../utils/navigate";

export const attachLoginEvent = () => {
  const form = document.getElementById("login-form");
  const usernameInput = document.getElementById("username");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const username = document.getElementById("username").value;
      login(username);
      navigate("/profile");
    });
  }

  if (usernameInput) {
    window.addEventListener("error", (e) => {
      const errorArea = document.getElementById("error");
      errorArea.innerHTML = "오류 발생!" + "\n" + e.message;
    });
  }
};
