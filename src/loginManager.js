export default class LoginMannager {
	constructor() {
		this.userKey = "user";
		this.init();
	}

	init() {
		this.checkLoginStatus();
	}

	login(id, password) {
		const userData = {
			id,
			password,
			name: "User Name",
			bio: "This is a user bio.",
		};
		localStorage.setItem(this.userKey, JSON.stringify(userData));
		alert("Logged in successfully!");
	}

	logout() {
		localStorage.removeItem(this.userKey);
		alert("Logged out successfully!");
	}

	isLoggedIn() {
		return localStorage.getItem(this.userKey) !== null;
	}

	redirectToLogin() {
		if (!this.isLoggedIn()) {
			window.location.href = "/login";
		}
	}

	getUserInfo() {
		const userInfo = localStorage.getItem(this.userKey);
		return userInfo ? JSON.parse(userInfo) : null;
	}

	updateProfile(name, bio) {
		const userInfo = this.getUserInfo();
		if (userInfo) {
			userInfo.name = name;
			userInfo.bio = bio;
			localStorage.setItem(this.userKey, JSON.stringify(userInfo));
			alert("Profile updated successfully!");
		}
	}

	checkLoginStatus() {
		if (window.location.pathname === "/profile") {
			this.redirectToLogin();
			const userInfo = this.getUserInfo();
			if (userInfo) {
				document.querySelector("#profileName").textContent = userInfo.name;
				document.querySelector("#profileBio").textContent = userInfo.bio;
			}
		}
	}
}
