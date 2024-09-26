import Storage from './Storage'

export const SessionManager = () => {
  const SessionManager = {
    isLogin: false,
    userInfo: null,
  };

  const getIsLogined = () => SessionManager.isLogin;

  const getUserInfo = () => SessionManager.userInfo;

  const setUserInfo = (newUserInfo) => {
    SessionManager.userInfo = { ...newUserInfo };
    Storage.saveData("user", newUserInfo);
  };

  const loginState = (userInfo) => {
    SessionManager.isLogin = true;
    SessionManager.userInfo = { ...userInfo };
    Storage.saveData("user", userInfo);
  };

  const logoutState = () => {
    Storage.clearData("user");
    SessionManager.isLogin = false;
    SessionManager.userInfo = null;
  };

  return { getIsLogined, getUserInfo, setUserInfo, loginState, logoutState };
};

export default SessionManager;
