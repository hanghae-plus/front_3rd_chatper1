import Login from "../src/pages/login.js";
import Profile from "../src/pages/profile.js";
import Error from "../src/pages/error.js";
import Home from "../src/pages/home.js";

/** 페이지 모음 */
const routes = [
  { path: "/", view: () => Home },
  { path: "/login", view: () => Login },
  { path: "/profile", view: () => Profile },
  { path: "/error", view: () => Error },
];

//
document.addEventListener("DOMContentLoaded", async () => {
  const pathName = window.location.pathname;
  const currentRoute = routes.find((val) => val.path == pathName);

  if (currentRoute && pathName == currentRoute.path) {
    //원하는 페이지로 이동
    const page = new (currentRoute.view())();
    document.querySelector("#root").innerHTML = await page.getHtml();
  } else {
    //해당 주소 페이지 없음
    const errorRoute = routes.find((val) => val.path == "/error");
    const errorPage = new (errorRoute.view())();
    document.querySelector("#root").innerHTML = await errorPage.getHtml();
  }
});
