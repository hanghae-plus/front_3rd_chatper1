import Home from './pages/Home.js';
import Login from './pages/Login.js';
import Profile from './pages/Profile.js';
import NotFound from './pages/NotFound.js';

export default class Router {
  static routes = {
    '/': Home,
    '/login': Login,
    '/profile': Profile,
    '/error': NotFound,
  };

  static loadPage(path) {
    const Page = this.routes[path] || this.routes['/error'];
    const page = new Page();
    document.getElementById('root').innerHTML = page.render();

    if (page.init) {
      page.init();
    }
  }

  static navigate(path) {
    window.history.pushState({}, '', path);
    this.loadPage(path);
  }

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
