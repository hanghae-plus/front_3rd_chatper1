const createStore = () => {
  const initialState = {
    user: JSON.parse(localStorage.getItem('user')) || null,
    isLoggedIn: JSON.parse(localStorage.getItem('user')) ? true : false,
  };
  let state = { ...initialState };
  const listeners = new Set();

  const subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };

  const getState = (targetState) => {
    return state[targetState];
  };
  const setState = (targetState, newState) => {
    state = {
      ...state,
      [targetState]: newState,
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
