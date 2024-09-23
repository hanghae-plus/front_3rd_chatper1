import HomePage from "./pages/Home.js";
import Profile from "./pages/Profile.js";
import Router from "./router/Router.js";
import Login from "./pages/Login.js";
import NotFound from "./pages/Notfound.js";

const routes = ($element) => {
  const router = new Router();

  router.addRoute("/", () => new HomePage({ $element, router }));
  router.addRoute("/profile", () => new Profile({ $element, router }));
  router.addRoute("/login", () => new Login({ $element, router }));
  router.addRoute("*", () => new NotFound({ $element }));
  router.handleRoute(window.location.pathname);

  return router;
};

export default routes;
