const STORAGE_KEYS = ['username', 'email', 'bio'];

const UserInfo = (() => {
  let user = JSON.parse(localStorage.getItem('user')) || {
    username: '',
    email: '',
    bio: '',
  };

  const save = () => {
    localStorage.setItem('user', JSON.stringify(user));
  };

  return {
    get(key) {
      if (!STORAGE_KEYS.includes(key)) {
        return;
      }
      return user[key];
    },
    set(key, value) {
      if (!STORAGE_KEYS.includes(key)) {
        return;
      }
      user[key] = value;
      save();
    },
    clear() {
      user = { username: '', email: '', bio: '' };
      localStorage.removeItem('user');
    },
  };
})();

export default UserInfo;
