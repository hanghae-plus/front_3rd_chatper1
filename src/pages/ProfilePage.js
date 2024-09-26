import { Footer } from "../components/footer";
import { Header } from "../components/header";
import { Nav } from "../components/nav";
import User from "../js/user";
import { bindLogoutEvent, bindProfileUpdateEvent } from "../main.js";

export default class ProfilePage {
  render() {
    const user = User.getUser();

    return `
      <div class="bg-gray-100 min-h-screen flex justify-center">
        <div class="max-w-md w-full">
        ${Header()}
        ${Nav()}
        <main class="p-4">
          <div class="bg-white p-8 rounded-lg shadow-md">
            <h2 class="text-2xl font-bold text-center text-blue-600 mb-8">
              내 프로필
            </h2>
            ${this.renderProfileForm()}
          </div>
        </main>
        ${Footer()}
      </div>
    </div>
  `;
  }

  renderProfileForm() {
    const user = User.getUser();
    return `
      <form id="profile-form">
        <div class="mb-4">
          <label
            for="username"
            class="block text-gray-700 text-sm font-bold mb-2"
            >사용자 이름</label
          >
          <input
            type="text"
            id="username"
            name="username"
            value="${user.username}"
            class="w-full p-2 border rounded"
          />
        </div>
        <div class="mb-4">
          <label
            for="email"
            class="block text-gray-700 text-sm font-bold mb-2"
            >이메일</label
          >
          <input
            type="email"
            id="email"
            name="email"
            value="${user.email}"
            class="w-full p-2 border rounded"
          />
        </div>
        <div class="mb-6">
          <label
            for="bio"
            class="block text-gray-700 text-sm font-bold mb-2"
            >자기소개</label
          >
          <textarea
            id="bio"
            name="bio"
            rows="4"
            class="w-full p-2 border rounded"
          >${user.bio}</textarea>
        </div>
        <button
          type="submit"
          class="w-full bg-blue-600 text-white p-2 rounded font-bold"
        >
          프로필 업데이트
        </button>
      </form>
    `;
  }

  init() {
    bindLogoutEvent();
    this.bindProfileUpdateEvent();
  }

  bindProfileUpdateEvent() {
    const profileForm = document.getElementById("profile-form");
    if (profileForm) {
      profileForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const updatedUsername = document
          .getElementById("username")
          .value.trim();
        const updatedEmail = document.getElementById("email").value.trim();
        const updatedBio = document.getElementById("bio").value.trim();

        const user = User.getUser();
        if (user) {
          user.updateProfile(updatedUsername, updatedEmail, updatedBio);
        }
      });
    }
  }
}
