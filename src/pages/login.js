import { user } from '../utils.js';
import router from '../router.js';

const loginForm = `
<main class="bg-gray-100 flex items-center justify-center min-h-screen">
  <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
    <h1 class="text-2xl font-bold text-center text-blue-600 mb-8">항해플러스</h1>
    <form id="login-form">
      <div class="mb-4">
        <input id="username" type="text" placeholder="이름" class="w-full p-2 border rounded" />
        <div id="error" class="mt-1"></div>
      </div>
      <div class="mb-4">
        <input type="email" placeholder="이메일 또는 전화번호" class="w-full p-2 border rounded" />
      </div>
      <div class="mb-6">
        <input type="password" placeholder="비밀번호" class="w-full p-2 border rounded" />
      </div>
      <button type="submit" class="w-full bg-blue-600 text-white p-2 rounded font-bold">로그인</button>
    </form>
    <div class="mt-4 text-center">
      <a href="#" class="text-blue-600 text-sm">비밀번호를 잊으셨나요?</a>
    </div>
    <hr class="my-6" />
    <div class="text-center">
      <button class="bg-green-500 text-white px-4 py-2 rounded font-bold">새 계정 만들기</button>
    </div>
  </div>
</main>
`;

class Login {
  template() {
    return loginForm;
  }
  activeEvents() {
    document.getElementById('login-form')?.addEventListener('submit', (e) => {
      try {
        const username = e.target.querySelector('input[type="text"]').value;
        const email = e.target.querySelector('input[type="email"]').value;

        user.setUser({ username, email, bio: '' });
        router.navigateTo('/');
        e.preventDefault();
      } catch (error) {
        console.error('프로필 업데이트 에러', error);
      }
    });

    document.getElementById('username')?.addEventListener('input', (e) => {
      const $error = document.getElementById('error');
      try {
        if ($error.innerHTML) {
          $error.innerHTML = '';
        }
      } catch (error) {
        $error.innerHTML = `<span class="test-xs text-red">오류 발생! ${error.message}</span>`;
      }
    });
  }
}

export default new Login();
