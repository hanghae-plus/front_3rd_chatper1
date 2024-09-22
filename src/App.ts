import ErrorPage from './pages/error';
import HomePage from './pages/home';
import LoginPage from './pages/login';
import ProfilePage from './pages/profile';
import Router from './Router';

export default class App {
  #target: Element;
  #router: Router;

  constructor(target: Element) {
    this.#target = target;
    this.#router = new Router({
      '/': new HomePage(this.#target),
      '/login': new LoginPage(this.#target),
      '/profile': new ProfilePage(this.#target),
      '/404': new ErrorPage(this.#target),
    });
  }
}
