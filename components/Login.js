const Login = (isError = false) => {
  return `
    <main class="bg-gray-100 flex items-center justify-center min-h-screen">
      <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 class="text-2xl font-bold text-center text-blue-600 mb-8">항해플러스</h1>
        <form id="login-form">
          ${isError ? `
            <div id="error"> 
              <h2>오류 발생!</h2>
              <p>의도적인 오류입니다.</p>
            </div>`
            : ''
          }
          <div class="mb-4">
            <input type="text" id="username" placeholder="이메일 또는 사용자 이름" class="w-full p-2 border rounded">
          </div>
          <div class="mb-6">
            <input type="password" id="password" placeholder="비밀번호" class="w-full p-2 border rounded">
          </div>
          <button type="submit" class="w-full bg-blue-600 text-white p-2 rounded font-bold">로그인</button>
        </form>
        <div class="mt-4 text-center">
          <a href="#" class="text-blue-600 text-sm">비밀번호를 잊으셨나요?</a>
        </div>
        <hr class="my-6">
        <div class="text-center">
          <button id="createAccount" class="bg-green-500 text-white px-4 py-2 rounded font-bold">새 계정 만들기</button>
        </div>
      </div>
    </main>
  `;
};

const render = (root, isError = false) => {
  root.innerHTML = Login(isError);
};

const loginEvent = (renderPage) => {
  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const username = document.getElementById("username").value.trim();

      if (!username) {
        alert("이메일 또는 전화번호를 입력해 주세요.");
        return;
      }

      const user = {
        username: username,
        email: '',
        bio: '',
      };

      localStorage.setItem('user', JSON.stringify(user));
      renderPage('/profile');
    });

    //username 1 입력 시 에러 체크 부분
    const usernameInput = document.getElementById("username");
    if (usernameInput) {
      usernameInput.addEventListener('input', () => {
        try {
          // 에러 발생 조건 확인
          if (usernameInput.value === '1') {
            render(document.getElementById('root'), true); // 에러 메시지를 포함한 로그인 컴포넌트 렌더링
            throw new Error('의도적인 오류입니다.');
          }
        } catch (error) {
          console.error(error.message);
        }
      }, { once: true }); 
    }
  }
};

export default Login;
export { loginEvent };
