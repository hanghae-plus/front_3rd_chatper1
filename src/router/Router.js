export default class Router {
	//초기화 메서드
	constructor(root) {
		this.routes = {};
		this.root = root;
		this.handlePopState = this.handlePopState.bind(this);
		this.handleClickEvent = this.handleClickEvent.bind(this);
	}
	//경로와 해당 경로의 핸들러를 저장합니다. 핸들러는 경로에 맞는 HTML 콘텐츠를 렌더링
	addRoute(path, component) {
		this.routes[path] = component;
	}

	handlePopState() {
		this.render(window.location.pathname);
	}

	handleClickEvent(e) {
		let target = e.target;

		if (target && target.tagName === 'A') {
			const href = target.getAttribute('href');
			if (href.startsWith('/') && !href.startsWith('//')) {
				e.preventDefault();
				this.navigateTo(href);
			}
		}
	}

	navigateTo(path) {
		window.history.pushState({}, '', path);
		this.render(path);
	}

	//현재 경로에 맞는 페이지 렌더링
	render(path) {
		const route = this.routes[path];

		if (route) {
			route(this.root);
		} else {
			this.navigateTo('/404');
		}
	}

	// 라우터 시작 시 현재 경로를 처리하고, 링크 클릭 이벤트를 처리
	start() {
		window.addEventListener('popstate', this.handlePopState);
		document.addEventListener('click', (event) => this.handleClickEvent(event));

		this.render(window.location.pathname);
	}
}
