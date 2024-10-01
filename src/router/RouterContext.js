const RouterContext = {
  router: null
};

const setRouter = (router) => {
  RouterContext.router = router;
};

const useRouter = () => RouterContext.router;

export { setRouter, useRouter };
