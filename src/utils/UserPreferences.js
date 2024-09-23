export default class UserPreferences {
  constructor() {
    if (!UserPreferences.instance) {
      this.preferences =
        JSON.parse(localStorage.getItem("userPreferences")) || {};
      UserPreferences.instance = this;
    }
    return UserPreferences.instance;
  }

  set(key, value) {
    this.preferences[key] = value;
    this.save();
  }

  get(key) {
    return this.preferences[key];
  }

  save() {
    localStorage.setItem("userPreferences", JSON.stringify(this.preferences));
  }
}
