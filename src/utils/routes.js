import { getStorage } from './storage';

export const navigate = (path, data) => {
  history.pushState(data || null, null, path);
  dispatchEvent(new PopStateEvent('popstate', { state: data || null }));
};

export const createRouter = () => {
  const routes = {};

  const addRoute = (path, component, options) => {
    routes[path] = { component, isPrivate: options?.isPrivate };
  };

  const renderComponent = () => {
    const { component, isPrivate } =
      routes[window.location.pathname] || routes['404'];

    if (isPrivate && !getStorage('user')) {
      navigate('/login');
      return;
    }

    if (!!getStorage('user') && window.location.pathname === '/login') {
      navigate('/');
      return;
    }

    component();
  };

  const init = () => {
    window.addEventListener('DOMContentLoaded', renderComponent);
    window.addEventListener('popstate', renderComponent);
  };

  return { routes, addRoute, init };
};
