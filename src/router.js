const Router = () => {
  const routes = {};

  function addRoute(path, handler) {
    routes[path] = handler;
  }

  function navigateTo(path) {
    history.pushState(null, '', path);
    handleRoute(path);
  }

  function handlePopState() {
    handleRoute(window.location.pathname);
  }

  function handleRoute(path) {
    const handler = routes[path];
    if (handler) {
      handler();
    } else {
      routes['/404']();
    }
  }

  window.addEventListener('popstate', handlePopState);

  return {
    addRoute,
    navigateTo,
  };
};

export default Router;
