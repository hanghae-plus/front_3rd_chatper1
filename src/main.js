import { handleRoute } from './router';

const init = () => {
  window.addEventListener('popstate', () => {
    handleRoute(window.location.pathname);
  });

  handleRoute(window.location.pathname);
};

init();
