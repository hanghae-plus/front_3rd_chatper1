import { UserDataType } from '../type';

class Observer {
  private observers: Array<any>;
  constructor() {
    this.observers = [];
  }

  // 옵저버 등록
  subscribe(fn: any) {
    this.observers.push(fn);
  }

  // 옵저버 해제
  unsubscribe(fn: any) {
    this.observers = this.observers.filter((subscriber) => subscriber !== fn);
  }

  // 모든 옵저버에게 알림
  notify(data: UserDataType) {
    this.observers.forEach((observer) => observer(data));
  }
}

class Store extends Observer {
  _state: UserDataType;
  private initialState: UserDataType;
  constructor(state: UserDataType) {
    super();
    this._state = { ...state };
    this.initialState = Object.freeze({ ...state });
  }

  get state() {
    return this._state;
  }

  reset() {
    localStorage.removeItem('user');
    this._state = this.initialState;
  }

  isEqual(newValue: UserDataType) {
    let isEqual = true;
    for (const key in newValue) {
      if (newValue[key] !== this._state[key]) {
        isEqual = false;
        break;
      }
    }
    return isEqual;
  }

  // 상태 업데이트 및 옵저버들에게 알림
  setState(newState: { username?: string; email?: string; bio?: string }) {
    const newValue = { ...this._state, ...newState };
    if (this.isEqual(newValue)) return;

    this._state = newValue;
    localStorage.setItem('user', JSON.stringify(newValue));
    this.notify(newValue);
  }
}

const initialState = {
  username: '',
  email: '',
  bio: '',
};

const store = new Store(initialState);

export default store;
