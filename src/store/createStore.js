let state = undefined;

const createStore = (initalState) => {
  state = initalState;
  const listeners = [];

  const setState = (nextState) => {
    if (nextState !== state) {
      state = Object.assign({}, state, nextState);
      notify();
    }
  };

  const getState = (selector) => {
    return selector ? state[selector] : state;
  };

  const notify = () => {
    listeners.forEach((listener) => listener());
  };

  const subscribe = (listener) => {
    listeners.push(listener);
  };

  return { setState, getState, subscribe };
};

export default createStore;
