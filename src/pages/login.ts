import { BaseComponent } from '../shared/ui/BaseComponent';
import { isLoggedIn, login } from '../shared/util/auth';
import { router } from '../shared/util/Router';

const ID = {
  LOGIN_FORM: 'login-form',
  USER_NAME: 'username',
};

export default class LoginPage extends BaseComponent {
  afterRender() {
    this.checkAccess();
    this.bindLoginEvent();
  }

  private checkAccess() {
    if (isLoggedIn()) {
      router.navigateTo('/');
    }
  }

  private bindLoginEvent() {
    const $loginForm = this.getElement<HTMLFormElement>(`#${ID.LOGIN_FORM}`);
    if (!$loginForm) return;

    $loginForm.addEventListener('submit', this.handleLogin.bind(this));
  }

  private handleLogin(e: SubmitEvent) {
    e.preventDefault();

    const $nameInput = this.getElement<HTMLInputElement>(`#${ID.USER_NAME}`)!;
    const username = $nameInput.value.trim();

    login({ name: username });
  }

  template() {
    return `
    <main class="bg-gray-100 flex items-center justify-center min-h-screen">
      <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 class="text-2xl font-bold text-center text-blue-600 mb-8">항해플러스</h1>

        <form id="${ID.LOGIN_FORM}">
          <div class="mb-4">
            <input id="${ID.USER_NAME}" type="text" placeholder="이메일 또는 전화번호" class="w-full p-2 border rounded">
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
