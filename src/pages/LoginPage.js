import { Component, ErrorBoundary } from "../base";
import { dispatch, login, selectIsLoggedIn } from "../store";
import { isValidUsername } from "../validates";
import { navigateTo } from "../router";

class LoginPage extends Component {
  constructor(targetElement) {
    super(targetElement, {});
  }

  handleError(fn) {
    try {
      fn();
    } catch (error) {
      renderComponent.setState(ErrorBoundary.getDerivedStateFromError(error));
    }
  }

  render() {
    if (selectIsLoggedIn()) {
      navigateTo("/");
      return;
    } else {
      this.targetElement.innerHTML = `
      <main class="bg-gray-100 flex items-center justify-center min-h-screen">
        <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 class="text-2xl font-bold text-center text-blue-600 mb-8">항해플러스</h1>
          <form id="login-form" method="post">
            <div class="mb-4">
              <input type="text" id="username" name="username" placeholder="이메일 또는 전화번호" required class="w-full p-2 border rounded">
            </div>
            <div class="mb-6">
              <input type="password" id="password" name="password" placeholder="비밀번호" required class="w-full p-2 border rounded">
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

      const form = document.querySelector("form");
      const handleFormSubmit = (e) => {
        this.handleError(() => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const username = formData.get("username");

          // TODO: 벨리데이션 구현
          if (!isValidUsername(username)) return;

          dispatch(login(username));
          navigateTo("/profile");
        });
      };
      form.addEventListener("submit", handleFormSubmit);
      const usernameInput = document.getElementById("username");
      const handleUsernameInput = (e) => {
        this.handleError(() => {
          // TODO: 벨리데이션 구현
          isValidUsername(e.target.value);
        });
      };
      usernameInput.addEventListener("input", handleUsernameInput);
    }
  }
}

const component = new LoginPage();
const renderComponent = new ErrorBoundary(null, component.render.bind(component));
const handleLoginPage = renderComponent.render.bind(renderComponent);
export default handleLoginPage;
