import { createRouter } from '../lib';
import { setRouter } from './RouterContext';

const createRouterContext = (routes) => {
  const router = createRouter(routes);

  setRouter(router);
  return router;
};

export { createRouterContext };
