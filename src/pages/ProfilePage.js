import UserInfo from "../UserInfo";

import Footer from "../components/Footer";
import Header from "../components/Header";

import { BIO, EMAIL, USERNAME } from "../constants";

export default function ProfilePage({
  $root,
  initialState,
  onUpdateProfile,
  onLogout,
}) {
  this.state = initialState;
  this.onUpdateProfile = onUpdateProfile;
  this.onLogout = onLogout;

  const header = new Header({
    initialState: this.state,
    onLogout: this.onLogout,
  });

  const footer = new Footer();

  this.$target = document.createElement("div");
  this.$target.className = "bg-gray-100 min-h-screen flex justify-center";

  this.template = () => {
    return `
      <div class="max-w-md w-full">
      ${header.template()}

        <main class="p-4">
          <div class="bg-white p-8 rounded-lg shadow-md">
            <h2 class="text-2xl font-bold text-center text-blue-600 mb-8">내 프로필</h2>
            <form id="profile-form">
              <div class="mb-4">
                <label for="username" class="block text-gray-700 text-sm font-bold mb-2">사용자 이름</label>
                <input type="text" id="username" name="username" class="w-full p-2 border rounded">
              </div>
              <div class="mb-4">
                <label for="email" class="block text-gray-700 text-sm font-bold mb-2">이메일</label>
                <input type="email" id="email" name="email" class="w-full p-2 border rounded">
              </div>
              <div class="mb-6">
                <label for="bio" class="block text-gray-700 text-sm font-bold mb-2">자기소개</label>
                <textarea id="bio" name="bio" rows="4" class="w-full p-2 border rounded"></textarea>
              </div>
              <button type="submit" class="w-full bg-blue-600 text-white p-2 rounded font-bold">프로필 업데이트</button>
            </form>
          </div>
        </main>

        ${footer.template()}
      </div>
    `;
  };

  this.render = () => {
    $root.innerHTML = "";
    this.$target.innerHTML = this.template();
    $root.appendChild(this.$target);

    const $usernameInput = document.getElementById("username");
    const $emailInput = document.getElementById("email");
    const $bioInput = document.getElementById("bio");

    $usernameInput.value = this.state.username;
    $emailInput.value = this.state.email;
    $bioInput.value = this.state.bio;

    // 업데이트 tl
    const $profileForm = document.getElementById("profile-form");
    $profileForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const $usernameInput = document.getElementById("username");
      const $emailInput = document.getElementById("email");
      const $bioInput = document.getElementById("bio");

      const userInfo = new UserInfo();

      userInfo.set("username", $usernameInput.value);
      userInfo.set("email", $emailInput.value);
      userInfo.set("bio", $bioInput.value);

      this.onUpdateProfile({
        username: userInfo.get(USERNAME),
        email: userInfo.get(EMAIL),
        bio: userInfo.get(BIO),
      });

      alert("프로필이 업데이트 되었습니다.");
    });

    header.render();
    footer.render();
  };

  this.setState = (newState) => {
    this.state = {
      ...this.state,
      ...newState,
    };

    header.setState(newState);

    this.render();
  };
}
