import ErrorPage from './components/ErrorPage';
import LoginPage from './components/LoginPage';
import MainPage from './components/MainPage';
import ProfilePage from './components/ProfilePage';
import userStore from './stores/userStore';

const isLogin = () => userStore.isLogin;

const needLoginPages = ['/profile'];
const loginUserInaccessiblePages = ['/login'];

const routes = [
  {
    title: '홈',
    path: '/',
    renderer: ($target) => new MainPage($target),
  },
  {
    title: '로그인',
    path: '/login',
    renderer: ($target) => new LoginPage($target),
  },
  {
    title: '프로필',
    path: '/profile',
    renderer: ($target) => new ProfilePage($target),
  },
  {
    title: '오류',
    path: '/404',
    renderer: ($target) => new ErrorPage($target),
  },
];

class Router {
  constructor({ routes }) {
    this.routes = routes;

    /**
     * 현재 라우트에서 활성화된 컴포넌트
     */
    this.currentRoute = null;

    this.$target = null;
  }

  init($target) {
    this.$target = $target;

    window.addEventListener('popstate', () => {
      this.handleRoute(window.location.pathname);
    });

    this.handleRoute(window.location.pathname);
  }

  push(path) {
    history.pushState(null, '', path);
    this.handleRoute(path);
  }

  replace(path) {
    history.replaceState(null, '', path);
    this.handleRoute(path);
  }

  handleRoute(path) {
    const route = this.#findRoute(path);

    if (!route) {
      return this.replace('/404');
      // return
    }

    if (isLogin() && loginUserInaccessiblePages.includes(path)) {
      return this.replace('/');
    }

    if (!isLogin() && needLoginPages.includes(path)) {
      return this.replace('/login');
    }

    this.#render(route);
  }

  #findRoute(path) {
    return this.routes.find((r) => r.path === path) ?? null;
  }

  #render(route) {
    if (this.currentRoute?.component) {
      this.currentRoute.component.destroy();
    }

    const component = route.renderer(this.$target);
    document.title = `항해플러스 - ${route.title}`;

    this.currentRoute = {
      ...route,
      component,
    };
  }
}

const router = new Router({
  routes,
});

export default router;
