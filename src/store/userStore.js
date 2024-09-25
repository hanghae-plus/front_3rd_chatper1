import router from '../router.js';

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

  clear() {
    this.#user = {};
  }

  #notice() {
    router.router();
  }

  getUser() {
    return this.#user;
  }

  #setUser(user) {
    this.#user = user;
  }

  updateUser(user) {
    this.#setUser(user);
    this.#notice();
  }
}