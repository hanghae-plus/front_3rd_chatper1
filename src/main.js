import { getFromLocalStorage } from "./localStorage";
import { renderPage } from "./renderPage";
import { userStore } from "./store/userStore";

const initialLoad = () => {
  const storedState = getFromLocalStorage("user");

  if (storedState) {
    console.log("initialSetup");
    userStore.setState(storedState);
  }

  const path = window.location.pathname;
  renderPage(path);
};

window.addEventListener("popstate", () => {
  initialLoad();
});

initialLoad();

userStore.subscribe(() => {
  const path = window.location.pathname;
  renderPage(path);
});
