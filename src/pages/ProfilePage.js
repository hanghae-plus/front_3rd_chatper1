import Component from '../base/Component';
import { Header, Footer } from '../components';
import userStore from '../store/user';

class ProfilePage extends Component {
	constructor(element) {
		super(element);
		userStore.subscribe(() => this.render());
	}

	mounted() {
		const $header = this.$target.querySelector('#header');
		const $footer = this.$target.querySelector('#footer');
		new Header($header);
		new Footer($footer);

		// 폼 제출 이벤트 핸들러 등록
		this.$target
			.querySelector('form')
			.addEventListener('submit', (e) => this.handleSubmit(e));
	}

	// 폼 제출 시 처리
	handleSubmit(e) {
		e.preventDefault(); // 페이지 새로고침 방지

		// 폼 필드 값 가져오기
		const username = this.$target.querySelector('#username').value;
		const email = this.$target.querySelector('#email').value;
		const bio = this.$target.querySelector('#bio').value;

		// 사용자 정보 업데이트
		userStore.updateUserInfo({
			username,
			email,
			bio,
		});
	}

	template() {
		const user = userStore.getUserInfo();

		return `
            <div class="bg-gray-100 min-h-screen flex justify-center">
            <div class="max-w-md w-full">
                <div id="header"></div>

                <main class="p-4">
                <div class="bg-white p-8 rounded-lg shadow-md">
                    <h2 class="text-2xl font-bold text-center text-blue-600 mb-8">
                    내 프로필
                    </h2>
                    <form id="profile-form">
                        <div class="mb-4">
                            <label
                            for="username"
                            class="block text-gray-700 text-sm font-bold mb-2"
                            >
                            사용자 이름
                            </label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value="${user ? user.username : ''}"
                                class="w-full p-2 border rounded"
                            />
                        </div>
                        <div class="mb-4">
                            <label
                            for="email"
                            class="block text-gray-700 text-sm font-bold mb-2"
                            >
                                이메일
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value="${user ? user.email : ''}"
                                class="w-full p-2 border rounded"
                            />
                        </div>
                        <div class="mb-6">
                            <label
                                for="bio"
                                class="block text-gray-700 text-sm font-bold mb-2"
                            >
                                자기소개
                            </label>
                            <textarea
                                id="bio"
                                name="bio"
                                rows="4"
                                class="w-full p-2 border rounded"
                            >${user ? user.bio : ''}</textarea>
                        </div>
                        <button
                            type="submit"
                            class="w-full bg-blue-600 text-white p-2 rounded font-bold"
                        >
                            프로필 업데이트
                        </button>
                    </form>
                </div>
                </main>

                <div id="footer"></div>
            </div>
            </div>
            `;
	}
}

export default ProfilePage;
