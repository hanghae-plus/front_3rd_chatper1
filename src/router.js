import HomePage from '../pages/home.js';
import LoginPage from '../pages/login.js';
import ProfilePage from '../pages/profile.js';
import ErrorPage from '../pages/error.js';

class Router {
  #routes = {
    '/': new HomePage(),
    '/login': new LoginPage(),
    '/profile': new ProfilePage(),
    'notFound': new ErrorPage()
  };

  #lastPage = null;

  constructor() {
    if (Router.instance) {
      return Router.instance;
    }
    Router.instance = this;
  }

  path() {
    return window.location.pathname;
  }

  router() {
    this.#lastPage?.unmount();
    const path = this.path();

    if (!this.#routes.hasOwnProperty(path)) {
      const page = this.#routes['notFound'];
      page.render();
      page.mount();
      this.#lastPage = page;
      return;
    }

    let page;
    
    if (localStorage.getItem('user') === null && path === '/profile') {
      history.pushState({}, '', '/login');
      page = this.#routes['/login'];

    } else if (localStorage.getItem('user') !== null && path === '/login') {
      history.pushState({}, '', '/');
      page = this.#routes['/'];

    } else {
      page = this.#routes[path];
    }

    page.render();
    page.mount();
    this.#lastPage = page;
  }

  navigateTo(url) {
    history.pushState({}, '', url);
    this.router();
  }
}

const router = new Router();
export default router;

