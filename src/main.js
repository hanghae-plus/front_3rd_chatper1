import { ErrorBoundary } from './components/ErrorBoundary';
import { HomeComponent } from './pages/HomePage';
import { LoginComponent } from './pages/LoginPage';
import { NotFoundComponent } from './pages/NotFoundPage';
import { ProfileComponent } from './pages/ProfilePage';

class Router {
	constructor() {
		this.routes = {};
		this.routeGuards = {};
	}

	createRoutes(routes) {
		this.routes = routes;
		this.route();
		this.bindEvents();
	}

	setRouteGuard(path, guardFunction) {
		this.routeGuards[path] = guardFunction;
	}

	bindEvents() {
		window.addEventListener('popstate', () => this.route());
		window.addEventListener('hashchange', () => this.route());
		document.addEventListener('click', (event) => this.handleClickEvent(event));
	}

	handleClickEvent(event) {
		if (event.target.tagName === 'A' && event.target.getAttribute('href').startsWith('/')) {
			event.preventDefault();
			event.stopPropagation();

			this.navigate(event.target.getAttribute('href'));
		}
	}

	navigate(pathname) {
		console.log(pathname, 'pathname!!!!!!!!!!!!!!!!!!!!!');
		if (pathname && window.location.hash !== `#${pathname}`) {
			// errorBoundary.resetError();

			window.history.pushState({}, '', pathname);
			this.route();
		}
	}

	route() {
		const pathname = window.location.pathname;
		const route = this.routes[pathname] || this.routes['/*'];

		route.render();
		route.bindEvents();
	}
}

const router = new Router();

const errorBoundary = new ErrorBoundary('root');

const home = new HomeComponent(router, errorBoundary);
const login = new LoginComponent(router, errorBoundary);
const profile = new ProfileComponent(router, errorBoundary);
const notFound = new NotFoundComponent(router, errorBoundary);

router.createRoutes({
	'/': home,
	'/login': login,
	'/profile': profile,
	'/*': notFound,
});

router.setRouteGuard('/profile', () => {
	const user = JSON.parse(localStorage.getItem('user'));

	return !!user;
});

router.setRouteGuard('/login', () => {
	const user = JSON.parse(localStorage.getItem('user'));
	return !user;
});
