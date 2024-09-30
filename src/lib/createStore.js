import { createObserver } from "./createObserver.js";

export const createStore = (initialStore) => {
  const { subscribe, notify } = createObserver();

  let state = { ...initialStore };

  const setState = (newState) => {
    state = { ...state, ...newState };
    notify();

    if (!!newState["error"]) {
      setTimeout(() => {
        setState({ error: null });
        notify();
      }, 3000);
    }
  };

  const getState = () => ({ ...state });

  return { getState, setState, subscribe };
};
