export default class UserData {
  static #userData = {
    isLogin: false,
    user: null,
  };

  static setUserData(newUserData) {
    this.#userData = { ...this.#userData, ...newUserData };
  }

  static getUserData() {
    return this.#userData;
  }
}
