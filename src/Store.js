export class Subject {
  constructor() {
    this.observers = [];
  }

  addObserver(observer) {
    this.observers.push(observer);
  }

  removeObserver(observer) {
    const index = this.observers.indexOf(observer);
    if (index > -1) {
      this.observers.splice(index, 1);
    }
  }

  notifyObservers(data) {
    this.observers.forEach((observer) => observer.update(data));
  }
}

export class Observer {
  update(data) {}
}

class Store extends Subject {
  constructor(initialState) {
    super();
    this.state = initialState;
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.notifyObservers(this.state);
  }

  getState() {
    return this.state;
  }
}

export default Store;
