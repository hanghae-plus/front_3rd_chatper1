// 사용자 정보 조회
export const getUserInfo = () => {
  return JSON.parse(localStorage.getItem("user"));
};

// 로컬 스토리지에서 사용자 정보를 가져와 로그인 여부 확인
export const isAuthenticated = () => {
  return !!getUserInfo();
};

// 로컬 스토리지에 사용자 정보 저장 (로그인 처리)
export const setUserInfo = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

// 로컬 스토리지에서 사용자 정보 삭제 (로그아웃 처리)
export const logout = () => {
  localStorage.removeItem("user");
};
