// 로컬 스토리지에서 사용자 정보를 가져와 로그인 여부 확인
export const isAuthenticated = () => {
  return !!localStorage.getItem("isLoggedIn");
};

export const login = () => {
  localStorage.setItem("isLoggedIn", true);
};

// 로컬 스토리지에서 사용자 정보 삭제 (로그아웃 처리)
export const logout = () => {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("user");
};
