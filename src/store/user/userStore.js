export const getUser = () => {
  const userData = localStorage.getItem("user");
  return JSON.parse(userData);
};

export const setUser = ({ username, email = "", bio = "" }) => {
  const userData = { username, email, bio };
  localStorage.setItem("user", JSON.stringify(userData));
};

export const removeUser = () => {
  return localStorage.removeItem("user");
};
