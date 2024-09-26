class LocalStorage {
  static instance;

  constructor() {
    if (LocalStorage.instance) {
      return LocalStorage.instance;
    }

    LocalStorage.instance = this;

    this.value = '';
  }

  set({ key, value }) {
    localStorage.setItem(key, value);
  }

  get(key) {
    this.value = JSON.parse(localStorage.getItem(key));

    return this.value;
  }

  clear() {
    localStorage.clear();
  }
}

const localStorageInstace = new LocalStorage();

export default localStorageInstace;
