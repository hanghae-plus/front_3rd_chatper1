export const getUser = () => {
  return localStorage.getItem("user");
};

export const setUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};
