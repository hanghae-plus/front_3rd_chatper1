import { createObserver } from "./createObserver.js";

export const createStore = (initialStore) => {
  const { subscribe, notify } = createObserver();

  let state = { ...initialStore };

  const setState = (newState) => {
    state = { ...state, ...newState }
    notify()
  }
  // console.log("state",state)

  const getState = () => ({ ...state });

  return { getState, setState, subscribe }
}
