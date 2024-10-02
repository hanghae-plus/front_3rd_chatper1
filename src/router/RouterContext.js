const RouterContext = {
  router: null
};

const setRouter = (router) => {
  RouterContext.router = router;
};

const clearRouter = (router) => {
  RouterContext.router = null;
};

const useRouter = () => {
  if (!RouterContext.router) {
    throw new Error('Router 가 아직 set되지 않음!');
  }
  return RouterContext.router;
};

export { clearRouter, setRouter, useRouter };
