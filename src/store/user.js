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
	login(user) {
		// 사용자 정보를 상태에 저장하고 localStorage에 저장
		this.setState({ isLoggedIn: true, user });
		localStorage.setItem('loggedInUser', JSON.stringify(user)); // localStorage에 저장
	}

	// 로그아웃 처리
	logout() {
		// 상태 초기화 및 localStorage에서 정보 삭제
		this.setState({ isLoggedIn: false, user: null });
		localStorage.removeItem('loggedInUser');
	}

	// 로그인 상태 가져오기
	getLoginStatus() {
		return this.state.isLoggedIn;
	}

	// 사용자 정보 가져오기
	getUserInfo() {
		return this.state.user;
	}
}

const userStore = new UserStore();
export default userStore;
