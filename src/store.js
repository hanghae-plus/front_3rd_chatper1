export class Store {
  constructor() {
    if (Store.instance) {
      return Store.instance;
    }
    Store.instance = this;
    this.state = {};
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.notify();
  }

  getState() {
    return this.state;
  }

  notify() {
    // 상태 변경을 구독자에게 알림
  }
}
