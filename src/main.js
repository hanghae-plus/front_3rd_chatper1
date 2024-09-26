import Router from './Router';
import HomePage from '../src/pages/HomePage';
import LoginPage from '../src/pages/LoginPage';
import ProfilePage from '../src/pages/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';
import Store from './Store';

export const root = document.getElementById('root');

const user = localStorage.getItem('user');
export const loginStore = new Store({
  isLoggedIn: user ? true : false,
  username: user?.username,
  email: user?.email,
  bio: user?.bio,
});

export const NAVIGATION_PAGE = {
  home: { navTitle: '홈', path: '/', component: HomePage },
  profile: { navTitle: '프로필', path: '/profile', component: ProfilePage },
  login: { navTitle: '로그인', path: '/login', component: LoginPage },
  notFound: { path: '/404', component: NotFoundPage },
};

export const router = new Router();

window.addEventListener('error', (event) => {
  root.innerHTML = `<p id="errorBoundary" class="text-red-600 mt-1 text-sm">오류 발생! ${event.message}</p>`;
});
