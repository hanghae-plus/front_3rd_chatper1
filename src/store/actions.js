const LOGIN = "auth/LOGIN";
const LOGOUT = "auth/LOGOUT";
const SET_USER = "user/SET_USER";

const setUser = ({ username = "", email = "", bio = "" }) => {
  return { type: SET_USER, payload: { username, email, bio } };
};
const login = (username) => {
  return { type: LOGIN, payload: username };
};
const logout = () => {
  return { type: LOGOUT };
};

export { LOGIN, LOGOUT, SET_USER, setUser, login, logout };
