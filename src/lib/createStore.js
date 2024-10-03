import { createObserver } from './createObserver.js';

export const createStore = (initialStore) => {
  const { subscribe, notify } = createObserver();

  let state = { ...initialStore };

  const setState = (newState) => {
    const changedState = { ...state, ...newState };
    const isEqual = deepEqual(state, changedState);

    if (isEqual) return;

    state = changedState;
    notify();
  };

  const getState = () => ({ ...state });

  return { getState, setState, subscribe };
};

function deepEqual(obj1, obj2) {
  // 참조값이 같으면 true
  if (obj1 === obj2) return true;

  // 두 값이 객체가 아니거나 한쪽만 객체라면 false
  if (typeof obj1 !== 'object' || obj1 === null || typeof obj2 !== 'object' || obj2 === null) {
    return false;
  }

  // 객체의 키를 비교
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;

  // 각 키에 대해 재귀적으로 비교
  for (let key of keys1) {
    if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
      return false;
    }
  }

  return true;
}
