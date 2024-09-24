import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Logout, handleRouting, isLoggedIn, router, user } from "../main";

export function ProfilePage() {
  if (!isLoggedIn()) {
    router.navigateTo("/login", true);
    return;
  }

  let html = `<main class="p-4">
  <div class="bg-white p-8 rounded-lg shadow-md">
    <h2 class="text-2xl font-bold text-center text-blue-600 mb-8">
      내 프로필
    </h2>
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
          value=""
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
          value=""
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
        ></textarea>
      </div>
      <button
        type="submit"
        class="w-full bg-blue-600 text-white p-2 rounded font-bold"
      
      >
        프로필 업데이트
      </button>
    </form>
  </div>
</main>`;

  document.querySelector(
    "#root"
  ).innerHTML = `<div class="bg-gray-100 min-h-screen flex justify-center">
    <div class="max-w-md w-full">${Header()}${html}${Footer()}</div>
    </div>`;

  handleRouting();

  const userName = user.preferences?.username;
  const userIntro = user.preferences?.bio;
  const email = user.preferences?.email;
  const userNameInputEl = document.querySelector("#username");
  const userIntroInputEl = document.querySelector("#bio");
  const emailInputEl = document.querySelector("#email");

  userNameInputEl.value = userName;
  userIntroInputEl.value = userIntro;
  emailInputEl.value = email;
  handleProfileUpdate();
  Logout();
}

function handleProfileUpdate() {
  const profileForm = document.getElementById("profile-form");
  const bioInput = document.getElementById("bio");
  const usernameInput = document.getElementById("username");
  const emailInput = document.getElementById("email");

  if (profileForm) {
    profileForm.addEventListener("submit", (e) => {
      e.preventDefault();
      user.set("username", usernameInput.value);
      user.set("email", emailInput.value);
      user.set("bio", bioInput.value);
      alert("프로필이 업데이트 되었습니다");
    });
  }
}
