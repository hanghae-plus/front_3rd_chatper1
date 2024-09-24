// 로그인 store 용도 클래스 생성
class login {
  constructor() {
    // 스토리지에 저장된 유저 정보가 있는지 확인 후 초기 값 설정
    const savedUser = JSON.parse(localStorage.getItem("user")) || {
      username: "",
      email: "",
      bio: "",
    };

    this.state = {
      user: {
        isLogin: !!savedUser.username, // username이 있으면 로그인 상태
        data: savedUser.username ? savedUser : null,
      },
    };
  }

  // 로그인 상태
  getIsLogin() {
    return this.state.user.isLogin;
  }

  // 유저 정보 반환
  getUserData() {
    return this.state.user.data;
  }

  // 유저 프로필 업데이트
  updateUserData(userData) {
    // 로그인 된 경우만 업데이트 가능
    if (this.state.user.isLogin) {
      this.state.user.data = {
        ...this.state.user.data,
        ...userData,
      };
      // localStorage에 업데이트된 유저 정보 저장
      localStorage.setItem("user", JSON.stringify(this.state.user.data));
    }
  }

  // 로그인
  userLogin(userData) {
    this.state.user = {
      isLogin: true,
      data: userData,
    };

    localStorage.setItem("user", JSON.stringify(userData));
  }

  // 로그아웃
  userLogout() {
    this.state.user = {
      isLogin: false,
      data: null,
    };
    localStorage.removeItem("user");
  }
}
const authStore = new login();

export default authStore;
