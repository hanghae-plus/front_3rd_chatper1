import { UserStateInstance } from '@/store/Storage.js';
import { ROUTER } from '@/main.js';

export default function LoginPage(root) {
	root.innerHTML = `
      <main class="bg-gray-100 flex items-center justify-center min-h-screen">
        <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 class="text-2xl font-bold text-center text-blue-600 mb-8">항해플러스</h1>
          <form id="login-form">
            <div class="mb-4">
              <input id="username" type="text" placeholder="이메일 또는 전화번호" class="w-full p-2 border rounded">
            </div>
            <div class="mb-6">
              <input id="password" type="password" placeholder="비밀번호" class="w-full p-2 border rounded">
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

	const LOGIN_FORM = document.getElementById('login-form');
	const PASSWORD = document.getElementById('password');

	if (LOGIN_FORM) {
		LOGIN_FORM.addEventListener('submit', (event) => {
			// 기본 동작 방지
			event.preventDefault();
			const USER_NAME_INPUT = document.getElementById('username');
			const USER_NAME = USER_NAME_INPUT.value.trim();

			if (USER_NAME) {
				const USER = {
					username: USER_NAME,
					email: '',
					bio: '',
				};

				UserStateInstance.setUser(USER);
				console.log(`${USER_NAME}의 로그인 성공!`);
				ROUTER.navigateTo('/profile');
			} else {
				console.log('사용자의 이름을 입력하세요');
			}
		});
	}
}
