import ROUTES from '../config/routes';
class RouterClass {
	constructor() {
		this.routes = {};
	}

	addRoute(path, route) {
		this.routes[path] = route;
	}

	init($app) {
		this.routesInit($app);

		// 현재 페이지 로드
		this.loadRoute(window.location.pathname);

		// popstate 이벤트 등록
		window.addEventListener('popstate', () => {
			this.loadRoute(window.location.pathname);
		});
	}

	routesInit($element) {
		ROUTES.forEach((route) => {
			const { path, title } = route;

			this.addRoute(path, {
				render: () => {
					new route.component($element);
				},
				title: title,
			});
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
