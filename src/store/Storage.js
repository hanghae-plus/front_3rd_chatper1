class UserState {
	constructor() {
		this.user = JSON.parse(localStorage.getItem('user')) || null;
	}

	// 사용자 정보를 설정하고 저장
	setUser(userInfo) {
		this.user = userInfo;
		this.save();
	}

	// 사용자 정보를 가져옴
	getUser() {
		return this.user;
	}

	// 사용자가 로그인했는지 확인
	isLoggedIn() {
		return !!this.user;
	}

	// 로그아웃 처리
	logout() {
		this.user = null;
		this.save();
	}

	// 상태를 localStorage에 저장
	save() {
		if (this.user) {
			localStorage.setItem('user', JSON.stringify(this.user));
		} else {
			localStorage.removeItem('user');
		}
	}
}

export const UserStateInstance = new UserState();
