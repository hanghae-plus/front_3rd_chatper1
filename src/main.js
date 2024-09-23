import Header from './components/Header';
import Home from './components/Home';
import Profile from './components/Profile';
import Footer from './components/Footer';
import Login from './components/Login';
import ErrorPage from './components/ErrorPage';


const root = document.querySelector("#root");

// 라우팅 관리 객체
const routes = {
  "/": { component: Home, isOnlyComponent: false },
  "/login": { component: Login, isOnlyComponent: true },
  "/profile": { component: Profile, isOnlyComponent: false },
  "/error": { component: ErrorPage, isOnlyComponent: true },
}

loadHTML('/');

function loadHTML(path) {
  const { component, isOnlyComponent } = routes[path] || routes['/error'];
  
  root.innerHTML = `
    <div class="bg-gray-100 min-h-screen flex justify-center">
      <div class="max-w-md w-full">
        ${!isOnlyComponent ? Header : ""}
        ${component}
        ${!isOnlyComponent ? Footer : ""}
      </div>
    </div>
  `;
}

document.querySelector('nav').addEventListener('click', (e) => {
  if (e.target.matches('a[data-link]')) {
    e.preventDefault();
    const url = e.target.href.replace(window.location.origin, "");
    navigateTo(url);
    console.log(url);
  }
})


function navigateTo(url) {
  history.pushState(null, null, url);
  loadHTML(url);
}

window.addEventListener('popstate', () => {
  loadHTML(location.pathname);  // URL에 맞는 콘텐츠를 로드
});