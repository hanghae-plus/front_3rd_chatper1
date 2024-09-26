import { root, NAVIGATION_PAGE } from './main';

class Router {
  constructor() {
    if (Router.instance) {
      return Router.instance;
    }

    Router.instance = this;

    this.setEvents();
    this.navigateTo(window.location.pathname); // 현재 페이지 처리
  }

  setEvents() {
    // 앞으로 가기, 뒤로 가기 클릭시 이동
    window.addEventListener('popstate', () => {
      this.handleRoute(window.location.pathname);
    });

    root.addEventListener('click', (event) => {
      if (event.target.tagName === 'A') {
        // a 태그 클릭 시 이동
        event.preventDefault();
        this.navigateTo(event.target.getAttribute('href'));
      }
    });
  }

  navigateTo(path) {
    history.pushState(null, '', path);
    this.handleRoute(path);
  }

  handleRoute(path) {
    const route = Object.values(NAVIGATION_PAGE).find((route) => route.path === path) || NAVIGATION_PAGE.notFound;

    route.component.render();
  }
}

export default Router;
