export const useAuth = () => {
  const isLoggedIn = () => {
    const user = localStorage.getItem('user');
    if (!user) return false;
    return true;
  };

  const login = (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    localStorage.setItem('user', JSON.stringify({ username, email: '', bio: '' }));
  };

  const logout = () => {
    localStorage.removeItem('user');
  };

  return { isLoggedIn, login, logout };
};
