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

window.addEventListener('load', function() {
  // popstate 이벤트 수동 발생
 window.dispatchEvent(new Event('popstate'));
});

// popstate 이벤트 리스너
window.addEventListener('popstate', function(event) {

  const pathName = window.location.pathname;
  const currentRoute = routes.find((val) => val.path == pathName);

  if (currentRoute && pathName == currentRoute.path) {
    //원하는 페이지로 이동
    const page = new (currentRoute.view())();
    document.getElementById('root').innerHTML = page.getHtml();
  } else {
    //해당 주소 페이지 없음
    const errorRoute = routes.find((val) => val.path == "/error");
    const errorPage = new (errorRoute.view())();
    document.getElementById('root').innerHTML = errorPage.getHtml();
  }
});
