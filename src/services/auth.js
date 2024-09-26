const state = {
  user: null,
  isLoggedIn: false,
};

export function setState(newState) {
  Object.assign(state, newState);
}

export function getState() {
  return state;
}

export function saveUserData(user) {
  setState({ user, isLoggedIn: true });
  localStorage.setItem('user', JSON.stringify(user));
  localStorage.setItem('isLoggedIn', 'true');
}

export function getUserData() {
  return state.user || JSON.parse(localStorage.getItem('user'));
}

export function clearUserData() {
  setState({ user: null, isLoggedIn: false });
  localStorage.removeItem('user');
  localStorage.removeItem('isLoggedIn');
}

export function setLoginStatus(isLoggedIn) {
  setState({ isLoggedIn });
  localStorage.setItem('isLoggedIn', isLoggedIn ? 'true' : 'false');
}

export function getLoginStatus() {
  return state.isLoggedIn || localStorage.getItem('isLoggedIn') === 'true';
}
