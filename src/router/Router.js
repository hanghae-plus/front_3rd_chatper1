import { UserPreferences } from '../services/UserPreferences';

// Router 구현 (싱글톤 패턴 적용)
const Router = (function () {
  let instance;

  function createInstance() {
    return {
      routes: {},
      // 로그인 상태를 확인하기 위해 getter를 호출
      isLoggedIn: !!UserPreferences.preferences.isLoggedIn, // 여기서 실제 로컬 스토리지에서 데이터가 로드됨
      addRoute(path, handler) {
        this.routes[path] = handler;
      },

      navigateTo(path) {
        history.pushState(null, '', path);
        this.handleRoute(path);
      },

      handlePopState() {
        this.handleRoute(window.location.pathname);
      },

      handleRoute(path) {
        const loginStatusRedirects = {
          '/profile': '/login', // 비로그인 상태에서는 프로필 접근 시 로그인 페이지로 리다이렉트
          '/login': '/', // 로그인 상태에서 로그인 페이지 접근 시 메인 페이지로 리다이렉트
        };

        if (loginStatusRedirects[path]) {
          if (
            (path === '/profile' && !this.isLoggedIn) ||
            (path === '/login' && this.isLoggedIn)
          ) {
            this.navigateTo(loginStatusRedirects[path]);
            return;
          }
        }

        const handler = this.routes[path] || this.routes['/404'];
        handler();
      },

      setLoginStatus(status) {
        this.isLoggedIn = status;
      },

      handleLogin() {
        this.setLoginStatus(true);
      },

      handleLogout() {
        this.setLoginStatus(false);
      },

      init() {
        window.addEventListener('popstate', this.handlePopState.bind(this));
      },
    };
  }

  return {
    getInstance() {
      if (!instance) instance = createInstance();
      return instance;
    },
  };
})();

export default Router;
