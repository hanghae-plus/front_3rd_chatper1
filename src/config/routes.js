import { HomePage, LoginPage, ProfilePage, NotFoundPage } from '../pages';

export default [
	{
		path: '/login',
		title: '로그인',
		component: LoginPage,
	},
	{
		path: '/profile',
		title: '프로필',
		component: ProfilePage,
	},
	{
		path: '/',
		title: '홈',
		component: HomePage,
	},
	{
		path: '*',
		title: '404',
		component: NotFoundPage,
	},
];
