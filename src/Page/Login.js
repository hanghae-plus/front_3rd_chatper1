export const Login = () => {
    console.log('Login Components!');

    window.addEventListener('DOMContentLoaded', (event) => {
        const loginForm = document.getElementById('login-form');

        // 로그인 폼 제출 처리
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault(); // 폼의 기본 제출 동작 막기
            const usernameInput = document.getElementById('username').value;

            // 유저 정보 저장
            const user = {
                username: usernameInput,
                email: '',
                bio: '',
            };

            localStorage.setItem('user', JSON.stringify(user));
        });

        // document.querySelector('#signup').addEventListener('click', handleSignUpButtonTapped);
    });

    // const handleSignUpButtonTapped = (e) => {
    //     e.preventDefault();

    //     const userInfo = { username: 'testuser', email: '', bio: '' };

    //     localStorage.setItem('user', userInfo);

    //     // window.history.pushState({}, '', 'signup');
    //     // window.dispatchEvent(new Event('popstate'));
    // };

    document.querySelector('#root').innerHTML = `
  <body>
    <div id="root">
      <main class="bg-gray-100 flex items-center justify-center min-h-screen">
        <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 class="text-2xl font-bold text-center text-blue-600 mb-8">항해플러스</h1>
          <form id="login-form">
            <div class="mb-4">
              <input type="text" placeholder="이메일 또는 전화번호" class="username w-full p-2 border rounded">
            </div>
            <div class="mb-6">
              <input type="password" placeholder="비밀번호" class="w-full p-2 border rounded">
            </div>
            <button type="submit" id="submit" class="w-full bg-blue-600 text-white p-2 rounded font-bold">로그인</button>
          </form>
          <div class="mt-4 text-center">
            <a href="#" class="text-blue-600 text-sm">비밀번호를 잊으셨나요?</a>
          </div>
          <hr class="my-6">
          <div class="text-center">
            <button id="signup" class="bg-green-500 text-white px-4 py-2 rounded font-bold">새 계정 만들기</button>
          </div>
        </div>
      </main>
    </div>
  </body>
  `;
};
