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

const routes = {
  '/': () => render(() => Home({ isLogged: userState.isLogged })),
  '/login': () => {
    if (!userState.isLogged) {
      render(Login);
      return;
    }
    navigateTo('/');
  },
  '/profile': () => {
    if (userState.isLogged) {
      render(() => Profile(userState.userInfo));
      return;
    }
    navigateTo('/login');
  },
  '/404': () => render(NotFound),
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

for (const key in routes) {
  addRoute(key, routes[key]);
}

const logIn = (username) => {
  const isValidUsername = /^[a-zA-Z]+$/.test(username);

  if (isValidUsername) {
    updateUserInfo(username, '', '');
    navigateTo('/');
    return;
  }
  document.getElementById('error-msg').innerHTML =
    '오류 발생! 영어로만 입력해주세요.';
};

const logOut = () => {
  localStorage.removeItem('user');
  loadedUser();
  navigateTo('/login');
};

const updateUserInfo = (username, email, bio) => {
  localStorage.setItem(
    'user',
    JSON.stringify({ ...userState.userInfo, username, email, bio })
  );
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
      e.preventDefault();
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
      const username = document.getElementById('username').value;
      logIn(username);
    }
    if (e.target.id === 'profile-form') {
      const username = document.getElementById('username').value;
      const email = document.getElementById('email').value;
      const bio = document.getElementById('bio').value;
      updateUserInfo(username, email, bio);
    }
  });
};

const init = () => {
  loadedUser();
  addListeners();
  handleRoute(window.location.pathname);
};

init();
