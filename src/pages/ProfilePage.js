import UserInfo from "../UserInfo";
import { BIO, EMAIL, USERNAME } from "../constants";

import Footer from "../components/Footer";
import Header from "../components/Header";
import BasePage from "../base/BasePage";

export default class ProfilePage extends BasePage {
  constructor({ props, onClickUpdateProfile, onUpdateProfile, onLogout }) {
    super({ props, onClickUpdateProfile, onUpdateProfile, onLogout });
  }

  init() {
    this.header = new Header({
      props: this.props,
      onLogout: this.onLogout,
    });
    this.footer = new Footer();
  }

  template() {
    return `
      <div class="bg-gray-100 min-h-screen flex justify-center">
        <div class="max-w-md w-full">
        ${this.header.template()}

          <main class="p-4">
            <div class="bg-white p-8 rounded-lg shadow-md">
              <h2 class="text-2xl font-bold text-center text-blue-600 mb-8">내 프로필</h2>
              <form id="profile-form">
                <div class="mb-4">
                  <label for=${USERNAME} class="block text-gray-700 text-sm font-bold mb-2">사용자 이름</label>
                  <input type="text" id=${USERNAME} name=${USERNAME} class="w-full p-2 border rounded">
                </div>
                <div class="mb-4">
                  <label for=${EMAIL} class="block text-gray-700 text-sm font-bold mb-2">이메일</label>
                  <input type=${EMAIL} id=${EMAIL} name=${EMAIL} class="w-full p-2 border rounded">
                </div>
                <div class="mb-6">
                  <label for=${BIO} class="block text-gray-700 text-sm font-bold mb-2">자기소개</label>
                  <textarea id=${BIO} name=${BIO} rows="4" class="w-full p-2 border rounded"></textarea>
                </div>
                <button type="submit" class="w-full bg-blue-600 text-white p-2 rounded font-bold">프로필 업데이트</button>
              </form>
            </div>
          </main>

          ${this.footer.template()}
        </div>
      </div>
    `;
  }

  attachEventListeners() {
    const $usernameInput = document.getElementById("username");
    const $emailInput = document.getElementById("email");
    const $bioInput = document.getElementById("bio");

    $usernameInput.value = this.props.username;
    $emailInput.value = this.props.email;
    $bioInput.value = this.props.bio;

    // 업데이트 시
    const $profileForm = document.getElementById("profile-form");

    $profileForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const $usernameInput = document.getElementById(USERNAME);
      const $emailInput = document.getElementById(EMAIL);
      const $bioInput = document.getElementById(BIO);

      const userInfo = new UserInfo();

      userInfo.set(USERNAME, $usernameInput.value);
      userInfo.set(EMAIL, $emailInput.value);
      userInfo.set(BIO, $bioInput.value);

      this.onUpdateProfile({
        username: userInfo.get(USERNAME),
        email: userInfo.get(EMAIL),
        bio: userInfo.get(BIO),
      });

      alert("프로필이 업데이트 되었습니다.");
    });
  }

  update(newState) {
    super.update(newState);

    this.header.update(newState);
  }

  render() {
    super.render();

    this.header.render();
    this.footer.render();
  }
}
