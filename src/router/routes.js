import { HomePage, LoginPage, ProfilePage, NotFoundPage } from '../pages';

const routes = [
	{
		path: '/login',
		title: '로그인',
		component: LoginPage,
	},
	{
		path: '/',
		title: '홈',
		component: HomePage,
	},
	{
		path: '/profile',
		title: '프로필',
		component: ProfilePage,
	},
	{
		path: '*',
		title: '404',
		component: NotFoundPage,
	},
];

export default routes;
