import { UserPreferences } from '../services/UserPreferences';
import Router from '../router/Router';

export const renderLoginPage = () => {
  document.querySelector('#root').innerHTML = `
    <main class="bg-gray-100 flex items-center justify-center min-h-screen">
      <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 class="text-2xl font-bold text-center text-blue-600 mb-8">항해플러스</h1>
        <form id="login-form">
          <div class="mb-4">
            <input type="text" id="username" placeholder="사용자 이름" class="w-full p-2 border rounded">
          </div>
          <div class="mb-6">
            <input type="password" id="userPw" placeholder="비밀번호" class="w-full p-2 border rounded">
          </div>
          <button type="submit" id="loginButton" class="w-full bg-blue-600 text-white p-2 rounded font-bold">로그인</button>
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

  // 사용자 이름 입력 이벤트 핸들러 등록
  const $username = document.querySelector('#username');
  $username.addEventListener(
    'input',
    (e) => {
      try {
        if (e.target.value === '1') {
          throw new Error('의도적인 오류입니다.');
        }
      } catch (error) {
        errorBoundary(error); // 에러를 에러 바운더리에 전달
      }
    },
    { once: true }
  );

  // 로그인 폼 제출 이벤트 핸들러
  document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const userInfo = {
      username: document.getElementById('username').value,
      email: '',
      bio: '',
      isLoggedIn: true,
    };

    // LocalStorage에 데이터 저장 (key: 'user')
    UserPreferences.set(userInfo);
    const router = Router.getInstance();
    router.handleLogin();
    router.navigateTo('/profile');
  });
};

// 에러 바운더리 처리 함수
function errorBoundary(error) {
  document.querySelector('#root').innerHTML = `
    <div>
      <p>오류 발생!</p>
      <p>${error.message}</p>
    </div>
  `;
}
