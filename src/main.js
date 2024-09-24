import Home from "./components/Home";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Error from "./components/Error";
import Header from "./components/Header";
import Footer from "./components/Footer";
import authStore from "./store/store";

const $root = document.querySelector("#root");

// routes 객체: 각 경로와 접근 권한, 헤더/푸터 노출 여부를 정의
const routes = {
  "/": { component: Home, isOnlyComponent: false },
  "/login": { component: Login, isOnlyComponent: true },
  "/profile": {
    component: Profile,
    isOnlyComponent: false,
    requiresLogin: true,
  },
  "/error": { component: Error, isOnlyComponent: true },
};

// 로그인 체크 함수
function checkAuth(path) {
  const { requiresLogin } = routes[path] || {};
  const isLogin = authStore.getIsLogin();

  if (requiresLogin && !isLogin) {
    console.log("미로그인 상태로 접근 시도: ", path);
    return "/login"; // 리다이렉트할 경로 반환
  } else if (isLogin && path === "/login") {
    console.log("로그인 상태로 로그인 페이지 진입: ", path);
    return "/"; // 리다이렉트할 경로 반환
  }

  return null; // 리다이렉트가 필요 없을 경우 null 반환
}

// Header 및 Footer 렌더링 함수
function renderHeaderAndFooter(path, isOnlyComponent) {
  const headerContent = !isOnlyComponent ? Header.template(path) : "";
  const footerContent = !isOnlyComponent ? Footer.template() : "";
  return `${headerContent}${footerContent}`;
}

// 이벤트 바인딩 함수
function bindEvents(component) {
  if (component.bindEvents) {
    component.bindEvents(renderPage);
  }

  // 헤더 이벤트 바인딩
  Header.bindEvents(renderPage);
}

// 페이지 렌더링 함수
function renderPage(path) {
  const route = routes[path] || routes["/error"];
  const { component, isOnlyComponent } = route;

  // 로그인 체크 및 리다이렉트 경로 확인
  const redirectTo = checkAuth(path);
  if (redirectTo) {
    renderPage(redirectTo); // 리다이렉트할 경로로 페이지 렌더링
    return;
  }

  // root 요소에 헤더, 컴포넌트, 푸터 노출 여부 확인 후 페이지 렌더링
  $root.innerHTML = `
    ${renderHeaderAndFooter(path, isOnlyComponent)}  
    ${component.template()} 
  `;

  // 이벤트 바인딩
  bindEvents(component);
}

// 헤더 네비게이션 클릭 이벤트 처리
function handleNavigation(event) {
  if (event.target.classList.contains("menu")) {
    event.preventDefault();
    const path = event.target.getAttribute("href");

    renderPage(path);
  }
}

// 페이지가 처음 로드될 때 초기 경로에 맞는 페이지 렌더링
document.addEventListener("DOMContentLoaded", () => {
  const initialPath = window.location.pathname;
  renderPage(initialPath);

  // 네비게이션 클릭 이벤트 바인딩
  document.addEventListener("click", handleNavigation);
});

// 브라우저의 뒤로가기/앞으로가기 버튼 클릭 시 페이지를 로드
window.addEventListener("popstate", () => {
  renderPage(window.location.pathname);
});
