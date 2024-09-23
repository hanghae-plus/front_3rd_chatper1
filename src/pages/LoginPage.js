import { navigate } from '../main';

export function LoginPage() {
  const content = document.createElement('main');
  content.className =
    'bg-gray-100 flex items-center justify-center min-h-screen';
  content.innerHTML = `
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h1 class="text-2xl font-bold text-center text-blue-600 mb-8">항해플러스</h1>
      <form id="login-form">
        <div class="mb-4">
          <input type="text" id="username" placeholder="이메일 또는 전화번호" class="w-full p-2 border rounded">
        </div>
        <div class="mb-6">
          <input type="password" id="pwd" placeholder="비밀번호" class="w-full p-2 border rounded">
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
  `;

  const loginForm = content.querySelector('#login-form');
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = loginForm.querySelector('#username').value;

    if (!id) {
      alert('아이디를 입력하세요');
      return;
    }

    // 로그인 성공 처리
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem(
      'user',
      JSON.stringify({ username: id, email: '', bio: '' })
    );

    navigate('/profile');
  });

  const root = document.getElementById('root');
  root.innerHTML = '';
  root.prepend(content);
}
