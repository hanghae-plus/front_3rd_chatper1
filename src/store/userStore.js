import {
  BIO,
  EMAIL,
  USERNAME,
  STORAGE_NAME,
  STOREAGE_KEYS,
} from "../constants";

class UserInfo {
  constructor() {
    this.user = JSON.parse(localStorage.getItem(STORAGE_NAME)) || {
      username: "",
      email: "",
      bio: "",
    };
  }

  get(key) {
    if (!STOREAGE_KEYS.includes(key)) {
      alert("그런 key따위 없음 ㅋ");
      return;
    }
    return this.user[key];
  }

  set(key, value) {
    if (!STOREAGE_KEYS.includes(key)) {
      alert("그딴 key 취급 안함 ㅋ");
      return;
    }
    this.user[key] = value;

    this.save();
  }

  clear() {
    localStorage.removeItem(STORAGE_NAME);
  }

  save() {
    localStorage.setItem(STORAGE_NAME, JSON.stringify(this.user));
  }
}

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
