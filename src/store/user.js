export default class User {
  constructor() {
    this.state = {
      username: "",
      email: "",
      bio: "",
    };

    this.subscribers = [];
  }

  subscribe(component) {
    this.subscribers.push(component);
  }

  set(data) {
    if (typeof data === "function") {
      this.state = data(state);
    } else {
      this.state = data;
    }
    this.subscribers.forEach((reRender) => reRender());
  }

  get() {
    return this.state;
  }
}
