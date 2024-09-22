import HomePage from './pages/Home.js';
// import Post from './pages/Post.js';
import Error from './pages/Error.js';
import Router from './router/Router.js';

const routes = ($element) => {
  const router = new Router();
  router.addRoute('', () => new HomePage({ $element, router }));
  router.addRoute('/', () => new HomePage({ $element, router }));
  router.addRoute('/profile', () => new Post({ $element, router }));
  router.addRoute('/login', () => new Post({ $element, router }));
  router.addRoute(null, () => new Error({ $element }));
  router.loadInitialRoute();
  return router;
};

export default routes;
