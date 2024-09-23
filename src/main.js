import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

const render = (page) => {
  document.querySelector('#root').innerHTML = page;
};

const router = () => {
  const routes = {};

  const addRoute = (path, handler) => {
    routes[path] = handler;
  };

  const navigateTo = (path) => {
    history.pushState(null, '', path);
    handleRoute(path);
  };

  const handlePopState = () => {
    handleRoute(window.location.pathname);
  };

  const handleRoute = (path) => {
    const handler = routes[path];
    if (handler) {
      handler();
    } else {
      console.log('404 NotFound');
    }
  };

  window.addEventListener('popstate', handlePopState);

  return { routes, addRoute, navigateTo, handleRoute };
};

const { addRoute, navigateTo, handleRoute } = router();

addRoute('/', () => {
  render(Home());
});

addRoute('/login', () => {
  render(Login());
});

addRoute('/profile', () => {
  render(Profile());
});

addRoute('/404', () => {
  render(NotFound());
});

// 링크 클릭 이벤트 리스너를 한 번만 추가
const addLinkListeners = () => {
  document.querySelector('nav')?.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
      e.preventDefault();
      const url = new URL(e.target.href);
      if (url.pathname.startsWith('/')) {
        navigateTo(url.pathname);
      }
    }
  });
};

const init = () => {
  const initialPath = window.location.pathname;
  handleRoute(initialPath);
  addLinkListeners();
};

init();
