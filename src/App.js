import Component from './base/Component';

import Router from './base/Router';
import routes from './config/routes';

class App extends Component {
	constructor(element) {
		super(element);
	}

	mounted() {
		// 정의된 경로를 Routes에 추가
		routes.map((route) => {
			Router.addRoute(route.path, {
				render: () => {
					new route.component(this.$target);
				},
				title: route.title,
			});
		});

		Router.init();
	}
}

export default App;
