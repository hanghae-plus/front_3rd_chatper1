import routes from './routes';

const Router = (function () {
	const routes = {};
	function addRoute(path, route) {
		routes[path] = route;
	}

	function init() {
		const curPath = window.location.pathname;
		loadRoute(curPath);
	}

	function loadRoute(path) {
		const { render } = routes[path];
		render();
	}

	function navigateTo() {}

	return {
		addRoute,
		init,
		loadRoute,
		navigateTo,
	};
})();

routes.map((route) => {
	Router.addRoute(route.path, {
		render: () => {
			const $app = document.getElementById('app');
			new route.component($app);
		},
		title: route.title,
	});
});

export default Router;
