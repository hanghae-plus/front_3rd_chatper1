import Footer from '../component/footer';
import Header from '../component/header';
import { Router, useRouter } from '../module/route';
import { isEqual } from '../module/util';
import { RouteType } from '../type';

export default class App {
  router: Router;
  currentRoute: RouteType;
  root: HTMLElement;
  header: Header;
  footer: Footer;
  constructor(router: Router) {
    this.router = router;
    this.root = document.querySelector('#root')!;
  }

  init() {
    this.root.innerHTML = this.template();
    this.header = new Header('header');
    this.footer = new Footer('footer');
  }

  render(route: RouteType) {
    if (isEqual(this.currentRoute, route)) return;
    if (route.layout) {
      this.header.render();
      this.footer.render();
    } else {
      this.header.destroy();
      this.footer.destroy();
    }
    this.currentRoute = route;
    route.element.render();
  }

  template() {
    return `
    <div class="bg-gray-100 min-h-screen flex justify-center">
      <div class="max-w-md w-full">
          <div id="header"></div>
            <main id="main" ></main>
          <div id="footer" ></div>
      </div>
    </div>
        `;
  }
}
