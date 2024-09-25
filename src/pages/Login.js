import authStore from "../store/authStore.js";
import UserStorage from "../utils/UserStorage.js";

export default class Login {
  constructor({ $element, router, header, footer }) {
    this.$element = $element;
    this.router = router;
    this.userStorage = new UserStorage();
    this.render();
    this.errorMessage = "";
    this.handleLogIn();
    header.hide();
    footer.hide();
  }

  render() {
    this.$element.innerHTML = `
    <div class="h-screen flex items-center">
      <main class="p-4 w-full max-w-md">
        <div class="bg-white p-8 rounded-lg shadow-md">
          <h1 class="text-2xl font-bold text-center text-blue-600 mb-8">항해플러스</h1>
          <form id='login-form'>
            <div class="mb-4">
              <input type="text" id="username" placeholder="이메일 또는 전화번호" class="w-full p-2 border rounded">
              ${
                this.errorMessage
                  ? `<p class="text-red-500 text-sm">${this.errorMessage}</p>`
                  : ""
              }
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
    </div>
        `;
  }

  handleLogIn() {
    const form = this.$element.querySelector("#login-form");
    if (!form) return;
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const username = this.$element.querySelector("#username").value;

      try {
        if (!username) {
          throw new Error("아이디를 입력해주세요.");
        }

        authStore.setState({
          isLoggedIn: !!username,
        });
        this.userStorage.set("name", username);
        this.userStorage.set("email", "");
        this.userStorage.set("bio", "");
        this.router.navigateTo("/");
      } catch (error) {
        this.errorMessage = error.message;
        this.render();
      }
    });
  }
}
