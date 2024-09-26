import Router from './base/Router';
import routes from './config/routes';

const $root = document.getElementById('root');
const $app = document.createElement('div');
$app.setAttribute('id', 'app');

$root.appendChild($app);

// routes.js에서 정의된 경로를 추가
routes.map((route) => {
	Router.addRoute(route.path, {
		render: () => {
			const $app = document.getElementById('app');
			new route.component($app);
		},
		title: route.title,
	});
});

Router.init();
