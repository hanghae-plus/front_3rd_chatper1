export function redirectRoute(path) {
  const isLoggedIn = !!localStorage.getItem('user');
  if (path === '/profile' && !isLoggedIn) return '/login';
  if (path === '/login' && isLoggedIn) return '/';
  return path;
}

export function route(path = window.location.pathname) {
  const protectedPath = redirectRoute(path);
  
  window.history.pushState({}, '', protectedPath);

  if (protectedPath === '/' || protectedPath === '/main') {
    renderHome();
  } else if (protectedPath === '/login') {
    renderLogin();
  } else if (protectedPath === '/profile') {
    if (isLoggedIn()) {
      renderProfile();
    } else {
      renderLogin();
    }
  } else if (protectedPath === '/404') {
    renderNotFound();
  } else {
    window.history.pushState({}, '', '/404');
    renderNotFound();
  }
}

export function setupRouting() {
  window.addEventListener('popstate', () => route());

  document.addEventListener('click', (event) => {
    if (event.target.tagName === 'A') {
      const href = event.target.getAttribute('href');
      if (href && href.startsWith('/')) {
        event.preventDefault();
        window.history.pushState({}, '', href);
        route(href);
      }
    }
  });
}
