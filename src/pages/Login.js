import UserData from '../stores/UserData.js';
import Router from '../Router.js';

export default class LoginPage {
  init() {
    const isLogin = UserData.getUserData().isLogin;

    if (isLogin) {
      Router.navigate('/');
      return;
    }

    this.settingSubmitEvent();
  }

  login(username) {
    const user = {
      username,
      email: '',
      bio: '',
    };
    UserData.setUserData({
      isLogin: true,
      user,
    });
    localStorage.setItem('user', JSON.stringify(user));
    Router.navigate('/profile');
  }

  settingSubmitEvent() {
    const $loginForm = document.getElementById('login-form');
    if (!$loginForm) return;

    $loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const username = document.getElementById('username').value;
      this.login(username);
    });
  }

  render() {
    return `
      <main class="bg-gray-100 flex items-center justify-center min-h-screen">
        <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 class="text-2xl font-bold text-center text-blue-600 mb-8">항해플러스</h1>
          <form id="login-form">
            <div class="mb-4">
              <input type="text" placeholder="이름" id="username" class="w-full p-2 border rounded" required>
            </div>
            <div class="mb-6">
              <input type="password" placeholder="비밀번호" id="password" class="w-full p-2 border rounded" required>
            </div>
            <button type="submit" class="w-full bg-blue-600 text-white p-2 rounded font-bold">로그인</button>
          </form>
        </div>
      </main>
    `;
  }
}
