import ErrorPage from "./pages/error";
import Home from "./pages/home";
import Login from "./pages/login";
import ProfilePage from "./pages/profile";
import Router from "./router";
import { createStore } from "./store";

const $root = document.querySelector("#root");
const store = createStore();
const router = new Router(store);
router.addRoute("/", () => new Home($root, store));
router.addRoute("/login", () => new Login($root, store));
router.addRoute("/profile", () => new ProfilePage($root, store));
router.addRoute("/404", () => new ErrorPage($root, store));

router.push(window.location.pathname);
