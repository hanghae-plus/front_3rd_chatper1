import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';
import ErrorPage from './pages/ErrorPage';

const posts = [
  {
    name: '홍길동',
    content: '오늘 날씨가 정말 좋네요. 다들 좋은 하루 보내세요!',
    date: '5분 전',
  },
  {
    name: '김철수',
    content: '새로운 프로젝트를 시작했어요. 열심히 코딩 중입니다!',
    date: '15분 전',
  },
  {
    name: '이영희',
    content: '오늘 점심 메뉴 추천 받습니다. 뭐가 좋을까요?',
    date: '30분 전',
  },
  {
    name: '박민수',
    content: '주말에 등산 가실 분 계신가요? 함께 가요!',
    date: '1시간 전',
  },
  {
    name: '정수연',
    content: '새로 나온 영화 재미있대요. 같이 보러 갈 사람?',
    date: '2시간 전',
  },
];

const routes = {
  '/': () => render(() => HomePage({ isLogged: userState.isLogged, posts })),
  '/login': () => {
    if (!userState.isLogged) {
      render(LoginPage);
      return;
    }
    navigateTo('/');
  },
  '/profile': () => {
    if (userState.isLogged) {
      render(() => ProfilePage(userState.userInfo));
      return;
    }
    navigateTo('/login');
  },
  '/404': () => render(NotFoundPage),
};

const createUserState = () => {
  const userState = {
    userInfo: null,
    isLogged: false,
  };

  const updateUserInfo = ({ username, email, bio }) => {
    localStorage.setItem('user', JSON.stringify({ username, email, bio }));
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

  const removeUser = () => {
    localStorage.removeItem('user');
    loadedUser();
  };

  loadedUser();
  return { userState, updateUserInfo, removeUser };
};

const router = () => {
  const routes = {};

  const addRoute = (path, handler) => {
    routes[path] = handler;
  };

  const navigateTo = (path) => {
    history.pushState({}, '', path);
    window.dispatchEvent(new Event('popstate'));
  };

  const handlePopState = () => {
    handleRoute(window.location.pathname);
  };

  const handleRoute = (path) => {
    const handler = routes[path];
    if (handler) {
      handler();
    } else {
      render(NotFoundPage);
    }
  };

  return { routes, addRoute, navigateTo, handleRoute, handlePopState };
};

const { addRoute, navigateTo, handlePopState } = router();
const { userState, updateUserInfo, removeUser } = createUserState();

for (const key in routes) {
  addRoute(key, routes[key]);
}

const render = (page) => {
  document.querySelector('#root').innerHTML = page();
};

const logIn = (username) => {
  const isValidUsername = /^[a-zA-Z]+$/.test(username);

  if (isValidUsername) {
    updateUserInfo({ username, email: '', bio: '' });
    navigateTo('/');
    return;
  }
  document.getElementById('error-msg').innerHTML =
    '오류 발생! 영어로만 입력해주세요.';
};

const logOut = () => {
  removeUser();
  navigateTo('/login');
};

const handleError = (e) => {
  e.preventDefault();

  render(() => ErrorPage({ message: e.message }));
};

const handleClick = (e) => {
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

  if (e.target.id === 'goback') {
    navigateTo(window.location.pathname);
  }
};

const handleSubmit = (e) => {
  e.preventDefault();
  if (e.target.id === 'login-form') {
    const username = document.getElementById('username').value;
    logIn(username);
  }
  if (e.target.id === 'profile-form') {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const bio = document.getElementById('bio').value;
    updateUserInfo({ username, email, bio });
    alert('수정되었습니다.');
  }
};

const addListeners = () => {
  document.querySelector('#root').addEventListener('click', handleClick);
  document.querySelector('#root').addEventListener('submit', handleSubmit);
  window.addEventListener('popstate', handlePopState);
  window.addEventListener('error', handleError);
  window.addEventListener('load', handlePopState);
};

const init = () => {
  addListeners();
};

init();
