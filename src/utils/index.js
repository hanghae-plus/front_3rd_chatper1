import { PERMISSION, STORAGE_KEY } from "../constants";

export class StorageController {
  constructor(key) {
    this.storage = localStorage;
    this.key = key;
  }

  get() {
    return this.storage.getItem(this.key);
  }

  getParsed() {
    const item = this.get();
    return item ? JSON.parse(item) : null;
  }

  set(value) {
    this.storage.setItem(this.key, JSON.stringify(value));
  }

  remove() {
    this.storage.removeItem(this.key);
  }
}

export class UserController {
  constructor() {
    this.userStorage = new StorageController(STORAGE_KEY.USER);
    this.user = this.userStorage.getParsed();
  }

  login(data, callback) {
    this._updateUser(data, callback);
  }

  update(data, callback) {
    this._updateUser(data, callback);
  }

  logout(callback) {
    this.userStorage.remove();
    this.user = null;
    callback();
  }

  getUser() {
    return this.user;
  }

  status() {
    return this.getUser() ? PERMISSION.AUTH.key : PERMISSION.PUBLIC.key;
  }

  _updateUser(data, callback) {
    this.userStorage.set(data);
    this.user = data;
    callback();
  }
}

export class Router {
  constructor({ notFound }) {
    this.routes = {};
    this.notFound = notFound;
    window.addEventListener("popstate", this.handlePopState.bind(this));
  }

  addRoute(path, handler) {
    this.routes[path] = handler;
  }

  navigateTo(path) {
    history.pushState(null, "", path);
    this.handleRoute(path);
  }

  handlePopState() {
    this.handleRoute(window.location.pathname);
  }

  handleRoute(path) {
    const handler = this.routes[path];
    if (handler) {
      handler();
    } else {
      this.notFound();
    }
  }

  redirectTo(path, condition) {
    if (condition) {
      this.navigateTo(path);
    }
  }
}

export class Component {
  constructor(target, props) {
    this.target = target;
    this.props = props;
    this.state = null;
    this.setup();
    this.render();
    this.setEvent();
  }

  setup() {}
  setEvent() {}
  afterRender() {}

  setState(state) {
    this.state = { ...this.state, ...state };
    this.render();
  }

  template() {
    return "";
  }

  render() {
    this.target.innerHTML = this.template();
    this.afterRender();
  }
}

export function getFormData(elements) {
  return Object.fromEntries(new FormData(elements).entries());
}

export function submitForm(form, callback) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = getFormData(form);
    callback(formData);
  });
}
