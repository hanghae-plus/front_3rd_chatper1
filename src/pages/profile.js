import Footer from '../components/Footer';
import Header from '../components/Header';
export default class ProfilePage {
	constructor(loginManager, router) {
		this.loginManager = loginManager;
		this.container = document.getElementById('root');
		this.router = router;
		this.state = { username: '', email: '', bio: '', id: '' };
		this.header = new Header(loginManager);
		this.footer = Footer();
	}
	template() {
		return `
        <div class="bg-gray-100 min-h-screen flex justify-center">
            <div class="max-w-md w-full">
                ${this.header.template()}
                <main class="p-4">
                    <div class="bg-white p-8 rounded-lg shadow-md">
                    <h2 class="text-2xl font-bold text-center text-blue-600 mb-8">내 프로필</h2>
                    <form id="profile-form">
                        <div class="mb-4">
                        <label for="username" class="block text-gray-700 text-sm font-bold mb-2">사용자 이름</label>
                        <input type="text" id="username" name="username" value="${this.state.username}" class="w-full p-2 border rounded">
                        </div>
                        <div class="mb-4">
                        <label for="email" class="block text-gray-700 text-sm font-bold mb-2">이메일</label>
                        <input type="email" id="email" name="email" value="${this.state.email}" class="w-full p-2 border rounded">
                        </div>
                        <div class="mb-6">
                        <label for="bio" class="block text-gray-700 text-sm font-bold mb-2">자기소개</label>
                        <textarea id="bio" name="bio" rows="4" class="w-full p-2 border rounded">${this.state.bio}</textarea>
                        </div>
                        <button type="submit" class="w-full bg-blue-600 text-white p-2 rounded font-bold">프로필 업데이트</button>
                    </form>
                    </div>
                </main>
                ${this.footer}
            </div>
        </div>
            `;
	}
	setState() {
		const newState = this.loginManager.getUserInfo();

		this.state = { ...this.state, ...newState };
	}
	render() {
		if (!this.loginManager.isLoggedIn()) {
			this.router.navigate('/login');
			return;
		}

		this.setState();

		this.header = new Header(this.loginManager);
		this.container.innerHTML = this.template();
		this.attachEventListeners();
	}

	attachEventListeners() {
		document.getElementById('profile-form').addEventListener('submit', (e) => {
			e.preventDefault();
			const name = document.getElementById('username').value;
			const email = document.getElementById('email').value;
			const bio = document.getElementById('bio').value;
			this.loginManager.updateProfile(email, name, bio);
			this.render();
		});
	}
}
