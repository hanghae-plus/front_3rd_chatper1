import { removeFromLocalStorage, saveToLocalStorage } from "./utils";

const USER_KEY = "user";

export const login = (username) => {
  saveToLocalStorage(USER_KEY, { username, email: "", bio: "" });
};

export const logout = () => {
  removeFromLocalStorage(USER_KEY);
};

export const updateUserInfo = (userInfo) => {
  saveToLocalStorage(USER_KEY, userInfo);
};
