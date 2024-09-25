import { HomePage, LoginPage } from '../pages';

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
];

export default routes;
