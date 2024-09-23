export default class UserPreferences {
  constructor() {
    this.preferences =
      JSON.parse(localStorage.getItem('userPreferences')) || {};
  }

  set(key, value) {
    this.preferences[key] = value;
    this.save();
  }

  get(key) {
    return this.preferences[key];
  }

  save() {
    localStorage.setItem('userPreferences', JSON.stringify(this.preferences));
  }
}
