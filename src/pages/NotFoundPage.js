import Component from '../base/Component';

class NotFoundPage extends Component {
	constructor(element) {
		super(element);
	}

	mounted() {
		const homeLink = this.$target.querySelector('a.home-link');
		homeLink.addEventListener('click', (event) => {
			event.preventDefault(); // 기본 링크 동작(페이지 리로드)을 막음
			const url = homeLink.getAttribute('href');
			Router.navigateTo(url); // Router의 navigateTo로 경로 이동 처리
		});
	}

	template() {
		return `
        <main class="bg-gray-100 flex items-center justify-center min-h-screen">
            <div
                class="bg-white p-8 rounded-lg shadow-md w-full text-center"
                style="max-width: 480px"
            >
                <h1 class="text-2xl font-bold text-blue-600 mb-4">항해플러스</h1>
                <p class="text-4xl font-bold text-gray-800 mb-4">404</p>
                <p class="text-xl text-gray-600 mb-8">페이지를 찾을 수 없습니다</p>
                <p class="text-gray-600 mb-8">
                    요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
                </p>
                <a
                    href="/"
                    class="home-link bg-blue-600 text-white px-4 py-2 rounded font-bold"
                >
                    홈으로 돌아가기
                </a>
            </div>
        </main>
        `;
	}
}

export default NotFoundPage;
