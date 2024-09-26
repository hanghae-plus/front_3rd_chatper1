export const userStore = () => {
  const getUser = () => JSON.parse(localStorage.getItem("user")) || null;

  const setUser = (user) => {
    const isInvalidUser = !user || typeof user !== "object";
    if (isInvalidUser) {
      throw new Error("Invalid user object");
    }

    localStorage.setItem("user", JSON.stringify(user));
  };

  const removeUser = () => {
    localStorage.removeItem("user");
  };

  const isLoggedIn = () => !!getUser();

  return { getUser, setUser, removeUser, isLoggedIn };
};
