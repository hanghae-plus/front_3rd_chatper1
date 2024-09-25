export const createStore = () => {
  let state = {};

  const setState = (key, newState) => {
    if (typeof newState === "function") {
      state = newState(state);
    } else {
      state = { ...state[key], ...newState };
    }
    localStorage.setItem(key, JSON.stringify(state));
  };

  const getState = (key) => {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch (error) {
      console.log(error);
    }
  };

  const clearState = () => {
    state = {};
    localStorage.clear();
  };

  return {
    setState,
    getState,
    clearState,
  };
};
