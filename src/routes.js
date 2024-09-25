import HomePage from "./pages/Home.js";
import Profile from "./pages/Profile.js";
import Router from "./router/Router.js";
import Login from "./pages/Login.js";
import NotFound from "./pages/Notfound.js";
import Header from "./components/layouts/Header.js";
import Footer from "./components/layouts/Footer.js";

const routes = ($element) => {
  const router = new Router();

  const header = new Header({
    $element,
    router: router,
  });
  const footer = new Footer({
    $element,
    router: router,
  });

  router.addRoute(
    "/",
    () => new HomePage({ $element, router, header, footer })
  );

  router.addRoute(
    "/profile",
    () => new Profile({ $element, router, header, footer })
  );
  router.addRoute(
    "/login",
    () => new Login({ $element, router, header, footer })
  );
  router.addRoute("*", () => new NotFound({ $element, header, footer }));

  router.handleRoute(window.location.pathname);

  return router;
};

export default routes;
