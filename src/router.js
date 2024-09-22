export default class Router {
  constructor() {
    this.routes = {};
    window.addEventListener('popstate', this.handlePopState.bind(this));
  }

  init() {
    this.addRoute('/', () => this.loadHTML('../templates/main.html'));
    this.addRoute('/profile', () => this.loadHTML('../templates/profile.html'));
    this.addRoute('/login', () => this.loadHTML('../templates/login.html'));

    this.handleRoute(window.location.pathname);

    this.initMutationObserver();
  }

  addNavEvent() {
    const nav = document.querySelector('nav');
    if (nav) {
      nav.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
          e.preventDefault();
          this.navigateTo(e.target.pathname.replace(/^\.\//, '/').replace(/\.html$/, ''));
        }
      });
    } else {
      console.error('Nav element not found');
    }
  }

  initMutationObserver() {
    const targetNode = document.getElementById('root');
    if (targetNode) {
      const config = { childList: true, subtree: true };
      const callback = (mutationsList) => {
        for (const mutation of mutationsList) {
          if (mutation.type === 'childList') {
            console.log('root element innerHTML changed');

            this.addNavEvent();
          }
        }
      };
      const observer = new MutationObserver(callback);
      observer.observe(targetNode, config);
    } else {
      console.error('Root element not found for MutationObserver');
    }
  }

  async loadHTML(url) {
    const rootId = 'root';

    try {
      // HTML 파일을 fetch로 불러옴
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // HTML 파일의 내용을 텍스트로 변환
      const html = await response.text();
      // HTML 문자열을 파싱하여 DOM 객체로 변환
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      // 특정 ID를 가진 요소를 추출
      const element = doc.getElementById(rootId);
      // 특정 요소의 innerHTML로 삽입
      document.getElementById(rootId).innerHTML = element.innerHTML;

      return;
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
    }
  }

  addRoute(path, handler) {
    this.routes[path] = handler;
  }

  navigateTo(path) {
    const guardPath = this.routeGuard(path);
    history.pushState(null, '', guardPath);
    this.handleRoute(guardPath);
  }

  handlePopState() {
    this.handleRoute(window.location.pathname);
  }

  handleRoute(path) {
    const handler = this.routes[path];
    if (handler) {
      handler();
    } else {
      console.log('404 Not Found');
    }
  }

  routeGuard(path) {
    if (path === '/' || path === '/main') {
      return '/';
    }

    if (path === '/profile' && !localStorage.getItem('user')) {
      return '/login';
    }

    if (path === '/login' && localStorage.getItem('user')) {
      return '/';
    }
  }
}
