import user from '../User';

class Login {
  template() {
    return `
      <main class="bg-gray-100 flex items-center justify-center min-h-screen">
        <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 class="text-2xl font-bold text-center text-blue-600 mb-8">항해플러스</h1>

          <form id="login-form">
            <div class="mb-4">
              <input type="text" id="username" placeholder="사용자 이름" class="w-full p-2 border rounded">
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
            <button class="bg-green-500 text-white px-4 py-2 rounded font-bold">새 계정 만들기</button>
          </div>
        </div>
      </main>
    `;
  }

  bindEvents(renderHTML) {
    // 로그인 여부 확인
    if (user.isLoggedIn()) {
      // 로그인이 되어있는 경우 메인페이지로 이동
      history.pushState(null, null, '/');
      renderHTML('/');
      return; // 메인 페이지로 이동 후 나머지 코드 실행 방지
    }

    const loginForm = document.querySelector("#login-form");

    loginForm && loginForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const username = document.querySelector("#username").value;

      if (!username) {
        alert("이메일 또는 전화번호를 입력해 주세요.");
        return;
      }

      user.login({
        username: username,
        email: '',
        bio: ''
      });

      history.pushState(null, null, '/profile');
      renderHTML('/profile');
    })

    window.addEventListener('error', () => {
      document.querySelector("#root").innerHTML = `
        <h2>오류 발생!</h2>
        <p>의도적인 오류입니다.</p>
      `
    })
  }
}

export default new Login();