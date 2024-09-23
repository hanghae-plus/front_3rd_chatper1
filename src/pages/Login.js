import UserPreferences from "../utils/UserPreferences.js";
import Header from "../components/layouts/Header.js";

export default class Login {
  constructor({ $element, router }) {
    this.$element = $element;
    this.router = router;
    this.render();
    this.handleLogIn();
    this.userPreferences = new UserPreferences();
  }

  render() {
    this.$element.innerHTML = this.template();
  }

  template() {
    return `
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
    <h1 class="text-2xl font-bold text-center text-blue-600 mb-8">항해플러스</h1>
    <form id='login-form'>
      <div class="mb-4">
        <input type="text" id="email" placeholder="이메일 또는 전화번호" class="w-full p-2 border rounded">
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
        `;
  }

  handleLogIn() {
    const form = this.$element.querySelector("#login-form");
    const header = new Header({ $element: document.querySelector("header") });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = this.$element.querySelector("#email").value;
      const password = this.$element.querySelector("#password").value;

      if (!email || !password) {
        alert("이메일과 비밀번호를 확인해주세요.");
        return;
      }

      if (email) {
        this.userPreferences.set("email", email);
        this.router.navigateTo("/");
        header.setState(!this.userPreferences.get("email"));
      }
    });
  }
}
