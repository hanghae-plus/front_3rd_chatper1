import Router from '@/router/Router.js';
import HomePage from '@/page/HomePage.js';
import LoginPage from '@/page/LoginPage.js';
import ProfilePage from '@/page/ProfilePage.js';
import LogoutPage from '@/page/LogOut.js';
import NotFoundPage from '@/page/NotFoundPage.js';
import { UserStateInstance } from '@/store/Storage.js';

const $root = document.querySelector('#root');
export const ROUTER = new Router($root, UserStateInstance);

// 라우트 등록
ROUTER.addRoute('/', HomePage);
ROUTER.addRoute('/login', LoginPage);
ROUTER.addRoute('/profile', ProfilePage);
ROUTER.addRoute('/logout', LogoutPage);
ROUTER.addRoute('/404', NotFoundPage);

ROUTER.start();
