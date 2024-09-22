import { Page } from './types';

type Path = string | '/404';
type Routes = {
  [key: Path]: Page;
};

export default class Router {
  #routes: Routes;

  constructor(routes: Routes) {
    if (!routes['/404']) {
      throw new Error("'/404' 경로가 필요합니다.");
    }

    this.#routes = routes;

    this.#handlePopState();
    window.addEventListener('popstate', this.#handlePopState.bind(this));
  }

  navigateTo(path: Path) {
    history.pushState(null, '', path);
    this.#handleRoute(path);
  }

  #handlePopState() {
    this.#handleRoute(window.location.pathname);
  }

  #handleRoute(path: Path) {
    const page = this.#routes[path] ?? this.#routes['/404'];
    page.render();
  }
}
