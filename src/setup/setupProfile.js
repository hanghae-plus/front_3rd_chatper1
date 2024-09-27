import { userStore } from "../store/userStore";

export const setUpProfilePage = () => {
  const { username, email, bio } = userStore.getState();

  const usernameInput = document.getElementById("username");
  const emailInput = document.getElementById("email");
  const bioInput = document.getElementById("bio");

  usernameInput.value = username;
  emailInput.value = email;
  bioInput.value = bio;
};
