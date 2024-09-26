import router from "./router";
import customEventListener from "./customEventListener";
import { HOME_PAGE, LOGIN_PAGE, PROFILE_PAGE } from "./constants";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProfilePage from "./pages/ProfilePage";
import userStore from "./store/userStore";

export default function App($root) {
  router.addRoute(HOME_PAGE, () => {
    new HomePage($root);
  });
  router.addRoute(LOGIN_PAGE, () => {
    new LoginPage($root);
  });
  router.addRoute(PROFILE_PAGE, () => {
    new ProfilePage($root);
  });
  router.addNotFoundRoute(() => {
    new NotFoundPage($root);
  });

  router.push(router.currentPath());
}

customEventListener();
