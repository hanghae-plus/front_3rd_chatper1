import userStore from "../store/userStore";
import { BIO, EMAIL, USERNAME } from "../constants";

import Footer from "../components/Footer";
import Header from "../components/Header";
import AbstractComponent from "../abstract/AbstractComponent";

export default class ProfilePage extends AbstractComponent {
  constructor($root) {
    super($root);
  }

  mount() {
    const $header = document.getElementById("header");
    new Header($header);

    const $footer = document.getElementById("footer");
    new Footer($footer);
  }

  template() {
    return `
      <div class="bg-gray-100 min-h-screen flex justify-center">
        <div class="max-w-md w-full">
          <div id='header'></div>
          
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
          
          <footer id='footer'></footer>
        </div>
      </div>
    `;
  }

  attachEventListeners() {
    const $usernameInput = document.getElementById("username");
    const $emailInput = document.getElementById("email");
    const $bioInput = document.getElementById("bio");

    $usernameInput.value = userStore.getState().username;
    $emailInput.value = userStore.getState().email;
    $bioInput.value = userStore.getState().bio;

    // 업데이트 시
    const $profileForm = document.getElementById("profile-form");

    $profileForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const $usernameInput = document.getElementById(USERNAME);
      const $emailInput = document.getElementById(EMAIL);
      const $bioInput = document.getElementById(BIO);

      userStore.setState({
        [USERNAME]: $usernameInput.value,
        [EMAIL]: $emailInput.value,
        [BIO]: $bioInput.value,
      });

      alert("프로필이 업데이트 되었습니다.");
    });
  }
}
