import { PATH_INFO } from '../constant';
import { Router } from '../router';
import UserInfo from '../userInfo';
import BaseView from './BaseView';

export class LoginView extends BaseView {
  createElement() {
    const div = super.createElement();
    div.innerHTML = ` <main class="bg-gray-100 flex items-center justify-center min-h-screen">
      <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 class="text-2xl font-bold text-center text-blue-600 mb-8">
          항해플러스
        </h1>
        <form id="login-form">
          <div class="mb-4">
            <input
              type="text"
              id="username"
              placeholder="이메일 또는 전화번호"
              class="w-full p-2 border rounded" />
          </div>
          <div class="mb-6">
            <input
              type="password"
              id="password"
              placeholder="비밀번호"
              class="w-full p-2 border rounded" />
          </div>
          <button
            type="submit"
            class="w-full bg-blue-600 text-white p-2 rounded font-bold">
            로그인
          </button>
        </form>
        <div class="mt-4 text-center">
          <a href="#" class="text-blue-600 text-sm">비밀번호를 잊으셨나요?</a>
        </div>
        <hr class="my-6" />
        <div class="text-center">
          <button class="bg-green-500 text-white px-4 py-2 rounded font-bold">
            새 계정 만들기
          </button>
        </div>
      </div>
    </main>`;

    this.addEventListeners(div);
    return div;
  }

  // 의도: dom이 완전히 로드 된 후, 실행을 보장하기 위함
  addEventListeners(container) {
    const form = container.querySelector('#login-form');
    if (!form) {
      return;
    }

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      this.handleLogin();
    });
  }

  handleLogin() {
    const username = document.getElementById('username').value;

    UserInfo.set('username', username);

    // todo: replace 기능 넣어보기
    Router.redirect(PATH_INFO.profile);
  }
}
