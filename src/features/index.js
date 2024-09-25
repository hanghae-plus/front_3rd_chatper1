import { Layout } from '../components/layout';
import {
  HomePage,
  ProfilePage,
  LoginPage,
  NotFoundPage,
} from '../components/ui';
import { Component } from '../utils';
import { ROUTES } from '../constants';

// Header 컴포넌트
export class Header extends Component {
  template() {
    const { router, isLoggedIn } = this.props;
    const tabs = router.filterRoutesByAuth(isLoggedIn);
    return `
    <header class="bg-blue-600 text-white p-4 sticky top-0">
      <h1 class="text-2xl font-bold">항해플러스</h1>
    </header>

    <nav class="bg-white shadow-md p-2 sticky top-14">
      <ul class="flex justify-around">
        ${tabs
          .map(
            (tab) =>
              `<li id="${tab?.id}"><a href="${tab?.path}" class="${
                router.isLocated(tab?.path)
                  ? 'text-blue-600 font-bold'
                  : 'text-gray-600'
              }">${tab?.name}</a></li>`
          )
          .join('')}
      </ul>
    </nav>
  `;
  }

  setEvent() {
    this.addEvent('click', '#logout', (event) => {
      event.preventDefault();
      this.logout();
    });
  }

  // 로그아웃
  logout() {
    const { storage, setUserState } = this.props;
    storage.removeItem('user');
    setUserState();
  }
}

// Footer 컴포넌트
export class Footer extends Component {
  template() {
    return `
      <footer class="bg-gray-200 p-4 text-center">
        <p>&copy; 2024 항해플러스. All rights reserved.</p>
      </footer>
    `;
  }
}

// Home 컴포넌트
export class HomeComponent extends Component {
  template() {
    const { router, storage, isLoggedIn, setUserState } = this.props;
    return Layout({
      header: () =>
        new Header(this.$target, {
          router,
          storage,
          isLoggedIn,
          setUserState,
        }),
      main: HomePage({ isLoggedIn }),
      footer: () => new Footer(this.$target),
    });
  }
}

// 프로필 컴포넌트
export class ProfileComponent extends Component {
  mounted() {
    const { router, isLoggedIn } = this.props;
    if (!isLoggedIn) router.navigateTo(ROUTES.LOGIN.path);
  }

  template() {
    const { router, storage, userInfo, isLoggedIn, setUserState } = this.props;
    return Layout({
      header: () =>
        new Header(this.$target, {
          router,
          storage,
          isLoggedIn,
          setUserState,
        }),
      main: ProfilePage({ router, userInfo }),
      footer: () => new Footer(this.$target),
    });
  }

  setEvent() {
    this.addEvent('submit', '#profile-form', (event) => {
      event.preventDefault();
      const profileForm = new FormData(event.target);
      const username = profileForm.get('username');
      const email = profileForm.get('email');
      const bio = profileForm.get('bio');
      this.updateProfile({ username, email, bio });
    });
  }

  // 프로필 업데이트
  updateProfile({ username = '', email = '', bio = '' }) {
    if (!username) throw new Error('사용자 이름을 입력하세요.');
    const { storage, setUserState, userApiService } = this.props;
    const userInfo = userApiService.patchUser(
      storage.getItem('user')?.username,
      {
        username,
        email,
        bio,
      }
    );
    if (!userInfo) throw new Error('프로필 업데이트 중 오류가 발생하였습니다.');
    storage.setItem('user', userInfo);
    setUserState(userInfo);
    alert('프로필이 업데이트되었습니다.');
  }
}

// 404에러 컴포넌트
export class NotFoundComponent extends Component {
  template() {
    return NotFoundPage();
  }
}

// Login 컴포넌트
export class LoginComponent extends Component {
  mounted() {
    const { router, isLoggedIn } = this.props;
    if (isLoggedIn) router.navigateTo(ROUTES.HOME.path);
  }

  template() {
    return Layout({
      main: LoginPage(),
    });
  }

  setEvent() {
    this.addEvent('submit', '#login-form', (event) => {
      event.preventDefault();
      const loginForm = new FormData(event.target);
      const username = loginForm.get('username');
      const password = loginForm.get('password');
      this.loginUser({ username, password });
    });
  }

  // 로그인
  loginUser({ username = '' }) {
    if (!username) throw new Error('사용자 이름을 입력하세요.');
    const { userApiService } = this.props;
    const userInfo = userApiService.getUser(username);
    if (!userInfo) throw new Error('사용자가 존재하지 않습니다.');
    const { storage, setUserState } = this.props;
    storage.setItem('user', userInfo);
    setUserState(userInfo);
  }
}
