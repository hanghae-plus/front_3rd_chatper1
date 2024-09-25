import { useRouter } from './module/route';
import HomePage from './page/homePage';
import LoginPage from './page/loginPage';
import ProfilePage from './page/profilePage';
import NotFoundPage from './page/notFoundPage';
import store from './module/store';
import { isEqual } from './module/util';
store.add('pathname', { pathname: location.pathname });
store.add('userData', { username: '', email: '', bio: '' });

const userInfo = localStorage.getItem('user');
const isUpdate = !isEqual(JSON.parse(userInfo), store.getState('userData'));
if (userInfo && isUpdate) {
  store.setState('userData', JSON.parse(userInfo));
}
if (!userInfo) store.reset('userData');

const router = useRouter();
const routeList = {
  '/': {
    path: '/',
    element: new HomePage('main'),
    layout: true,
  },
  '/login': {
    path: '/login',
    element: new LoginPage('main'),
    layout: false,
  },
  '/profile': {
    path: '/profile',
    element: new ProfilePage('main'),
    layout: true,
  },
  '/404': {
    path: '/404',
    element: new NotFoundPage('main'),
    layout: false,
  },
};
router.init(routeList);
router.push(location.pathname);

window.addEventListener('error', (error) => {
  // 에러 UI 표시
  const root = document.getElementById('root');
  const errorComponent = document.createElement('div');

  root.innerHTML = '';
  errorComponent.innerHTML = `<p style="color:red;">오류 발생! ${error.message}</p>`;
  root.appendChild(errorComponent);
  return true;
});
