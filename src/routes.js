import HomePage from './pages/Home.js';
import Profile from './pages/Profile.js';
import Router from './router/Router.js';
import Login from './pages/Login.js';
import NotFound from './pages/Notfound.js';

const routes = ($element, header, footer) => {
  const router = new Router();

  router.addRoute('/', () => {
    new HomePage({ $element, router });
    header.show();
    footer.show();
  });
  router.addRoute('/profile', () => {
    new Profile({ $element, router });
    header.show();
    footer.show();
  });
  router.addRoute('/login', () => {
    header.hide();
    footer.hide();
    new Login({ $element, router });
  });
  router.addRoute('*', () => new NotFound({ $element }));

  router.handleRoute(window.location.pathname);

  return router;
};

export default routes;
