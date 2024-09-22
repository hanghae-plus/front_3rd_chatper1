import { Home } from './Page/Home';
import { Login } from './Page/Login';
import { Profile } from './Page/Profile';
import { ErrorPage } from './Page/ErrorPage';

class Router {
  constructor() {
      this.routes = {};
      window.addEventListener('popstate', this.handlePopState.bind(this));
  }

  addRoute(path, handler) {
      this.routes[path] = handler;
  }

  navigateTo(path) {
      history.pushState(null, '', path);
      this.handleRoute(path);
  }

  handlePopState() {
      this.handleRoute(window.location.pathname);
  }

  handleRoute(path) {
      const handler = this.routes[path];
      if (handler) {
          handler();
      } else {
          console.log('404 Not Found');
      }
  }
}

const router = new Router();

router.addRoute('/', () => Home());
router.addRoute('/profile', () => Profile());
router.addRoute('/login', () => Login());
router.addRoute('/not-found', () => ErrorPage());

console.log(router)

// document.querySelector('nav').addEventListener('click', (e) => {
//   if (e.target.tagName === 'A') {
//       e.preventDefault();
//       router.navigateTo(e.target.pathname);
//   }
// });

// router()

console.log()