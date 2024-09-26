import createErrorBoundary from '@/components/ErrorBoundary';

class Router {
	constructor(errorBoundary) {
		this.routes = {};
		this.routeGuards = {};
		this.errorBoundary = errorBoundary;
	}

	createRoutes(newRoutes) {
		this.routes = newRoutes;
		this.route();

		this.bindEvents();
	}

	setRouteGuard(path, guardFunction, redirectPath) {
		this.routeGuards[path] = { guard: guardFunction, redirect: redirectPath };
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
		if (pathname && window.location.hash !== `#${pathname}`) {
			this.errorBoundary.resetError();

			window.history.pushState({}, '', pathname);
			this.route();
		}
	}

	routeGuardRedirect(redirect) {
		if (redirect) {
			window.history.pushState({}, '', redirect);
			this.route();
		}
	}

	route() {
		const pathname = window.location.pathname;

		if (this.routeGuards[pathname]) {
			const { guard, redirect } = this.routeGuards[pathname];

			if (!guard()) {
				this.routeGuardRedirect(redirect);
				return;
			}
		}

		const route = this.routes[pathname] || this.routes['/*'];

		if (route) {
			document.getElementById('root').innerHTML = route.template();

			route.bindEvents();
		}
	}
}

let routerInstance;

export default function getRouterInstance() {
	if (!routerInstance) {
		const errorBoundary = createErrorBoundary();

		routerInstance = new Router(errorBoundary);
	}

	return routerInstance;
}
