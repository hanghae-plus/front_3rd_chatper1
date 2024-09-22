export default class Router {
  constructor() {
    this.routes = [];
    this.data = {};

    window.addEventListener('popstate', () => this.loadInitialRoute());
  }

  addRoute(path, renderTemplate) {
    this.routes.push({ path, renderTemplate });
  }

  getData() {
    return this.data;
  }

  _getCurrentURL() {
    const path = window.location.pathname;
    return path;
  }

  _parseQueryParameters() {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    for (let param of params) {
      this.data[param[0]] = param[1];
    }
  }

  _matchUrlToRoute(urlSegs) {
    try {
      const matchedRoute = this.routes.find((route) => {
        const routePathSegments = route.path.split('/').filter(Boolean);
        const currentPathSegments = urlSegs.filter(Boolean);

        if (routePathSegments.length !== currentPathSegments.length) {
          return false;
        }

        return routePathSegments.every((routePathSegment, index) => {
          return (
            routePathSegment.startsWith(':') ||
            routePathSegment === currentPathSegments[index]
          );
        });
      });
      return matchedRoute;
    } catch {
      return false;
    }
  }

  loadInitialRoute() {
    this._parseQueryParameters();
    const pathnameSplit = this._getCurrentURL().split('/');
    const pathSegs = pathnameSplit.length > 1 ? pathnameSplit.slice(1) : '';
    this._loadRoute(...pathSegs);
  }

  _loadRoute(...urlSegs) {
    const matchedRoute = this._matchUrlToRoute(urlSegs);
    if (!matchedRoute) {
      const routeWithNullPath = this.routes.find(
        (route) => route.path === null
      );
      routeWithNullPath.renderTemplate();
    } else {
      matchedRoute.renderTemplate();
    }
  }

  navigateTo(path) {
    const pathnameSplit = this._getCurrentURL();
    if (path !== pathnameSplit) {
      window.history.pushState(null, '', path);
      const popStateEvent = new PopStateEvent('popstate', { state: null });
      dispatchEvent(popStateEvent);
    } else {
      console.log('no render');
    }
  }
}
