const createStore = () => {
  const initialState = {
    user: JSON.parse(localStorage.getItem('user')) || null,
  };
  let state = { ...initialState };
  const listeners = [];

  const subscribe = (listener) => {
    listeners.push(listener);
  };

  const getState = (targetState) => {
    return state[targetState];
  };
  const setState = (targetState, newState) => {
    state = {
      ...state,
      [targetState]: { ...state[targetState], ...newState },
    };
    listeners.forEach((listener) => listener(targetState));
    localStorage.setItem(targetState, JSON.stringify(newState));
  };
  const removeState = (targetState) => {
    state = { ...state, [targetState]: initialState[targetState] };
    localStorage.removeItem(targetState);
  };

  return { subscribe, getState, setState, removeState };
};

export const store = createStore();
