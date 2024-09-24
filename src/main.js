import { handleRoute, navigateTo } from './router';

const init = () => {
  document.addEventListener('click', (e) => {
    if (e.target.closest('a.link')) {
      e.preventDefault();

      const url = new URL(e.target.href);
      if (url.pathname !== window.location.pathname) {
        navigateTo(url.pathname);
      }
    }
  });

  window.addEventListener('popstate', () => {
    handleRoute(window.location.pathname);
  });

  handleRoute(window.location.pathname);
};

init();
