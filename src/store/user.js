import Store from '../base/Store';

class UserStore extends Store {
	constructor() {
		super();

		// 초기 로그인 상태를 localStorage에서 불러옴
		const savedUser = localStorage.getItem('user');
		this.state = {
			isLoggedIn: !!savedUser, // 저장된 사용자가 있으면 true
			user: savedUser ? JSON.parse(savedUser) : null, // 저장된 사용자 정보
		};
	}

	// 로그인 처리
	login(username) {
		// 사용자 정보를 상태에 저장하고 localStorage에 저장

		let user = this.state.user
			? {
					...this.state.user,
					username: username,
				}
			: {
					username: username,
					email: '',
					bio: '',
				};

		this.setState({ isLoggedIn: true, user });
		localStorage.setItem('user', JSON.stringify(user)); // localStorage에 저장
	}

	// 로그아웃 처리
	logout() {
		// 상태 초기화 및 localStorage에서 정보 삭제
		this.setState({ isLoggedIn: false, user: null });
		localStorage.removeItem('user');
	}

	// 로그인 상태 가져오기
	getLoginStatus() {
		return this.state.isLoggedIn;
	}

	// 사용자 정보 가져오기
	getUserInfo() {
		return this.state.user;
	}

	// 사용자 프로필 수정
	updateUserInfo(userInfo) {
		const user = { ...this.state.user, ...userInfo };

		this.setState({ ...this.state, user });
		localStorage.setItem('user', JSON.stringify(user));
	}
}

const userStore = new UserStore();
export default userStore;
