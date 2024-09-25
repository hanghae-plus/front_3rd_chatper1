import Home from './pages/Home';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Error from './pages/Error';
import Header from './components/Header';
import Footer from './components/Footer';

const $root = document.getElementById('root');

const routes = {
  '/': { component: Home, defaultLayout: true, isLoggedIn: false },
  '/login': { component: Login, defaultLayout: false, isLoggedIn: false },
  '/profile': { component: Profile, defaultLayout: true, isLoggedIn: true },
  '/error': { component: Error, defaultLayout: false, isLoggedIn: false },
};

function renderPage(path) {
  const { component, defaultLayout, isLoggedIn } =
    routes[path] || routes['/error'];

  const user = !!localStorage.getItem('user');
  console.log('user', user);

  // 헤더와 푸터 컨텐츠 초기화
  let headerContent = '';
  let footerContent = '';

  // 비로그인 상태에서 프로필 페이지 접근 시 로그인 페이지로 리다이렉트
  if (!user && path === '/profile') {
    goTo('/login');
    return;
  }

  // 로그인된 상태에서 로그인 페이지 접근 시 홈으로 리다이렉트
  if (user && path === '/login') {
    goTo('/');
    return;
  }

  // defaultLayout에 따라 헤더, 푸터 설정
  if (defaultLayout) {
    headerContent = Header.render(path); // 인스턴스 메서드로 호출
    footerContent = Footer.render();
  }

  const componentContent = component.render(path); // 컴포넌트의 렌더링 결과를 변수에 저장

  $root.innerHTML = `
   ${headerContent}
   ${componentContent} 
   ${footerContent}
 `;

  Header.registerEvents(renderPage);

  if (component.registerEvents) {
    component.registerEvents(renderPage);
  }
}

// 경로 이동 함수
function goTo(path) {
  renderPage(path);
  history.pushState(null, '', path);
}

// 초기 렌더링
document.addEventListener('DOMContentLoaded', () => {
  const initialPath = window.location.pathname || '/';
  renderPage(initialPath);
});

// 링크 클릭 시 페이지 이동 처리
document.addEventListener('click', (event) => {
  if (event.target.matches('a')) {
    event.preventDefault();
    const path = event.target.getAttribute('href');
    goTo(path);
  }
});

// 브라우저의 뒤로가기/앞으로가기 버튼 클릭 시 페이지를 로드
window.addEventListener('popstate', () => {
  renderPage(window.location.pathname);
});

window.addEventListener('error', (error) => {
  document.querySelector('#root').innerHTML = `
    <main class="bg-gray-100 flex items-center justify-center min-h-screen">
      <div class="bg-white p-8 rounded-lg shadow-md w-full text-center" style="max-width: 480px">
        <h1 class="text-2xl font-bold text-blue-600 mb-4">오류 발생!</h1>
        <p class="text-xl text-gray-600 mb-8">의도적인 오류입니다.</p>
      </div>
    </main>
  `;
});
