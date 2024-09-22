import { Header } from '../components/Header';
import {
  defaultUserInfo,
  getUserInfo,
  setUserInfo,
  UserInfo,
} from '../shared/auth';
import { BaseComponent } from '../shared/BaseComponent';

export default class ProfilePage extends BaseComponent {
  #userInfo: UserInfo;

  constructor(selector: string) {
    super(selector);
  }

  render(): void {
    this.#userInfo = getUserInfo() ?? defaultUserInfo;
    super.render();
  }

  afterRender(): void {
    new Header('#header-container');
    this.handleFormSubmit();
  }

  private handleFormSubmit() {
    const $profileForm = this.querySelector('#profile-form') as HTMLFormElement;

    const $usernameInput = $profileForm.querySelector(
      '#username'
    ) as HTMLInputElement;
    const $emailInput = $profileForm.querySelector(
      '#email'
    ) as HTMLInputElement;
    const $bioInput = $profileForm.querySelector('#bio') as HTMLInputElement;

    $profileForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = $usernameInput.value.trim();
      const email = $emailInput.value.trim();
      const bio = $bioInput.value.trim();

      setUserInfo({
        name,
        email,
        bio,

        username: name,
      });
    });
  }

  template() {
    return `
<div class="bg-gray-100 min-h-screen flex justify-center">
    <div class="max-w-md w-full">
    
    <div id="header-container">
          <!-- Header가 이곳에 렌더링 -->
    </div>

      <main class="p-4">
        <div class="bg-white p-8 rounded-lg shadow-md">
          <h2 class="text-2xl font-bold text-center text-blue-600 mb-8">내 프로필</h2>
          <form id="profile-form">
            <div class="mb-4">
              <label for="username" class="block text-gray-700 text-sm font-bold mb-2">사용자 이름</label>
              <input type="text" id="username" name="username" value="${
                this.#userInfo.username ?? this.#userInfo.name
              }" class="w-full p-2 border rounded">
            </div>
            <div class="mb-4">
              <label for="email" class="block text-gray-700 text-sm font-bold mb-2">이메일</label>
              <input type="email" id="email" name="email" value="${
                this.#userInfo.email
              }" class="w-full p-2 border rounded">
            </div>
            <div class="mb-6">
              <label for="bio" class="block text-gray-700 text-sm font-bold mb-2">자기소개</label>
              <textarea id="bio" name="bio" rows="4" class="w-full p-2 border rounded">${
                this.#userInfo.bio
              }</textarea>
            </div>
            <button type="submit" class="w-full bg-blue-600 text-white p-2 rounded font-bold">프로필 업데이트</button>
          </form>
        </div>
      </main>

      <footer class="bg-gray-200 p-4 text-center">
        <p>&copy; 2024 항해플러스. All rights reserved.</p>
      </footer>
    </div>
  </div>
  `;
  }
}
