export default function Store(initialState) {
  const state = { ...initialState };
  const listeners = [];

  const getState = () => {
    return state;
  };

  const setState = (newState) => {
    Object.assign(state, newState);
    listeners.forEach((listener) => listener());
  };

  const subscribe = (listener) => {
    listeners.push(listener);
  };

  return { getState, setState, subscribe };
}
