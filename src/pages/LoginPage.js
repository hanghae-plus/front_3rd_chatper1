import { root, NAVIGATION_PAGE } from '../main';
import { saveInLocalStorage, LOCAL_STORAGE_KEYS } from '../utils/StorageUtils';
import { loginStore } from '../main';
import Router from '../Router';

class LoginPage {
  render() {
    root.innerHTML = this.template();

    this.setEvents();
  }

  setEvents() {
    if (loginStore.getState().isLoggedIn) {
      new Router().navigateTo(NAVIGATION_PAGE.home.path);
      return;
    }

    const pwdElement = document.querySelector('input[type="password"]');
    pwdElement.addEventListener('input', () => {
      // TODO: 비밀번호 유효성 확인
    });

    const loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', () => {
      // TODO: 로그인 실패시 메세지 표시

      const username = document.getElementById('username');
      const user = {
        username: username.value,
        email: '',
        bio: '',
      };

      saveInLocalStorage(LOCAL_STORAGE_KEYS.USER, user);
      loginStore.setState({ isLoggedIn: true, username: user.username, email: user.email, bio: user.bio });

      new Router().navigateTo(NAVIGATION_PAGE.home.path);
    });
  }

  template() {
    return `
      <main class="bg-gray-100 flex items-center justify-center min-h-screen">
        <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 class="text-2xl font-bold text-center text-blue-600 mb-8">항해플러스</h1>
          <form id="login-form">
            <div class="mb-4">
              <input id="username" type="text" placeholder="이메일 또는 전화번호" class="w-full p-2 border rounded">
            </div>
            <div class="mb-6">
              <input type="password" placeholder="비밀번호" class="w-full p-2 border rounded">
            </div>
            <button type="submit" class="w-full bg-blue-600 text-white p-2 rounded font-bold">로그인</button>
          </form>
          <div class="mt-4 text-center">
            <a href="#" class="text-blue-600 text-sm">비밀번호를 잊으셨나요?</a>
          </div>
          <hr class="my-6">
          <div class="text-center">
            <button class="bg-green-500 text-white px-4 py-2 rounded font-bold">새 계정 만들기</button>
          </div>
        </div>
      </main>
`;
  }
}

export default new LoginPage();
