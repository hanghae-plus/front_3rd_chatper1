export const createStore = (initialStore) => {
  let state = initialStore;
  const listeners = [];

  const getState = () => state;

  const setState = (newState) => {
    state = newState;
    listeners.forEach((listeners) => listeners(state));
  };

  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      const index = listeners.indexOf(listener);
      listeners.splice(index, 1);
    };
  };

  return { getState, setState, subscribe };
};
