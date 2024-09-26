class RouterClass {
	constructor() {
		this.routes = {};
	}

	addRoute(path, route) {
		this.routes[path] = route;
	}

	init() {
		this.loadRoute(window.location.pathname);

		window.addEventListener('popstate', () => {
			this.loadRoute(window.location.pathname);
		});
	}

	loadRoute(path) {
		const route = this.routes[path] || this.routes['*']; // 404 페이지 처리
		if (route && route.render) {
			route.render();
		} else {
			console.error('Route not found');
		}
	}

	navigateTo(url) {
		window.history.pushState({}, '', url);
		this.loadRoute(url);
	}
}

// Router 인스턴스 생성
const Router = new RouterClass();
export default Router;
