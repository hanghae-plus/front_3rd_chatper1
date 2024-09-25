import Component from '../core/component';
import Observer from '../core/observer';
import { UserDataType } from '../type';
import { isEqual } from './util';

class Store extends Observer {
  private _state: { [key: string]: any };
  private initialState: { [key: string]: any };
  constructor() {
    super();
    this._state = {};
    this.initialState = {};
  }

  add(key: string, data: any) {
    this._state[key] = { ...data };
    this.initialState[key] = Object.freeze({ ...data });
  }

  reset(key: string) {
    if (key == 'userData') {
      localStorage.removeItem('user');
    }
    this._state[key] = this.initialState[key];
    this.notify(key, this.initialState[key]);
  }

  getState(key: string) {
    return this._state[key] ? this._state[key] : {};
  }

  // 상태 업데이트 및 옵저버들에게 알림
  setState(key: string, newState: any) {
    const oldValue = { ...this._state[key] };
    const newValue = { ...newState };
    if (!this._state[key] || isEqual(oldValue, newValue)) return;

    if (key == 'userData') {
      localStorage.setItem('user', JSON.stringify(newValue));
    }

    this._state[key] = newValue;
    this.notify(key, newValue);
  }

  destroy(key: string) {
    if (key == 'userData') localStorage.removeItem('user');
    delete this._state[key];
    delete this.initialState[key];
  }
}

const store = new Store();

const useStore = (key: string, component: any) => {
  store.subscribe(key, component);
};

const destroyStore = (key: string, component: any) => {
  store.unsubscribe(key, component);
};

export { useStore, destroyStore };
export default store;
