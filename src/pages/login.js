class LoginPage {
	constructor(loginManager, router) {
		this.loginManager = loginManager;
		this.container = document.getElementById('root');
		this.router = router;
	}
	template() {
		return `
            <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 class="text-2xl font-bold text-center text-blue-600 mb-8">항해플러스</h1>
                <form id="login-form">
                <div class="mb-4">
                    <input type="text" id="username" placeholder="이메일 또는 전화번호" class="w-full p-2 border rounded">
                </div>
                <div class="mb-6">
                    <input type="password" id="loginPassword" placeholder="비밀번호" class="w-full p-2 border rounded">
                </div>
                <button type="submit" class="w-full bg-blue-600 text-white p-2 rounded font-bold">로그인</button>
                </form>
                <div class="mt-4 text-center">
                <a href="#" class="text-blue-600 text-sm">비밀번호를 잊으셨나요?</a>
                </div>
                <hr class="my-6">
                <div class="text-center">
                <button id="createUserBtn" class="bg-green-500 text-white px-4 py-2 rounded font-bold">새 계정 만들기</button>
                <button id="logout" class="bg-green-500 text-white px-4 py-2 rounded font-bold">로그아웃</button>
                </div>
            </div>
    `;
	}

	render() {
		this.container.innerHTML = this.template();
		this.attachEventListeners();
	}

	attachEventListeners() {
		document.getElementById('login-form').addEventListener('submit', async (e) => {
			e.preventDefault();
			const username = document.getElementById('username').value;
			const password = document.getElementById('loginPassword').value;
			const loginResult = await this.loginManager.login(username, password);
			if (loginResult) {
				this.router.navigate('/profile');
			}
		});

		document.getElementById('createUserBtn').addEventListener('click', (e) => {
			e.preventDefault();
			const username = document.getElementById('username').value;
			const password = document.getElementById('loginPassword').value;
			this.loginManager.register(username, password);
		});
		document.getElementById('logout').addEventListener('click', (e) => {
			e.preventDefault();
			this.loginManager.logout();
		});
	}
}

export default LoginPage;
