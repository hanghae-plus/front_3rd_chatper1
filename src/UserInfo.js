import { STORAGE_NAME, STOREAGE_KEYS } from "./constants";

export default class UserInfo {
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
