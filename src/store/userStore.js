function createUser() {
  let userInfo = localStorage.getItem("user") || null;

  return {
    getUser: function () {
      return JSON.parse(userInfo);
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

export const { getUser, setUser, deleteUser } = createUser();
