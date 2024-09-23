import { PERMISSION, STORAGE_KEY } from "../components/constants";

export class StorageController {
  constructor() {
    this.storage = localStorage;
  }
  get(key) {
    return this.storage.getItem(key);
  }
  getParsed(key) {
    return JSON.parse(this.storage.getItem(key));
  }
  set(key, value) {
    this.storage.setItem(key, JSON.stringify(value));
  }
  remove(key) {
    this.storage.removeItem(key);
  }
}

export class UserController {
  constructor() {
    this.storage = new StorageController();
    this.user = this.storage.getParsed(STORAGE_KEY.USER);
  }

  login(data, callback) {
    this.storage.set(STORAGE_KEY.USER, data);
    this.user = data;
    callback();
  }
  update(data, callback) {
    this.storage.set(STORAGE_KEY.USER, data);
    this.user = data;
    callback();
  }
  logout(callback) {
    this.storage.remove(STORAGE_KEY.USER);
    this.user = null;
    callback();
  }
  getUser() {
    return this.user;
  }

  status() {
    return this.getUser() ? PERMISSION.AUTH.key : PERMISSION.PUBLIC.key;
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
