import Footer from '../components/Footer';
import Header from '../components/Header';
import { loginStore, NAVIGATION_PAGE, root } from '../main';
import Router from '../Router';
import { Observer } from '../Store';
import { clearInLocalStorage, LOCAL_STORAGE_KEYS, saveInLocalStorage } from '../utils/StorageUtils';

class ProfilePage extends Observer {
	update(data) {
		this.isLoggedIn = data.isLoggedIn;
	}

	render() {
		root.innerHTML = this.template();

		loginStore.addObserver(this);

		if (!loginStore.getState().isLoggedIn) {
			new Router().navigateTo(NAVIGATION_PAGE.login.path);
			return;
		}

		this.setEvents();
	}

	setEvents() {
		const usernameInputElement = document.querySelector('#username');
		usernameInputElement.value = loginStore.getState().username;

		const emailInputElement = document.querySelector('#email');
		emailInputElement.value = loginStore.getState().email;

		const bioElement = document.querySelector('#bio');
		bioElement.value = loginStore.getState().bio;

		const profileForm = document.getElementById('profile-form');
		profileForm.addEventListener('submit', (event) => {
			event.preventDefault();

			const user = {
				username: usernameInputElement.value,
				email: emailInputElement.value,
				bio: bioElement.value,
			};
			loginStore.setState({ isLoggedIn: true, user });

			saveInLocalStorage(LOCAL_STORAGE_KEYS.USER, user);
		});

		const logoutButton = document.querySelector('#logout');
		logoutButton?.addEventListener('click', (event) => {
			event.preventDefault();

			clearInLocalStorage(LOCAL_STORAGE_KEYS.USER);
			loginStore.setState({ isLoggedIn: false });
			new Router().navigateTo(logoutButton.getAttribute('href'));
		});
	}

	template() {
		return `
      ${new Header().template()}
      <main class="p-4">
        <div class="bg-white p-8 rounded-lg shadow-md">
          <h2 class="text-2xl font-bold text-center text-blue-600 mb-8">내 프로필</h2>
          <form id="profile-form">
            <div class="mb-4">
              <label for="username" class="block text-gray-700 text-sm font-bold mb-2">사용자 이름</label>
              <input type="text" id="username" name="username" value="홍길동" class="w-full p-2 border rounded">
            </div>
            <div class="mb-4">
              <label for="email" class="block text-gray-700 text-sm font-bold mb-2">이메일</label>
              <input type="email" id="email" name="email" value="hong@example.com" class="w-full p-2 border rounded">
            </div>
            <div class="mb-6">
              <label for="bio" class="block text-gray-700 text-sm font-bold mb-2">자기소개</label>
              <textarea id="bio" name="bio" rows="4" class="w-full p-2 border rounded">안녕하세요, 항해플러스에서 열심히 공부하고 있는 홍길동입니다.</textarea>
            </div>
            <button type="submit" class="w-full bg-blue-600 text-white p-2 rounded font-bold">프로필 업데이트</button>
          </form>
        </div>
      </main>
      ${new Footer().template()}
`;
	}
}

export default new ProfilePage();
