import { login } from "../localStorage/user";
import { navigate } from "../utils/navigate";

export const attachLoginEvent = () => {
  const form = document.getElementById("login-form");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    login(username);
    navigate("/profile");
  });
};
