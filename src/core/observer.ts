import Component from './component';

export default class Observer {
  private observers: { [key: string]: Array<Component> };
  constructor() {
    this.observers = {};
  }

  // 옵저버 등록
  subscribe(key: string, component: Component) {
    if (!this.observers[key]) this.observers[key] = [];
    if (!this.observers[key].includes(component)) {
      this.observers[key].push(component);
    }
  }

  // 옵저버 해제
  unsubscribe(key: string, component: Component) {
    const observers = this.observers[key];
    if (!observers) return;
    this.observers[key] = observers.filter(
      (subscriber) => subscriber !== component
    );
  }

  // 모든 옵저버에게 알림
  notify(key: string, data: any) {
    const observers = this.observers[key];
    if (!observers) return;
    observers.forEach((observer) => observer.update(data));
  }
}
