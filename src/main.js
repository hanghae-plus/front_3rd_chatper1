import HomePage from "../src/pages/HomePage.js";
import LoginPage from "../src/pages/LoginPage.js";
import ProfilePage from "../src/pages/ProfilePage.js";
import NotFoundPage from "../src/pages/NotFoundPage.js";

/** 페이지 모음 */
const routes = [
  { path: "/", view: () => HomePage },
  { path: "/login", view: () => LoginPage },
  { path: "/profile", view: () => ProfilePage },
  { path: "/error", view: () => NotFoundPage },
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
    
    page.addEventListeners(); //페이지별 이벤트 리스너
  } else {
    //해당 주소 페이지 없음
    const errorRoute = routes.find((val) => val.path == "/error");
    const errorPage = new (errorRoute.view())();
    document.getElementById('root').innerHTML = errorPage.getHtml();
    errorPage.addEventListeners();
  }
});
