import HomePage from '@/pages/HomePage';
import LoginPage from '@/pages/LoginPage';
import ProfilePage from '@/pages/ProfilePage';
import NotFoundPage from '@/pages/NotFoundPage';

import localStorageInstace from '@/store/storage';

import getRouterInstance from '@/router';

const router = getRouterInstance();

const home = HomePage();
const login = LoginPage();
const profile = ProfilePage();
const notFound = NotFoundPage();

router.setRouteGuard('/profile', () => !!localStorageInstace.get('user'), '/login');
router.setRouteGuard('/login', () => !localStorageInstace.get('user'), '/');

router.createRoutes({
	'/': home,
	'/login': login,
	'/profile': profile,
	'/*': notFound,
});
