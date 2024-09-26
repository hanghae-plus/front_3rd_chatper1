import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import UserData from '../stores/UserData.js';
import Router from '../Router.js';

export default class ProfilePage {
  init() {
    const isLogin = UserData.getUserData().isLogin;

    if (!isLogin) {
      Router.navigate('/login');
      return;
    }

    Header.init();
    this.settingInputValue();
    this.settingSubmitEvent();
  }

  settingInputValue() {
    const userData = UserData.getUserData();
    const $username = document.getElementById('username');
    const $email = document.getElementById('email');
    const $bio = document.getElementById('bio');

    $username.value = userData.user?.username || '';
    $email.value = userData.user?.email || '';
    $bio.value = userData.user?.bio || '';
  }

  settingSubmitEvent() {
    const $profileForm = document.getElementById('profile-form');
    if (!$profileForm) return;

    $profileForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const newUserData = {
        username: e.target.elements.username.value,
        email: e.target.elements.email.value,
        bio: e.target.elements.bio.value,
      };
      UserData.setUserData({
        user: newUserData,
      });
      localStorage.setItem('user', JSON.stringify(newUserData));

      alert('프로필이 업데이트되었습니다.');
    });
  }

  render() {
    const header = new Header();
    const footer = new Footer();

    return `
      <div class="bg-gray-100 min-h-screen flex justify-center">
        <div class="max-w-md w-full">
          ${header.render()}
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
          ${footer.render()}
        </div>
      </div>
    `;
  }
}
