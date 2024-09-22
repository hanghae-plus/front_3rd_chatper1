import { useUserStore } from '/src/store/useUserStore.js';

export class Router {
  constructor(rootElement) {
    this.routes = {};
    this.rootElement = rootElement;
  }

  addRoute(path, handler, options = {}) {
    this.routes[path] = { handler, options };
  }

  navigateTo(path) {
    history.pushState(null, '', path);
    this.handleRoute();
  }

  handleRoute() {
    const path = window.location.pathname;
    const route = this.routes[path] || this.routes['/404'];

    if (!route) {
      console.error(`No handler found for path: ${path}`);
      this.rootElement.innerHTML = '<h1>404 - Page Not Found</h1>';
      return;
    }

    const { handler, options } = route;

    if (options.requiresAuth && !useUserStore.isLoggedIn()) {
      this.navigateTo('/login');
      return;
    }

    if (options.guestOnly && useUserStore.isLoggedIn()) {
      this.navigateTo('/');
      return;
    }

    try {
      const content = typeof handler === 'function' ? handler() : handler;
      this.rootElement.innerHTML = content;
    } catch (error) {
      console.error(`Error rendering route ${path}:`, error);
      this.rootElement.innerHTML = '<h1>An error occurred</h1>';
    }
  }

  init() {
    window.addEventListener('popstate', () => this.handleRoute());
    this.handleRoute();
  }

  updateCurrentRoute() {
    this.handleRoute();
  }
}