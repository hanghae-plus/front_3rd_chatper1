import { BIO, EMAIL, USERNAME } from "../constants";
import UserInfo from "../UserInfo";

const userInfo = new UserInfo();

class Store {
  constructor(initialState) {
    this.state = initialState;
    this.listeners = new Set();
  }

  getState() {
    return this.state;
  }

  setState(newState) {
    this.state = {
      ...this.state,
      ...newState,
    };

    const newStateKeys = Object.keys(newState);
    if (newStateKeys.length === 0) {
      this.state = {
        [USERNAME]: "",
        [EMAIL]: "",
        [BIO]: "",
      };
    } else {
      newStateKeys.forEach((key) => {
        userInfo.set(key, newState[key]);
      });
    }
    this.listeners.forEach((listener) => listener.render());
  }

  clear() {
    userInfo.clear();
    this.setState({});

    this.listeners.forEach((listener) => listener.render());
  }

  subscribe(listener) {
    this.listeners.add(listener);
  }
}

const initialState = () => ({
  username: userInfo.get(USERNAME) || "",
  email: userInfo.get(EMAIL) || "",
  bio: userInfo.get(BIO) || "",
});

const userStore = new Store(initialState());

export default userStore;
