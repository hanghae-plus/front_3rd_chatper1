import ErrorPage from './pages/error';
import HomePage from './pages/home';
import LoginPage from './pages/login';
import ProfilePage from './pages/profile';
import Router from './router';

const root = document.querySelector('#root');
const ROUTES = {
	'/': HomePage,
	'/main': HomePage,
	'/login': LoginPage,
	'/profile': ProfilePage,
	'/error': ErrorPage,
	'/404': ErrorPage,
};
// const router = () => {
// 	const path = window.location.pathname;
// 	console.log(path);
// 	switch (path) {
// 		case '/':
// 		case '/main.html':
// 			root.innerHTML = HomePage();
// 			break;
// 		case '/login.html':
// 			root.innerHTML = LoginPage();
// 			break;
// 		case '/profile.html':
// 			root.innerHTML = ProfilePage();
// 			break;
// 		default:
// 			root.innerHTML = ErrorPage();
// 			break;
// 	}
// };

const router = new Router();

Object.entries(ROUTES).reduce((acc, cur) => {
	router.add(cur[0], cur[1]);
}, []);

console.log(router.routes);

router.init();
