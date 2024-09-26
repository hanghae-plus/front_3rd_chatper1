export default class Header {
	constructor(loginManager, router) {
		this.loginManager = loginManager;
		this.router = router;
	}

	template() {
		return `
        <header class="bg-blue-600 text-white p-4 sticky top-0">
            <h1 class="text-2xl font-bold">항해플러스</h1>
        </header>
        <nav class="bg-white shadow-md p-2 sticky top-14">
            <ul class="flex justify-around">
            <li><a href="./main.html" class="text-blue-600 font-bold" data-link>홈</a></li>
            <li><a href="./profile.html" class="text-gray-600" data-link>프로필</a></li>
            ${!this.loginManager.isLoggedIn() ? '<li><a href="/login" class="text-gray-600 data-link">로그인</a></li>' : '<li><a href="#" id="logout" class="text-gray-600">로그아웃</a></li>'}
            </ul>
        </nav>`;
	}

	attachEventListener() {
		document.getElementById('logout') &&
			document.getElementById('logout').addEventListener('click', (e) => {
				e.preventDefault();
				this.loginManager.logout();
				this.router.refresh();
			});
	}
}
