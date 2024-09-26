import HomePage from "./pages/HomePage.js";
import Router from "./router/Router.js";
import ProfilePage from "./pages/ProfilePage.js";
import LoginPage from "./pages/LoginPage.js";
import ErrorPage from "./pages/ErrorPage.js";

const routes = ($target, $contents) => {
    const router = new Router();
    router.addRoute('', () => new HomePage($contents, {router}));
    router.addRoute('/', () => new HomePage($contents, {router}));
    router.addRoute('/profile', () => new HomePage($contents, {router}));
    router.addRoute('/login', () => new LoginPage($contents, {router}));
    router.addRoute('/error', () => new ErrorPage($contents));
    router.navigateTo(window.location.pathname);
    return router
};

export default routes;