import Footer from "./components/Footer";
import Header from "./components/Header";
import { Home } from "./page/HomePage";
import { Login, loginEvent } from "./page/LoginPage";
import NotFound from "./page/NotFoundPage";
import { Profile, profileUpdate } from "./page/ProfilePage";

document.addEventListener("DOMContentLoaded", () => {
  function router() {
    const path = window.location.pathname;

    switch (path) {
      case "/":
        renderHome();
        break;
      case "/login":
        renderLogin();
        break;
      case "/profile":
        renderProfile();
        break;
      default:
        renderNotFound();
        break;
    }
  }

  // 각 페이지를 렌더링하는 함수들
  function renderHome() {
    document.getElementById("app").innerHTML = Header();
    document.getElementById("app").innerHTML += Home();
    document.getElementById("app").innerHTML += Footer();
  }

  function renderLogin() {
    document.getElementById("app").innerHTML = Login();
    loginEvent();
  }

  function renderProfile() {
    document.getElementById("app").innerHTML = Header();
    document.getElementById("app").innerHTML += Profile();
    document.getElementById("app").innerHTML += Footer();

    profileUpdate();
  }

  function renderNotFound() {
    document.title = "404 Not Found";
    document.getElementById("app").innerHTML = NotFound();
  }

  // 브라우저에서 뒤로 가기 등을 처리하기 위한 이벤트 리스너
  window.addEventListener("popstate", router);

  // 초기 로드 시 라우팅 함수 실행
  router();

  // 네비게이션 링크 클릭 시 페이지 전환
  document.querySelectorAll("nav a").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const href = e.target.getAttribute("href");
      history.pushState({}, "", href);
      router();
    });
  });
});
