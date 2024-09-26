export default class LoginPage {
  constructor() {
    document.title = "LoginPage";
  }
  getHtml() {
    return `
          <main class="bg-gray-100 flex items-center justify-center min-h-screen">
      <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 class="text-2xl font-bold text-center text-blue-600 mb-8">항해플러스</h1>
        <form id="login-form">
          <div class="mb-4">
            <input type="text" id="username" placeholder="이메일 또는 전화번호" class="w-full p-2 border rounded">
          </div>
          <div class="mb-6">
            <input type="password" id="password" placeholder="비밀번호" class="w-full p-2 border rounded">
          </div>
          <button type="submit" id="loginBtn" class="w-full bg-blue-600 text-white p-2 rounded font-bold">로그인</button>
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
  addEventListeners() {
    //이벤트 모음
    const loginBtn = document.getElementById("loginBtn");

    //로그인 폼 제출
    document
      .getElementById("login-form")
      .addEventListener("submit", (event) => {
        event.preventDefault();
        this.reqLogin();
      });

    // 오류 메시지를 표시할 요소 생성
    const $errorMessage = document.createElement("p");
    $errorMessage.style.color = "red"; // 오류 메시지 색상 설정
    $errorMessage.style.display = "none"; // 숨김 처리

    document.querySelector("#login-form").appendChild($errorMessage); // 로그인 폼 아래에 추가

    const $username = document.querySelector("#username");
    $username.addEventListener("input", (event) => {
      // 입력 중 발생하는 오류 처리
      const value = event.target.value;

      if (value.length < 3) {
        $errorMessage.textContent = "오류 발생! 의도적인 오류입니다."; // 오류 메시지 설정
        $errorMessage.style.display = "block";
      } else {
        $errorMessage.textContent = "";
        $errorMessage.style.display = "none";
      }
    });
  }
  reqLogin() {
    const username = document.getElementById("username").value;
    // const password = document.getElementById("password").value;

    // console.log("로그인 정보:", { username, password });

    // 사용자 정보를 로컬 스토리지에 저장
    const user = {
      username: "testuser",
      email: "",
      bio: "",
    };
    localStorage.setItem("user", JSON.stringify(user));

    if (username) {
      // 로그인 성공
      let url = location.origin + "/";
      window.history.pushState({ page: "HomePage" }, "", url);
      window.dispatchEvent(new Event("popstate"));
    } else {
      alert("이메일과 비밀번호를 입력하세요.");
    }
  }
}
