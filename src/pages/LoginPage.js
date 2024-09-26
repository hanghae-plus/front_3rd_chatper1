import { navigateTo } from '../utils/router.js';
import { ROUTES } from '../constants/routes.js';
import Alert from '../components/Alert.js';

export default function LoginPage() {
  function getHtml() {
    return `<main class="bg-gray-100 flex items-center justify-center min-h-screen">
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
      <div id="alert"></div> 
    </main>`;
  }

  window.addEventListener('error', (e) => {
    e.preventDefault();

    showAlert();
  });

  function setEventListener() {
    const loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', (event) =>
      handleSubmitLoginForm(event)
    );
  }

  function handleSubmitLoginForm(e) {
    e.preventDefault();

    const username = e.target.querySelector('#username').value;

    if (!username) throw new Error('username을 입력해주세요.');

    localStorage.setItem(
      'user',
      JSON.stringify({
        username,
        email: '',
        bio: ''
      })
    );
    localStorage.setItem('isLoggedIn', JSON.stringify(true));

    navigateTo(ROUTES.PROFILE);
  }

  function showAlert() {
    const alert = document.getElementById('alert');
    alert.innerHTML = Alert('의도적인 오류입니다.');
  }

  return {
    getHtml,
    setEventListener
  };
}
