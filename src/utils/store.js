import Storage from './storage';

const Store = (function () {
  let instance;

  const initialState = {
    isLoggedIn: !!Storage.loadData('user'),
    user: Storage.loadData('user') || null,
  };

  function createInstance() {
    let state = { ...initialState };
    const listeners = [];

    function getState(type) {
      return state[type];
    }

    function updateUser(userInfo) {
      state = {
        ...state,
        isLoggedIn: true,
        user: { ...state.user, ...userInfo },
      };
        Storage.saveData('user', state.user);
    }

    function clearUserInfo() {
      state = {
        isLoggedIn: false,
        user: null,
      };
      Storage.clearData('user')
    }

    function subscribe(listener) {
      listeners.push(listener);
    }

    return {
      getState,
      updateUser,
      clearUserInfo,
      subscribe,
    };
  }

  return function getInstance() {
    if (!instance) {
      instance = createInstance();
    }
    return instance;
  };
})();

export default Store;
