import { updateUserInfo } from "../localStorage/user";

export const attachProfileEvent = () => {
  const form = document.getElementById("profile-form");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const bio = document.getElementById("bio").value;

    updateUserInfo({ username, email, bio });
  });
};
