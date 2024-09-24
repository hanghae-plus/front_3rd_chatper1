import authStore from "../store/store.js";

// 로그인 페이지 컴포넌트
class Login {
  template() {
    return `
      <main class="bg-gray-100 flex items-center justify-center min-h-screen">
        <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 class="text-2xl font-bold text-center text-blue-600 mb-8">항해플러스</h1>
          <form id="login-form">
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
  }

  bindEvents(renderPage) {
    const loginForm = document.getElementById("login-form");
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const username = document.getElementById("username").value;

      if (!username) {
        alert("ID 값을 입력 해주세요!");
        return;
      }

      // 사용자 정보 객체 생성
      const user = {
        username: username,
        email: "",
        bio: "",
      };
      // 스토어 로그인 메서드 호출 및 사용자 정보 전달
      authStore.userLogin(user);

      // 로그인 처리하면서 프로필 페이지로 이동
      renderPage("/profile");
    });

    window.addEventListener("error", (error) => {
      console.log("kyj error", error);

      document.querySelector("#root").innerHTML = `
        <h2>오류 발생!</h2>
        <p>의도적인 오류입니다.</p>
      `;
    });
  }
}

export default new Login();
