import { userInfoState } from '../main.js';
import { h } from '../virtual-dom.js';

function Profile() {
  const userInfo = userInfoState.getUser();

  return (
    <main class="p-4">
      <div class="bg-white p-8 rounded-lg shadow-md">
        <h2 class="text-2xl font-bold text-center text-blue-600 mb-8">내 프로필</h2>
        <form id="profile-form">
          <div class="mb-4">
            <label for="username" class="block text-gray-700 text-sm font-bold mb-2">
              사용자 이름
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={userInfo.username}
              class="w-full p-2 border rounded"
            />
          </div>
          <div class="mb-4">
            <label for="email" class="block text-gray-700 text-sm font-bold mb-2">
              이메일
            </label>
            <input type="email" id="email" name="email" value="hong@example.com" class="w-full p-2 border rounded" />
          </div>
          <div class="mb-6">
            <label for="bio" class="block text-gray-700 text-sm font-bold mb-2">
              자기소개
            </label>
            <textarea id="bio" name="bio" rows="4" class="w-full p-2 border rounded">
              {userInfo.bio}
            </textarea>
          </div>
          <button type="submit" class="w-full bg-blue-600 text-white p-2 rounded font-bold">
            프로필 업데이트
          </button>
        </form>
      </div>
    </main>
  );
}

document.addEventListener('submit', e => {
  e.preventDefault();
  const { pathname } = location;
  if (pathname !== '/profile') {
    return;
  }
  const $textarea = document.querySelector('textarea') as HTMLTextAreaElement;
  if ($textarea !== null) {
    const userInfo = { username: 'testuser', email: '', bio: $textarea.value };
    console.log($textarea.value);
    userInfoState.setUser(userInfo);
    localStorage.setItem('user', JSON.stringify(userInfoState.getUser()));
  }
});

export default Profile;
