export default class Router {
	constructor(loginManager) {
		this.routes = {};
		this.currentPath = window.location.pathname;
		this.loginManager = loginManager;
	}
	init() {
		window.addEventListener('popstate', (e) => this.handleRouting());
		document.body.addEventListener('click', (e) => {
			if (e.target.matches('[data-link]')) {
				e.preventDefault();
				this.navigate(e.target.href);
			}
		});
		this.handleRouting();
	}
	navigate(path) {
		if (this.getCleanPath(path) !== this.currentPath) {
			history.pushState(null, null, path);
			this.currentPath = path;
			this.handleRouting();
		}
	}

	refresh() {
		const path = this.getCleanPath(window.location.pathname);
		history.replaceState(null, null, path);
		this.currentPath = path;
		this.handleRouting();
	}

	handleRouting() {
		const path = this.getCleanPath(window.location.pathname);

		const route = this.routes[path];
		if (route) {
			route.render();
		} else {
			this.navigate('/404');
		}
	}

	getCleanPath(pathname) {
		return pathname.split('.').slice(0, -1).filter(Boolean).join('.') || pathname;
	}

	add(path, component) {
		this.routes[path] = component;
	}
}
