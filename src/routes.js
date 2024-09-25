import HomePage from "./pages/HomePage.js";
import Router from "./router/Router.js";
import ProfilePage from "./pages/ProfilePage.js";
import LoginPage from "./pages/LoginPage.js";
import ErrorPage from "./pages/ErrorPage.js";

const routes = ($target, $contents) => {
    const router = new Router();
    router.addRoute('', () => new HomePage($contents, {router}));
    router.addRoute('/', () => new HomePage($contents, {router}));
    router.addRoute('/profile', () => new ProfilePage($contents, {router}));
    router.addRoute('/login', () => new LoginPage($target, {router}));
    router.addRoute('/error', () => new ErrorPage($target));
    router.navigateTo(window.location.pathname);
    return router
};

export default routes;