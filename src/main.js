import HomePage from '@/pages/HomePage';
import LoginPage from '@/pages/LoginPage';
import ProfilePage from '@/pages/ProfilePage';
import NotFoundPage from '@/pages/NotFoundPage';

import localStorageInstace from '@/store/storage';

import getRouterInstance from '@/router';

import { ROUTE } from '@/constants';

const router = getRouterInstance();

const home = HomePage();
const login = LoginPage();
const profile = ProfilePage();
const notFound = NotFoundPage();

router.setRouteGuard(ROUTE.PROFILE, () => !!localStorageInstace.get('user'), ROUTE.LOGIN);
router.setRouteGuard(ROUTE.LOGIN, () => !localStorageInstace.get('user'), ROUTE.HOME);

router.createRoutes({
  '/': home,
  '/login': login,
  '/profile': profile,
  '/*': notFound,
});
