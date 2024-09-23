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
};

loadHTML('/');

// HTML을 로드하는 함수
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

  // 페이지가 로드될 때 링크의 클래스를 초기화
  updateActiveLink(path);
}

// 네비게이션 클릭 이벤트 처리
document.addEventListener('click', (e) => {
  // 클릭된 요소가 'a[data-link]'인지 확인
  if (e.target.matches('a[data-link]')) {
    e.preventDefault();
    const url = e.target.getAttribute('href');
    navigateTo(url);
    console.log(url);
  }

});

// URL 변경 및 페이지 로드
function navigateTo(url) {
  history.pushState(null, null, url);  // URL 변경
  loadHTML(url);  // 해당 URL에 맞는 페이지 로드
}

// 링크에 active 클래스를 추가하는 함수
function updateActiveLink(currentPath) {
  const links = document.querySelectorAll('a[data-link]');

  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath) {
      // 현재 경로와 일치하는 링크에 active 클래스 추가
      link.classList.remove('text-gray-600');
      link.classList.add('text-blue-600');
    } else {
      // 다른 링크에는 기본 클래스 적용
      link.classList.remove('text-blue-600');
      link.classList.add('text-gray-600');
    }
  });
}

// 브라우저의 뒤로/앞으로 가기 버튼 동작 처리
window.addEventListener('popstate', () => {
  loadHTML(location.pathname);  // 현재 URL에 맞는 콘텐츠 로드
});
