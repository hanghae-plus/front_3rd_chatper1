function createUser() {
  const storageCount = localStorage.getItem("user");
  let user = storageCount ? storageCount : null; // 프라이빗 변수

  return {
    login: function ({ name }) {
      user = { name, email: "", desc: "" };
      localStorage.setItem("user", user);
    },
    logout: function () {
      localStorage.removeItem("user");
      user = null;
    },
    setUser: function (user) {
      localStorage.setItem("user", user);
      user = user;
    },
    getUser: function () {
      return user;
    },
  };
}

export const { getUser, setUser, login, logout } = createUser();
