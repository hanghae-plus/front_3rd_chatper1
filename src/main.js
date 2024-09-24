import Home from '../components/Home';
import Profile, { bindProfileEvents } from '../components/Profile';
import Login, { bindEvents as bindLoginEvents } from '../components/Login';
import Error from '../components/Error';
import  Header from '../components/Header';
import { Nav, bindLogoutEvent } from '../components/Nav';
import Footer from '../components/Footer';

const $root = document.querySelector('#root');

// 라우트 정의
const routes = {
  '/': { component: Home, isOnlyComponent: false },
  '/login': { component: Login, isOnlyComponent: true },
  '/profile': { component: Profile, isOnlyComponent: false },
  '/error': { component: Error, isOnlyComponent: true },
};

// 경로에 따라 페이지 렌더링 함수
function renderPage(path) {
  const route = routes[path] || routes['/error'];
  const component = route.component; // component를 가져오기
  const isOnlyComponent = route.isOnlyComponent;

  // 프로필 페이지에 접근할 때 localStorage에 user가 없으면 로그인 페이지로 리다이렉트
  if (path === '/profile' && !localStorage.getItem('user')) {
    renderPage('/login');
    return;
  }

  //로그인 상태에서 로그인 페이지로 접근하면 메인 페이지로 리다이렉트
  if (path === '/login' && localStorage.getItem('user')) {
    renderPage('/');
    return; 
  }

  const componentInstance = component(); // 이제 component는 함수여야 합니다.

  // isOnlyComponent가 true일 경우 헤더와 푸터를 숨김
  const header = !isOnlyComponent ? Header() : '';
  const nav = !isOnlyComponent ? Nav(path, renderPage) : '';
  const footer = !isOnlyComponent ? Footer() : '';

  // 헤더, 네비게이션, 컴포넌트, 푸터 템플릿을 root 요소에 삽입하여 페이지 렌더링
  $root.innerHTML = `
    ${header}  
    ${nav}
    ${componentInstance} 
    ${footer}
  `;

  // 로그인 컴포넌트의 bindEvents 호출
  if (path === '/login') {
    bindLoginEvents(renderPage);
  }

  // 프로필 컴포넌트의 bindProfileEvents 호출
  if (path === '/profile') {
    bindProfileEvents(); // 여기에서 호출
  }

  // 헤더 네비게이션 이벤트 바인딩
  bindLogoutEvent(renderPage);
}


// 네비게이션 클릭 이벤트 처리 함수
function handleNavigation(event) {
  if (event.target.classList.contains('menu')) {
    event.preventDefault();
    const path = event.target.getAttribute('href');
    renderPage(path);

    // URL 업데이트
    window.history.pushState({}, '', path);
  }
}

// 초기 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', () => {
  const initialPath = window.location.pathname;
  renderPage(initialPath);

  // 네비게이션 클릭 이벤트 바인딩
  document.addEventListener('click', handleNavigation);
});

// 브라우저의 뒤로가기/앞으로가기 버튼 클릭 시 페이지를 로드하는 함수
window.addEventListener('popstate', () => {
  renderPage(window.location.pathname);
});
