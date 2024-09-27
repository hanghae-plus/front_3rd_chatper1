import HomePage from '../pages/home.js';
import LoginPage from '../pages/login.js';
import ProfilePage from '../pages/profile.js';
import ErrorPage from '../pages/error.js';
import Authorizer from './authorizer.js';

class Router {
  static #instance;
  #routes = {
    '/': new HomePage(),
    '/login': new LoginPage(),
    '/profile': new ProfilePage(),
    'notFound': new ErrorPage()
  };

  #authorizer = null;
  #lastPage = null;

  constructor() {
    if (Router.#instance) {
      return Router.#instance;
    }
    Router.#instance = this;
    this.#authorizer = new Authorizer();
  }

  path() {
    return window.location.pathname;
  }

  router() {
    this.#lastPage?.dehydrate();
    const path = this.path();

    if (!this.#routes.hasOwnProperty(path)) {
      const page = this.#routes['notFound'];
      page.render();
      page.hydrate();
      this.#lastPage = page;
      return;
    }

    let page;

    if (!this.#authorizer.isLogin && path === '/profile') {
      history.pushState({}, '', '/login');
      page = this.#routes['/login'];

    } else if (this.#authorizer.isLogin && path === '/login') {
      history.pushState({}, '', '/');
      page = this.#routes['/'];

    } else {
      page = this.#routes[path];
    }

    page.render();
    this.#lastPage = page;
  }

  navigateTo(url) {
    history.pushState({}, '', url);
    this.router();
  }
}

const router = new Router();
export default router;

