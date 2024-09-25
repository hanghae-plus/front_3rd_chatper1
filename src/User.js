class User {
  constructor() {
    // 초기 상태: localStorage에서 사용자 정보 로드
    this.user = JSON.parse(localStorage.getItem('user')) || null;
  }

  // 로그인한 사용자의 정보를 저장하는 메서드
  login(userInfo) {
    this.user = userInfo;
    localStorage.setItem('user', JSON.stringify(this.user));
  }

  // 로그아웃 시 사용자 정보를 삭제하는 메서드
  logout() {
    this.user = null;
    localStorage.removeItem('user');
  }

  // 로그인 여부를 확인하는 메서드
  isLoggedIn() {
    return this.user !== null;
  }

  // 사용자 정보를 반환하는 메서드
  getUser() {
    return this.user;
  }

  // 사용자 정보를 업데이트하고 localStorage에 저장하는 메서드
  setUserData(updatedUser) {
    this.user = updatedUser;
    localStorage.setItem('user', JSON.stringify(this.user));
  }
}

export default new User();
