export default class Router {
	constructor(loginManager) {
		this.routes = {};
		this.currentPath = window.location.pathname;
		this.loginManager = loginManager;
	}

	init() {
		window.addEventListener("popstate", () => this.handleRouting());
		document.addEventListener("click", (event) => {
			console.log(event.target);
			if (event.target.matches("[data-link]")) {
				event.preventDefault();
				const newPath = this.getCleanPath(event.target.getAttribute("href"));
				console.log("newPath: ", newPath);
				console.log("this.currentPath: ", this.currentPath);
				this.navigate(newPath);
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

	handleRouting() {
		const path = this.getCleanPath(window.location.pathname);
		console.log("path", path);
		console.log("this.routes", this.routes);

		if (path === "/profile" && !this.loginManager.isLoggedIn()) {
			this.loginManager.redirectToLogin();
			return;
		}

		const route = this.routes[path] || this.routes["/404"];
		route ? route.render() : this.routes["/404"];
	}

	getCleanPath(pathname) {
		return pathname.split(".").slice(0, -1).filter(Boolean).join(".") || pathname;
	}

	add(path, component) {
		this.routes[path] = component;
		console.log(this.routes);
	}
}
