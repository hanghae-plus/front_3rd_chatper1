export function userStore() {
  let userInfo = localStorage.getItem("user") || null;

  return {
    getUser: function () {
      return userInfo;
    },
    setUser: function (_userInfo) {
      localStorage.setItem("user", JSON.stringify(_userInfo));
      userInfo = _userInfo;
    },
    deleteUser: function () {
      userInfo = null;
      localStorage.removeItem("user");
    },
  };
}
