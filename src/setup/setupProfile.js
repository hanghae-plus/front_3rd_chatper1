import { getUserInfo } from "../localStorage/user";

export const setUpProfilePage = () => {
  const userInfo = getUserInfo();
  const { username, email, bio } = userInfo;

  const usernameInput = document.getElementById("username");
  const emailInput = document.getElementById("email");
  const bioInput = document.getElementById("bio");

  usernameInput.value = username;
  emailInput.value = email;
  bioInput.value = bio;
};
