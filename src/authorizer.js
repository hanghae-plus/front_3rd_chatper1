export default class Authorizer {
  static #instance = null;
  isLogin = false;

  constructor() {
    if (Authorizer.#instance) {
      return Authorizer.#instance;
    }
    Authorizer.#instance = this;
  }

  login() {
    this.isLogin = true;
  }

  logout() {
    this.isLogin = false;
  }
}