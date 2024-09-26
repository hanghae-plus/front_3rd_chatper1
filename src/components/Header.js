import Component from '../base/Component';
import Router from '../base/Router';
import userStore from '../store/user';

class Header extends Component {
	constructor(element) {
		super(element);
		userStore.subscribe(() => this.render());
	}

	mounted() {
		// 모든 링크에 대해 클릭 이벤트를 바인딩
		const links = this.$target.querySelectorAll('nav a');
		links.forEach(this.handleClickLink);

		const logoutBtn = this.$target.querySelector('#logout');
		if (logoutBtn) {
			logoutBtn.addEventListener('click', this.handleLogout);
		}
	}

	handleClickLink(link) {
		link.addEventListener('click', (event) => {
			event.preventDefault();
			const url = link.getAttribute('href');
			Router.navigateTo(url); // Router 로 경로 이동
		});
	}

	handleLogout() {
		userStore.logout();
		Router.navigateTo('/'); // Router 로 경로 이동
	}

	template() {
		const isLoggedIn = userStore.getLoginStatus();

		return `
			<header class="bg-blue-600 text-white p-4 sticky top-0">
				<h1 class="text-2xl font-bold">항해플러스</h1>
			</header>

			<nav class="bg-white shadow-md p-2 sticky top-14">
				<ul class="flex justify-around">
					<li><a href="/" class="text-blue-600">홈</a></li>
					<li><a href="/profile" class="text-gray-600">프로필</a></li>
					<li>${isLoggedIn ? '<button id="logout" class="text-gray-600">로그아웃</button>' : '<a href="/login" class="text-gray-600">로그인</a>'}</li>
				</ul>
			</nav>
		`;
	}
}

export default Header;
