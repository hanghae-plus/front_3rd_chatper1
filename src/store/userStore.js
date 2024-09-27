import { removeFromLocalStorage, saveToLocalStorage } from "../localStorage";
import { createStore } from "./createStore";

const initialState = null;

export const userStore = createStore(initialState);

export const login = (userData) => {
  userStore.setState(userData);
  saveToLocalStorage("user", userStore.getState());
};

export const logout = () => {
  userStore.setState(null);
  removeFromLocalStorage("user");
};

export const updateUser = (updatedUserData) => {
  const currentState = userStore.getState();
  userStore.setState({
    ...currentState,
    ...updatedUserData,
  });
  saveToLocalStorage("user", userStore.getState());
};
