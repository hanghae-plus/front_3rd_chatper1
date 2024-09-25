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
		const { component } = routes[path];
		document.querySelector('#root').outerHTML = component();
	}

	return {
		addRoute,
		init,
		loadRoute,
		navigateTo,
	};
})();

routes.map((route) => {
	Router.addRoute(route.path, {
		component: route.component,
		title: route.title,
	});
});

export default Router;
