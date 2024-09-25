import router from './router';

const init = () => {
  router.init();

  document.addEventListener('click', (e) => {
    if (e.target.closest('a.link')) {
      e.preventDefault();

      const url = new URL(e.target.href);
      if (url.pathname !== window.location.pathname) {
        router.push(url.pathname);
      }
    }
  });
};

init();
