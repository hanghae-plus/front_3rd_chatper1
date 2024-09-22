const listeners = new Set();

export const useUserStore = {
  login(username) {
    localStorage.setItem(
      'user',
      JSON.stringify({ username, email: '', bio: '' })
    );
    this.notifyListeners();
  },

  logout() {
    localStorage.removeItem('user');
    this.notifyListeners();
  },

  isLoggedIn() {
    return localStorage.getItem('user') !== null;
  },

  getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  updateUser(updatedUser) {
    const currentUser = this.getUser();
    const newUser = { ...currentUser, ...updatedUser };
    localStorage.setItem('user', JSON.stringify(newUser));
    this.notifyListeners();
  },

  subscribe(listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },

  notifyListeners() {
    listeners.forEach((listener) => listener());
  },
};
