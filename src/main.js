import { Component, LocalStorage, Router } from './utils';
import {
  HomeComponent,
  ProfileComponent,
  LoginComponent,
  NotFoundComponent,
} from './features';
import { ERRORS, NOTFOUND, ROUTES } from './constants';
import { UserApiService } from './services';

// 라우트 - 컴포넌트 매핑
const routes = [
  {
    path: ROUTES.HOME.path,
    handler: (...props) => new HomeComponent(...props),
  },
  {
    path: ROUTES.PROFILE.path,
    handler: (...props) => new ProfileComponent(...props),
  },
  {
    path: ROUTES.LOGIN.path,
    handler: (...props) => new LoginComponent(...props),
  }
];

// 라우트 - 에러 매핑
const errors = [
  {
    path: ERRORS[NOTFOUND?.path],
    handler: (...props) => new NotFoundComponent(...props),
  },
];

/**
 * App 컴포넌트
 */
class App extends Component {
  setup() {
    const router = new Router();
    const storage = new LocalStorage(localStorage);
    const user = storage.getItem('user') || null;
    const userApiService = UserApiService();

    router.addAuths(['HOME'], ['PROFILE', 'LOGOUT'], ['LOGIN']);

    this.state = {
      router,
      storage,
      userInfo: user,
      isLoggedIn: !!user,
      userApiService,
    };
  }

  mounted() {
    const { router, storage, userInfo, isLoggedIn, userApiService } =
      this.state;

    routes.forEach(({ path, handler }) => {
      router.addRoute(path, () => {
        handler(this.$target, {
          router,
          storage,
          userInfo,
          isLoggedIn,
          setUserState: (user) => this.setUserState(user),
          userApiService,
        });
      });
    });

    errors.forEach(({ path, handler }) => {
      router.setError(path, () => {
        handler(this.$target, { router });
      });
    });

    const currentPath = router.getCurrentPath();
    router.handleRoute(currentPath);
  }

  // 사용자 상태 변경
  setUserState(userInfo = null) {
    this.setState({ userInfo : userInfo, isLoggedIn: !!userInfo });
  }
}

new App(document.getElementById('root'));
