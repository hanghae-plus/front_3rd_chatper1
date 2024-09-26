import { userInfoState } from '../main.js';
import { router } from '../router.js';
import { h } from '../virtual-dom.js';

function Login() {
  return (
    <main class="bg-gray-100 flex items-center justify-center min-h-screen">
      <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 class="text-2xl font-bold text-center text-blue-600 mb-8">항해플러스</h1>
        <form id="login-form">
          <div class="mb-4">
            <input type="text" id="username" placeholder="이메일 또는 전화번호" class="w-full p-2 border rounded" />
          </div>
          <div class="mb-6">
            <input type="password" id="password" placeholder="비밀번호" class="w-full p-2 border rounded" />
          </div>
          <button type="submit" class="w-full bg-blue-600 text-white p-2 rounded font-bold">
            로그인
          </button>
        </form>
        <div class="mt-4 text-center">
          <a class="text-blue-600 text-sm">비밀번호를 잊으셨나요?</a>
        </div>
        <hr class="my-6" />
        <div class="text-center">
          <button class="bg-green-500 text-white px-4 py-2 rounded font-bold">새 계정 만들기</button>
        </div>
      </div>
    </main>
  );
}

document.addEventListener('submit', e => {
  const { pathname } = location;
  if (pathname !== '/login') {
    return;
  }
  e.preventDefault();
  const $id = document.getElementById('username') as HTMLInputElement;
  if ($id !== null) {
    localStorage.setItem(
      'user',
      JSON.stringify({
        username: $id.value,
        email: '',
        bio: '',
      }),
    );
    userInfoState.setUser({ username: $id.value, email: '', bio: '' });
    router().push('/');
  } else {
    alert('에러가 발생했습니다!');
  }
});

export default Login;
