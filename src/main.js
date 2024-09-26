import Router from "./Router";
import { Home, Login, NotFound, Profile } from "./pages";

const router = new Router();

router.addRoute("/", Home);
router.addRoute("/login", Login);
router.addRoute("/profile", Profile);
router.addRoute("/404", NotFound);

router.navigateTo(window.location.pathname);

window.addEventListener("error", (error) => {
  document.querySelector(
    "#root"
  ).innerHTML = `<h1>오류 발생!</h1> ${error.message}`;
});
