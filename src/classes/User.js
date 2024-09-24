export class User {
  constructor() {
    this.preferences = JSON.parse(localStorage.getItem("user")) || {};
  }

  set(key, value) {
    this.preferences[key] = value;
    this.save();
  }

  get(key) {
    return this.preferences[key];
  }

  save() {
    localStorage.setItem("user", JSON.stringify(this.preferences));
  }

  clear() {
    this.preferences = {};
    localStorage.removeItem("user");
  }
}
