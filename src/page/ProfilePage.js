import Header from '@/components/Header.js';
import Footer from '@/components/Footer.js';
import { UserStateInstance } from '@/store/Storage.js';
import { ROUTER } from '@/main.js';

export default function ProfilePage(root) {
	const USER = UserStateInstance.getUser();

	if (!USER || !USER.username) {
		ROUTER.navigateTo('/login');
		return;
	}

	root.innerHTML = `
    <div class="bg-gray-100 min-h-screen flex justify-center">
    <div class="max-w-md w-full">
      ${Header(true)}
          <main class="p-4">
        <div class="bg-white p-8 rounded-lg shadow-md">
          <h2 class="text-2xl font-bold text-center text-blue-600 mb-8">내 프로필</h2>
          <form id='profile-form'>
            <div class="mb-4">
              <label for="username" class="block text-gray-700 text-sm font-bold mb-2">사용자 이름</label>
              <input type="text" id="username" name="username" value="${USER.username}" class="w-full p-2 border rounded">
            </div>
            <div class="mb-4">
              <label for="email" class="block text-gray-700 text-sm font-bold mb-2">이메일</label>
              <input type="email" id="email" name="email" value="${USER.email}" class="w-full p-2 border rounded">
            </div>
            <div class="mb-6">
              <label for="bio" class="block text-gray-700 text-sm font-bold mb-2">자기소개</label>
              <textarea id="bio" name="bio" rows="4" class="w-full p-2 border rounded">${USER.bio}</textarea>
            </div>
            <button type="submit" class="w-full bg-blue-600 text-white p-2 rounded font-bold">프로필 업데이트</button>
          </form>
        </div>
      </main>

      ${Footer()}
    </div>
  </div>
`;

	const PROFILE_FORM = document.getElementById('profile-form');

	PROFILE_FORM.addEventListener('submit', (event) => {
		event.preventDefault();
		const UPDATE_BIO_INPUT = document.getElementById('bio');
		const UPDATE_BIO = UPDATE_BIO_INPUT.value.trim();

		const UPDATE_EMAIL_INPUT = document.getElementById('email');
		const UPDATE_EMAIL = UPDATE_EMAIL_INPUT.value.trim();

		if (UPDATE_BIO) {
			const UPDATE_USER = {
				...USER,
				email: UPDATE_EMAIL,
				bio: UPDATE_BIO,
			};

			UserStateInstance.setUser(UPDATE_USER);
			alert('프로필이 업데이트되었습니다.');
		}
	});
}
