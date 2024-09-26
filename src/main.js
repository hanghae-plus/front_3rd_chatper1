import router from './router';

const init = () => {
  router.init();

  window.addEventListener('error', (e) => {
    const errorElement = document.createElement('div');
    errorElement.innerHTML = `
      <p>오류 발생!</p>
      <p>${e.message}</p>
    `.trim();
    document.body.appendChild(errorElement);
  });
  // window.onerror = function (msg, url, lineNo, columnNo, error) {

  //   // https://stackoverflow.com/questions/10825992/prevent-javascript-from-stopping-when-error-is-encountered
  //   // return false 일 경우 uncaught 에러로 인해 앱이 망가짐
  //   // or addEventListener('error', (e) => { e.preventDefault })
  //   return true;
  // };

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
