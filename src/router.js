import UserInfo from './userInfo';

export class Router {
  static routes = [];

  static initialize(routes) {
    this.routes = routes;

    this.handleRoute(location.pathname);

    this.setupEventListeners();
  }

  static setupEventListeners() {
    window.addEventListener('popstate', () => {
      this.handleRoute(location.pathname);
    });

    document.addEventListener('click', (event) => {
      const target = event.target.closest('a');

      if (!target) {
        return;
      }
      if (target.href) {
        event.preventDefault();
        this.handleLinkClick(target.pathname);
      }

      if (target.id === 'logout') {
        UserInfo.clear();
        this.redirect('/login');
      }
    });
  }

  static handleLinkClick(newPath) {
    if (newPath !== location.pathname) {
      history.pushState(null, '', newPath);
    }
    this.handleRoute(newPath);
  }

  static handleRoute(path) {
    if (path === '/profile' && !UserInfo.get('username')) {
      this.redirect('/login');
      return;
    }

    if (path === '/login' && !!UserInfo.get('username')) {
      this.redirect('/');
      return;
    }

    const route =
      this.routes.find((route) => route.path === path) ||
      this.routes.find((route) => route.path === '/404');

    const view = new route.view();
    view.render();
  }

  static redirect(newPath) {
    history.pushState(null, '', newPath);
    this.handleRoute(newPath);
  }
}
