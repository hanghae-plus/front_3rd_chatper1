import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

const render = (page) => {
  document.querySelector('#root').innerHTML = page();
};

const userState = {
  userInfo: null,
  isLogged: false,
};

const router = () => {
  const routes = {};

  const addRoute = (path, handler) => {
    routes[path] = handler;
  };

  const navigateTo = (path) => {
    history.pushState({}, '', path);
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
      render(NotFound);
    }
  };

  window.addEventListener('popstate', handlePopState);

  return { routes, addRoute, navigateTo, handleRoute };
};

const { addRoute, navigateTo, handleRoute } = router();

addRoute('/', () => render(Home));

addRoute('/login', () => {
  if (!userState.isLogged) {
    render(Login);
    return;
  }
  navigateTo('/');
});

addRoute('/profile', () => {
  if (userState.isLogged) {
    render(Profile);
    return;
  }
  navigateTo('/login');
});

addRoute('/404', () => render(NotFound));

const logIn = (userName, email, bio) => {
  localStorage.setItem(
    'user',
    JSON.stringify({ username: userName, email, bio })
  );
  loadedUser();
  navigateTo('/');
};

const logOut = () => {
  localStorage.removeItem('user');
  loadedUser();
};

const loadedUser = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user) {
    userState.userInfo = user;
    userState.isLogged = true;
  } else {
    userState.userInfo = null;
    userState.isLogged = false;
  }
};

const addListeners = () => {
  document.querySelector('#root')?.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
      e.preventDefault(); // A 태그 클릭 시에만 preventDefault 호출
      if (e.target.id === 'logout') {
        logOut();
        return;
      }
      const url = new URL(e.target.href);
      if (url.pathname.startsWith('/')) {
        navigateTo(url.pathname);
      }
    }
  });

  document.querySelector('#root')?.addEventListener('submit', (e) => {
    e.preventDefault();
    if (e.target.id === 'login-form') {
      const userName = document.getElementById('username').value;
      logIn(userName, '', '');
    }
  });
};

const init = () => {
  const initialPath = window.location.pathname;
  handleRoute(initialPath);
  addListeners();
  loadedUser();
};

init();
