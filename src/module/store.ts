import Component from '../core/component';
import { UserDataType } from '../type';
import { isEqual } from './util';

/**
 * a태그로 이동하면 전체적으로 리렌더링이 되기 때문에 옵저버가 필요없다.
 * button태그로 링크에 따른 컴포넌트만 교체해줘야 한다면 옵저버가 필요하다.
 */
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
  private _state: UserDataType;
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

  // 상태 업데이트 및 옵저버들에게 알림
  setState(newState: UserDataType) {
    const oldValue = { ...this._state };
    const newValue = { ...newState };
    if (isEqual(oldValue, newValue)) return;

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

const useStore = (component: Component) => store.subscribe(component.update);

const destroyStore = (component: Component) => {
  store.unsubscribe(component.update);
};

export { useStore, destroyStore };
export default store;
