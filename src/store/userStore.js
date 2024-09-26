export default class UserStore {
  static #instance;
  #user = {};

  constructor(initialState = {}) {
    if (UserStore.#instance) {
      return UserStore.#instance;
    }

    if (initialState) {
      initialState = JSON.parse(localStorage.getItem('user'));
    }

    this.#user = initialState;
    UserStore.#instance = this;
  }

  clearState() {
    this.#user = {};
  }

  #notice(page) {
    page.render();
  }

  getUser() {
    return this.#user;
  }

  #setUser(user) {
    this.#user = user;
  }

  updateUser(user, page) {
    localStorage.setItem('user', JSON.stringify(user));
    this.#setUser(user);
    this.#notice(page);
  }
}