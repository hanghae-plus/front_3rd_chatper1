import Footer from "./components/Footer";
import Header from "./components/Header";
import { Home } from "./page/HomePage";
import { Login, loginEvent, loginInit } from "./page/LoginPage";
import NotFound, { routingHome } from "./page/NotFoundPage";
import { Profile, profileUpdate } from "./page/ProfilePage";

export function router() {
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

function renderHome() {
  const root = document.getElementById("root");
  root.innerHTML = `${Header()}${Home()}${Footer()}`;
}

function renderLogin() {
  // loginInit();
  document.getElementById("root").innerHTML = Login();
  loginEvent();
}

function renderProfile() {
  document.getElementById("root").innerHTML = Header();
  document.getElementById("root").innerHTML += Profile();
  document.getElementById("root").innerHTML += Footer();

  profileUpdate();
}

function renderNotFound() {
  document.title = "404 Not Found";
  document.getElementById("root").innerHTML = NotFound();
  routingHome();
}

// 브라우저에서 뒤로 가기 등을 처리하기 위한 이벤트 리스너
window.addEventListener("popstate", () => router());

document.addEventListener("DOMContentLoaded", () => {
  // 초기 로드 시 라우팅 함수 실행
  router();
  console.log("load");

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
