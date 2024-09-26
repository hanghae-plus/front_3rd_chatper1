class UserManager {
  constructor() {
    this.userKey = 'user';
    this.userData = this.loadUserData();
  }

  loadUserData() {
    const storedUser = localStorage.getItem(this.userKey);
    return storedUser ? JSON.parse(storedUser) : null;
  }

  saveUserData(user) {
    this.userData = user;
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  isLoggedIn() {
    return this.userData !== null;
  }

  login(username) {
    if (!username) {
      throw new Error('아이디를 입력하세요.');
    }

    const user = {
      username: username,
      email: '',
      bio: '',
    };

    this.saveUserData(user);
    this.userData = this.loadUserData();
  }

  logout() {
    this.userData = null;
    localStorage.removeItem(this.userKey);
  }

  getUserInfo() {
    return this.userData;
  }
}
export default new UserManager();
