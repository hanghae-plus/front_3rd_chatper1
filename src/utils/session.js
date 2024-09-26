import Storage from "./storage.js";

export const session = () => {
  const session = {
    isLogin: false,
    userInfo: null,
  };

  const getIsLogined = () => session.isLogin;

  const getUserInfo = () => session.userInfo;

  const setUserInfo = (newUserInfo) => {
    session.userInfo = { ...newUserInfo };
    Storage.saveData("user", newUserInfo);
  };

  const loginState = (userInfo) => {
    session.isLogin = true;
    session.userInfo = { ...userInfo };
    Storage.saveData("user", userInfo);
  };

  const logoutState = () => {
    Storage.clearData("user");
    session.isLogin = false;
    session.userInfo = null;
  };

  return { getIsLogined, getUserInfo, setUserInfo, loginState, logoutState };
};

export default session;
