import { createRouter } from '../lib';
import { clearRouter, setRouter } from './RouterContext';

const createRouterContext = (routes) => {
  const router = createRouter(routes);

  setRouter(router);
  return router;
};

// todo: clean up을 언제 해주지?
const cleanupRouter = () => {
  clearRouter();
};

export { cleanupRouter, createRouterContext };
