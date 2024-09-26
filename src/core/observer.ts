import { isEqual } from '../module/util';

class Observer {
  private observers: any[];
  _id: string;
  constructor() {
    this.observers = [];
  }

  // 옵저버 등록
  subscribe(fn: any) {
    if (this.observers.includes(fn)) return;
    this.observers.push(fn);
  }

  // 옵저버 해제
  unsubscribe(fn: any) {
    if (this.observers.length) {
      this.observers = this.observers.filter((subscriber) => subscriber !== fn);
    }
  }

  // 모든 옵저버에게 알림
  notify(data: any) {
    if (this.observers.length) {
      this.observers.forEach((fn) => fn(data));
    }
  }
}

export default class ObserverStore extends Observer {
  private _state: {};
  private initialState: {};
  get id(): string {
    return this._id;
  }
  constructor(id: string, initialState: any) {
    super();
    this._id = id;
    this._state = {};
    this.initialState = Object.freeze(initialState);
  }

  reset() {
    this._state = this.initialState;
    this.notify(this.initialState);
  }

  getState() {
    return this._state;
  }

  // 상태 업데이트 및 옵저버들에게 알림
  setState(newState: any) {
    const oldValue = { ...this._state };
    const newValue = { ...newState };
    if (!this._state || isEqual(oldValue, newValue)) return;
    this._state = newValue;
    this.notify(newValue);
  }

  destroy() {
    this._state = {};
    this.initialState = {};
  }
}
