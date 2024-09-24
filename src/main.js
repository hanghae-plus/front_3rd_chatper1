import Home from './components/Home';
import Profile from './components/Profile';
import Login from './components/Login';
import Error from './components/Error';
import Header from './components/Header';
import Footer from './components/Footer';
const $root = document.getElementById('root');

const routes = {
  '/': { component: Home, defaultLayout: true },
  '/login': { component: Login, defaultLayout: false },
  '/profile': { component: Profile, defaultLayout: true },
  '/error': { component: Error, defaultLayout: false },
};

function renderPage(path) {
  const { component, defaultLayout } = routes[path] || routes['/error'];

  // 헤더와 푸터 컨텐츠 초기화
  let headerContent = '';
  let footerContent = '';

  // defaultLayout에 따라 헤더, 푸터 설정
  if (defaultLayout) {
    headerContent = Header.render(path); // 인스턴스 메서드로 호출
    footerContent = Footer.render();
  }
  // 컴포넌트의 render 메서드를 호출하여 내용을 렌더링
  const componentContent = component.render(path); // 컴포넌트의 렌더링 결과를 변수에 저장

  // 렌더링된 HTML을 root에 삽입
  $root.innerHTML = `
   ${headerContent}
   ${componentContent} 
   ${footerContent}
 `;

  // 헤더 이벤트 바인딩
  Header.registerEvents(renderPage);

  // 특정 컴포넌트의 이벤트 바인딩
  if (component.registerEvents) {
    component.registerEvents(renderPage);
  }
}

// 초기 렌더링
document.addEventListener('DOMContentLoaded', () => {
  const initialPath = window.location.pathname || '/'; // 현재 경로로 초기 경로 설정
  renderPage(initialPath); // renderPage 호출
});

// 링크 클릭 시 URL 변경 및 페이지 렌더링
document.addEventListener('click', (event) => {
  if (event.target.matches('a')) {
    event.preventDefault();
    const path = event.target.getAttribute('href');
    history.pushState(null, '', path); // URL 변경
    console.log('path', path);

    renderPage(path); // 페이지 렌더링
  }
});

// 브라우저의 뒤로가기/앞으로가기 버튼 클릭 시 페이지를 로드
window.addEventListener('popstate', () => {
  renderPage(window.location.pathname);
});
