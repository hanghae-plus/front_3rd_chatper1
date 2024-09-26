import Component from '../base/Component';
import Router from '../base/Router';

class Header extends Component {
	constructor(element) {
		super(element);
	}

	template() {
		return `
			<header class="bg-blue-600 text-white p-4 sticky top-0">
				<h1 class="text-2xl font-bold">항해플러스</h1>
			</header>

			<nav class="bg-white shadow-md p-2 sticky top-14">
				<ul class="flex justify-around">
					<li><a href="/" class="text-blue-600">홈</a></li>
					<li><a href="/profile" class="text-gray-600">프로필</a></li>
					<li><a href="/login" class="text-gray-600">로그인</a></li>
				</ul>
			</nav>
		`;
	}

	mounted() {
		// 모든 링크에 대해 클릭 이벤트를 바인딩
		const links = this.$target.querySelectorAll('nav a');
		links.forEach((link) => {
			link.addEventListener('click', (event) => {
				event.preventDefault();
				const url = link.getAttribute('href');
				Router.navigateTo(url); // Router 로 경로 이동
			});
		});
	}
}

export default Header;
