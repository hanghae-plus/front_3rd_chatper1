// 사용자 데이터를 저장하는 함수
export function saveUserData(user) {
  localStorage.setItem('user', JSON.stringify(user));
}

// 사용자 데이터를 불러오는 함수
export function getUserData() {
  const userData = localStorage.getItem('user');
  return userData ? JSON.parse(userData) : null;
}

// 사용자 데이터를 지우는 함수 (로그아웃 처리)
export function clearUserData() {
  localStorage.removeItem('user'); // 사용자 데이터 삭제
  localStorage.removeItem('isLoggedIn'); // 로그인 상태 삭제
}

// 로그인 상태를 저장하는 함수
export function setLoginStatus(isLoggedIn) {
  localStorage.setItem('isLoggedIn', isLoggedIn);
}

// 로그인 상태를 확인하는 함수
export function getLoginStatus() {
  return localStorage.getItem('isLoggedIn') === 'true';
}
