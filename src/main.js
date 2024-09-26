import HomePage from "./pages/HomePage.js";
import LoginPage from "./pages/LoginPage.js";
import ProfilePage from "./pages/ProfilePage.js";
import NotFoundPage from "./pages/NotFoundPage.js";
import session from "./utils/session.js";
import { createRouter } from './router.js';
import Storage from "./utils/storage.js";

Storage.removeData("user");
const root = document.querySelector("#root");
const loginInfo = session();
const router = createRouter();

const routes = {
  "/": () => new HomePage(loginInfo).render(),
  "/login": () => new LoginPage().render(),
  "/profile": () => new ProfilePage(loginInfo).render(),
  "/404": () => new NotFoundPage().render(),
  "/error": () => "오류 발생! 의도적인 오류입니다."
};

Object.keys(routes).forEach(path => router.addRoute(path, routes[path]));

router.render();
window.addEventListener("popstate", router.render);
window.addEventListener("error", () => router.navigate("/error"));
root.addEventListener("click", handleClick);
root.addEventListener("submit", handleSubmit);

function userInfo() {
  const username = document.querySelector("#username")?.value || "";
  const email = document.querySelector("#email")?.value || "";
  const bio = document.querySelector("#bio")?.value || "";
  return { username, email, bio };
}

function handleClick(event) {
  const { tagName, id, href } = event.target;

  if (tagName === "A") {
    event.preventDefault();

    if (id === "logout") {
      loginInfo.logoutState();
    }

    router.navigate(href);
  }
}

function handleSubmit(event) {
  event.preventDefault();

  const id = event.target.id;
  const user = userInfo();

  if (id === "login-form") {
    if (!user.username) {
      alert("이메일 또는 전화번호를 입력해주세요.");
      return;
    }
    loginInfo.loginState(user);
  } else {
    loginInfo.setUserInfo(user);
    alert("프로필이 업데이트 되었습니다.");
  }

  router.navigate("/profile");
}
