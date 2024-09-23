const USER_KEY = 'user';

export const login = (userData) => {
  localStorage.setItem(USER_KEY, JSON.stringify(userData));
};

export const logout = () => {
  localStorage.removeItem(USER_KEY);
};
