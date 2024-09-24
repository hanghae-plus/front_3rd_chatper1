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
    const path = this.path();

    if (!this.#routes.hasOwnProperty(path)) {
      const page = this.#routes['notFound'];
      document.getElementById('root').innerHTML = page.render();
      page.mount();
      return;
    }

    if (localStorage.getItem('user') === null && path !== '/login') {
      const page = this.#routes['/login'];
      document.getElementById('root').innerHTML = page.render();
      page.mount();
    } else {
      const page = this.#routes[path];
      document.getElementById('root').innerHTML = page.render();
      page.mount();
    }
  }

  navigateTo(url) {
    history.pushState({}, '', url);
    this.router();
  }
}

const router = new Router();
export default router;

