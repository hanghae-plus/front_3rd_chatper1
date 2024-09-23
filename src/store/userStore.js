function createUser() {
  const storageCount = localStorage.getItem("user");
  let user = storageCount ? storageCount : null;

  return {
    login: function (user) {
      user = user;
      localStorage.setItem("user", JSON.stringify(user));
    },
    logout: function () {
      user = null;
      localStorage.removeItem("user");
    },
    setUser: function (user) {
      user = user;
      localStorage.setItem("user", user);
    },
    getUser: function () {
      return user;
    },
  };
}

export const { getUser, setUser, login, logout } = createUser();
