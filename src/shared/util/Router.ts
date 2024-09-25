import { BaseComponent } from '../ui/BaseComponent';

type Path = string | '/404';
type Routes = {
  [key in Path]: () => BaseComponent;
};

class Router {
  #routes: Routes = {};

  init(routes: Routes) {
    if (!routes['/404']) {
      throw new Error("'/404' 경로가 필요합니다.");
    }

    this.#routes = routes;

    this.#handlePopState();
    window.addEventListener('popstate', this.#handlePopState.bind(this));
    this.#setupLinkNavigation();
  }

  navigateTo(path: Path) {
    history.pushState(null, '', path);
    this.#handleRoute(path);
  }

  #handlePopState() {
    this.#handleRoute(window.location.pathname);
  }

  #handleRoute(path: Path) {
    const renderPage = this.#routes[path] ?? this.#routes['/404'];
    renderPage();
  }

  #setupLinkNavigation() {
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A') {
        e.preventDefault();
        const target = e.target as HTMLAnchorElement;
        router.navigateTo(target.pathname);
      }
    });
  }
}

export const router = new Router();
