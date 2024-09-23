import { BaseComponent } from '../shared/ui/BaseComponent';
import { Footer } from '../shared/ui/Footer';
import { Header } from '../shared/ui/Header';
import { getUserInfo, setUserInfo, UserInfo } from '../shared/util/auth';

const ID = {
  PROFILE_FORM: 'profile-form',
  USER_NAME: 'username',
  EMAIL: 'email',
  BIO: 'bio',

  HEADER: 'header-container',
  FOOTER: 'footer-container',
};

export default class ProfilePage extends BaseComponent<UserInfo> {
  beforeRender() {
    this.state = getUserInfo();
  }

  afterRender() {
    new Header(`#${ID.HEADER}`).render();
    new Footer(`#${ID.FOOTER}`).render();

    this.handleFormSubmit();
  }

  private handleFormSubmit() {
    const $profileForm = this.getElement<HTMLFormElement>(
      `#${ID.PROFILE_FORM}`
    )!;

    const $nameInput = this.getElement<HTMLInputElement>(`#${ID.USER_NAME}`)!;
    const $emailInput = this.getElement<HTMLInputElement>(`#${ID.EMAIL}`)!;
    const $bioInput = this.getElement<HTMLInputElement>(`#${ID.BIO}`)!;

    $profileForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = $nameInput.value.trim();
      const email = $emailInput.value.trim();
      const bio = $bioInput.value.trim();

      const userInfo: UserInfo = {
        name,
        email,
        bio,
        username: name,
      };

      setUserInfo(userInfo);
    });
  }

  template() {
    return `
<div class="bg-gray-100 min-h-screen flex justify-center">
    <div class="max-w-md w-full">
    <div id="header-container"></div>

      <main class="p-4">
        <div class="bg-white p-8 rounded-lg shadow-md">
          <h2 class="text-2xl font-bold text-center text-blue-600 mb-8">내 프로필</h2>
          <form id="${ID.PROFILE_FORM}">
            <div class="mb-4">
              <label for="${
                ID.USER_NAME
              }" class="block text-gray-700 text-sm font-bold mb-2">사용자 이름</label>
              <input type="text" id="${ID.USER_NAME}" name="username" value="${
      this.state?.username ?? this.state?.name
    }" class="w-full p-2 border rounded">
            </div>
            <div class="mb-4">
              <label for="${
                ID.EMAIL
              }" class="block text-gray-700 text-sm font-bold mb-2">이메일</label>
              <input type="email" id="${ID.EMAIL}" name="email" value="${
      this.state?.email
    }" class="w-full p-2 border rounded">
            </div>
            <div class="mb-6">
              <label for="${
                ID.BIO
              }" class="block text-gray-700 text-sm font-bold mb-2">자기소개</label>
              <textarea id="${
                ID.BIO
              }" name="bio" rows="4" class="w-full p-2 border rounded">${
      this.state?.bio
    }</textarea>
            </div>
            <button type="submit" class="w-full bg-blue-600 text-white p-2 rounded font-bold">프로필 업데이트</button>
          </form>
        </div>
      </main>

      <div id="${ID.FOOTER}"></div>
    </div>
  </div>
  `;
  }
}
