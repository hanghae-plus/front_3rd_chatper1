import { router } from "./router";
import handleHomePage from "./pages/HomePage";
import handleLoginPage from "./pages/LoginPage";
import handleNotFoundPage from "./pages/NotFoundPage";
import handleProfilePage from "./pages/ProfilePage";
import { dispatch, logout } from "./store";

export const Router = (function () {
  router.addRoute("/", handleHomePage);
  router.addRoute("/login", handleLoginPage);
  router.addRoute("/logout", () => {
    dispatch(logout());
    router.navigateTo("/");
  });
  router.addRoute("/profile", handleProfilePage);
  router.addRoute("/404", handleNotFoundPage);

  return router;
})();
