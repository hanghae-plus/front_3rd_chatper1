// auth.js
export const isAuthenticated = () => {
  // 로컬 스토리지에서 사용자 정보를 가져와 로그인 여부 확인
  return !!JSON.parse(localStorage.getItem("user"));
};

export const setUserInfo = (user) => {
  // 로컬 스토리지에 사용자 정보 저장 (로그인 처리)
  localStorage.setItem("user", JSON.stringify(user));
};

export const logout = () => {
  // 로컬 스토리지에서 사용자 정보 삭제 (로그아웃 처리)
  localStorage.removeItem("user");
};
