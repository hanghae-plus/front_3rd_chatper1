import createStore from "./createStore.js";

const authStore = createStore({
  isLoggedIn: false,
  user: null,
});

export default authStore;
