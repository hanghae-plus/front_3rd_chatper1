const USER = "user";

export default class UserStore {
  constructor() {
    if (UserStore.instance) {
      return UserStore.instance;
    }
    UserStore.instance = this;
    this.state = JSON.parse(localStorage.getItem(USER));
  }

  setState(newState) {
    if (newState === null) {
      localStorage.removeItem(USER);
    } else {
      localStorage.setItem(USER, JSON.stringify(newState));
    }
    this.state = newState;
  }

  getState() {
    return this.state;
  }
}
