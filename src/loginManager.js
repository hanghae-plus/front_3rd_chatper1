// export default class LoginMannager {
// 	constructor() {
// 		this.userKey = '__current_user__';
// 	}
// 	register(username, password) {
// 		const userData = {
// 			username,
// 			password,
// 			email: '',
// 			bio: '',
// 		};
// 		localStorage.setItem(username, JSON.stringify(userData));
// 		alert('Registration successful!');
// 	}

// 	login(username, password) {
// 		console.log(username, password);
// 		const userInfo = this.getUserInfo(username);
// 		if (userInfo && userInfo.username === username) {
// 			localStorage.setItem(this.userKey, username);
// 			alert('Logged in successfully!');
// 			return true;
// 		} else {
// 			alert('Invalid credentials!');
// 			return false;
// 		}
// 	}

// 	logout() {
// 		localStorage.removeItem(this.userKey);
// 		alert('Logged out successfully!');
// 	}

// 	isLoggedIn() {
// 		return localStorage.getItem(this.userKey) !== null;
// 	}

// 	getUserInfo(username) {
// 		const userInfo = localStorage.getItem(username);
// 		return userInfo ? JSON.parse(userInfo) : null;
// 	}

// 	getCurrentUserInfo() {
// 		const currentUserId = localStorage.getItem(this.userKey);
// 		if (!currentUserId) return null;

// 		const userInfo = localStorage.getItem(currentUserId);
// 		if (!userInfo) {
// 			return null;
// 		}

// 		const parsedUserInfo = JSON.parse(userInfo);
// 		delete parsedUserInfo.password;
// 		return parsedUserInfo;
// 	}

// 	updateProfile(email, name, bio) {
// 		const currentUserId = localStorage.getItem(this.userKey);
// 		if (!currentUserId) return null;

// 		const userInfo = localStorage.getItem(currentUserId);
// 		if (!userInfo) {
// 			return null;
// 		}

// 		const parsedUserInfo = JSON.parse(userInfo);

// 		parsedUserInfo.username = name;
// 		parsedUserInfo.bio = bio;
// 		parsedUserInfo.email = email;
// 		localStorage.setItem(currentUserId, JSON.stringify(parsedUserInfo));
// 		alert('Profile updated successfully!');
// 	}
// }
export default class LoginMannager {
	constructor() {
		this.userKey = 'user';
	}
	register(username, password) {
		const userData = {
			username,
			email: '',
			bio: '',
		};

		localStorage.setItem(this.userKey, JSON.stringify(userData));
		// alert('Registration successful!');
	}

	login(username, password) {
		this.register(username);
		const userInfo = this.getUserInfo();

		if (userInfo && userInfo.username === username) {
			// alert('Logged in successfully!');
			return true;
		} else {
			// alert('Invalid credentials!');
			return false;
		}
	}

	logout() {
		localStorage.removeItem(this.userKey);
		// alert('Logged out successfully!');
	}

	isLoggedIn() {
		return localStorage.getItem(this.userKey) !== null;
	}

	getUserInfo() {
		const userInfo = localStorage.getItem(this.userKey);
		return userInfo ? JSON.parse(userInfo) : null;
	}

	updateProfile(email, name, bio) {
		const userInfo = this.getUserInfo();

		userInfo.username = name;
		userInfo.bio = bio;
		userInfo.email = email;
		localStorage.setItem(this.userKey, JSON.stringify(userInfo));
		// alert('Profile updated successfully!');
	}
}
