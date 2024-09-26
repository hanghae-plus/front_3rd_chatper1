import { Component, ErrorBoundary } from "../base";
import handleHeaderComponent from "../components/Header";
import handleFooterComponent from "../components/Footer";
import { dispatch, selectIsLoggedIn, selectUser, setUser } from "../store";
import { navigateTo } from "../router";
import { isValidUsername } from "../validates";

class ProfilePage extends Component {
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
    if (!selectIsLoggedIn()) {
      navigateTo("/login");
      return;
    } else {
      const { username, email, bio } = selectUser();
      this.targetElement.innerHTML = `
      <div class="bg-gray-100 min-h-screen flex justify-center">
        <div class="max-w-md w-full">
          <div id="HEADER"></div>

          <main class="p-4">
            <div class="bg-white p-8 rounded-lg shadow-md">
              <h2 class="text-2xl font-bold text-center text-blue-600 mb-8">내 프로필</h2>
              <form id="profile-form" method="post">
                <div class="mb-4">
                  <label for="username" class="block text-gray-700 text-sm font-bold mb-2">사용자 이름</label>
                  <input type="text" id="username" name="username" value="${username}" class="w-full p-2 border rounded">
                </div>
                <div class="mb-4">
                  <label for="email" class="block text-gray-700 text-sm font-bold mb-2">이메일</label>
                  <input type="email" id="email" name="email" value="${email}" class="w-full p-2 border rounded">
                </div>
                <div class="mb-6">
                  <label for="bio" class="block text-gray-700 text-sm font-bold mb-2">자기소개</label>
                  <textarea id="bio" name="bio" rows="4" class="w-full p-2 border rounded">${bio}</textarea>
                </div>
                <button type="submit" class="w-full bg-blue-600 text-white p-2 rounded font-bold">프로필 업데이트</button>
              </form>
            </div>
          </main>

          <div id="FOOTER"></div>
        </div>
      </div>
      `;

      // HeaderComponent, footerComponent 처리
      const headerElement = document.getElementById("HEADER");
      const footerElement = document.getElementById("FOOTER");
      handleHeaderComponent(headerElement)();
      handleFooterComponent(footerElement)();
      Array.from(headerElement.children).forEach((child) =>
        headerElement.parentElement.insertBefore(child, headerElement)
      );
      headerElement.remove();
      Array.from(footerElement.children).forEach((child) =>
        footerElement.parentElement.insertBefore(child, footerElement)
      );
      footerElement.remove();

      const form = document.querySelector("form");
      const handleFormSubmit = (e) => {
        this.handleError(() => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const username = formData.get("username");
          const email = formData.get("email");
          const bio = formData.get("bio");

          if (!isValidUsername(username)) return;

          dispatch(setUser({ username, email, bio }));

          alert("프로필이 업데이트되었습니다.");
        });
      };
      form.addEventListener("submit", handleFormSubmit);
      const usernameInput = document.getElementById("username");
      const handleUsernameInput = (e) => {
        this.handleError(() => {
          isValidUsername(e.target.value);
        });
      };
      usernameInput.addEventListener("input", handleUsernameInput);
    }
  }
}

const component = new ProfilePage();
const renderComponent = new ErrorBoundary(null, component.render.bind(component));
const handleProfilePage = renderComponent.render.bind(renderComponent);
export default handleProfilePage;
