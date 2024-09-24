class User {
  #user;

  constructor() {
    this.#user = JSON.parse(localStorage.getItem('user'));
  }

  setUser(user) {
    this.#user = user;
    localStorage.setItem('user', JSON.stringify(user));
  }
  getUser() {
    return this.#user;
  }
  removeUser() {
    this.#user = null;
    localStorage.removeItem('user');
  }
  isLogin() {
    return this.#user !== null;
  }
}

export const user = new User();
