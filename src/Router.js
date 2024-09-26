import Home from './pages/Home.js';
import Login from './pages/Login.js';
import Profile from './pages/Profile.js';
import NotFound from './pages/NotFound.js';

export default class Router {
  // static 필드로 routes를 설정
  static routes = {
    '/': Home,
    '/login': Login,
    '/profile': Profile,
    '/error': NotFound,
  };

  // static 메서드로 페이지 로드 처리
  static loadPage(path) {
    const Page = this.routes[path] || this.routes['/error'];
    const page = new Page();
    document.getElementById('root').innerHTML = page.render();

    if (page.init) {
      page.init(); // 각 페이지의 init 함수 호출
    }
  }

  // static 메서드로 경로 변경 처리
  static navigate(path) {
    window.history.pushState({}, '', path);
    this.loadPage(path);
  }

  // static 메서드로 라우터 초기화
  static initRouter() {
    document.addEventListener('click', (e) => {
      if (!e.target.matches('a')) return;

      e.preventDefault();
      const path = e.target.getAttribute('href');
      this.navigate(path);
    });

    window.addEventListener('popstate', () => {
      this.loadPage(window.location.pathname);
    });

    this.loadPage(window.location.pathname);
  }
}
