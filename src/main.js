import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Profile from './components/Profile';
import Login from './components/Login';
import ErrorPage from './components/ErrorPage';
import user from './User';

const root = document.querySelector("#root");

const routes = {
  "/": {component: Home.template(), isOnlyComponent: false},
  "/profile": {component: Profile.template(), isOnlyComponent: false, requiresLogin: true},
  "/login": {component: Login.template(), isOnlyComponent: true},
  "/error": {component: ErrorPage.template(), isOnlyComponent: true},
}

const renderHTML = (path) => {
  const { component, isOnlyComponent } = routes[path] || routes['/error'];
  const headerComponent = !isOnlyComponent ? Header.template(user.isLoggedIn(), path) : "";
  const footerComponent = !isOnlyComponent ? Footer.template() : "";

  root.innerHTML = `
    <div class="bg-gray-100 min-h-screen flex justify-center">
      <div class="max-w-md w-full">
        ${headerComponent}
        ${component}
        ${footerComponent}
      </div>
    </div>
  `

  if (path === '/login') {
    Login.bindEvents(renderHTML)
  }

  if (path === '/profile') {
    Profile.bindEvents(renderHTML);
  }

  Header.bindEvents(renderHTML);
}

// URL 변경 및 페이지 로드
const navigateTo = (url) => {
  history.pushState(null, null, url);  // URL 변경
  renderHTML(url);  // 해당 URL에 맞는 페이지 로드
}

document.addEventListener("DOMContentLoaded", () => {
  const initialPath = window.location.pathname;
  renderHTML(initialPath);

  document.addEventListener('click', (e) => {
    if (e.target.matches('a[data-link]')) {
      e.preventDefault();
      const url = e.target.getAttribute('href');
      navigateTo(url);
    }
  })
});

// 브라우저의 뒤로/앞으로 가기 버튼 동작 처리
window.addEventListener('popstate', () => {
  renderHTML(location.pathname);  // 현재 URL에 맞는 콘텐츠 로드
});