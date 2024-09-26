import Footer from "./components/Footer";
import Header, { logout } from "./components/Header";
import ErrorPage from "./page/ErrorPage";
import { Home } from "./page/HomePage";
import { Login, loginEvent, userLoginCheck } from "./page/LoginPage";
import NotFound, { routingHome } from "./page/NotFoundPage";
import { Profile, profileUpdate } from "./page/ProfilePage";

export function router() {
  const path = window.location.pathname;
  console.log("path", path);

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

// 브라우저에서 뒤로 가기 등을 처리하기 위한 이벤트 리스너
window.addEventListener("popstate", () => router());

document.addEventListener("DOMContentLoaded", () => {
  router();
});

// 네비게이션 링크 클릭 시 페이지 전환
document.querySelectorAll("nav a").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault(); //새로고침 막기
    const href = e.target.getAttribute("href");
    history.pushState({}, "", href);
    router();
  });
});

window.addEventListener("error", (error) => {
  document.getElementById("root").innerHTML = ErrorPage();
});

function renderHome() {
  const root = document.getElementById("root");
  root.innerHTML = `${Header()}${Home()}${Footer()}`;
  logout();
}

function renderLogin() {
  document.getElementById("root").innerHTML = Login();
  loginEvent();
  userLoginCheck();
}

function renderProfile() {
  document.getElementById("root").innerHTML = Header();
  document.getElementById("root").innerHTML += Profile();
  document.getElementById("root").innerHTML += Footer();

  profileUpdate();
  logout();
}

function renderNotFound() {
  document.title = "404 Not Found";
  document.getElementById("root").innerHTML = NotFound();
  routingHome();
}
