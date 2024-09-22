import Logger from "./logger"
import AsyncStorage from './AsyncStorage'

const Store = (function () {
  let instance;
  const logger = Logger();

  function initState() {
    const userData = AsyncStorage.load('user');
    return {
      isAuthenticated: !!userData,
      currentUser: userData || null,
    };
  }

  function createStoreInstance() {
    let state = initState();
    const subscribers = [];

    function getState(key) {
      return state[key];
    }

    function updateCurrentUser(newUserInfo) {
      state = {
        ...state,
        isAuthenticated: true,
        currentUser: { ...state.currentUser, ...newUserInfo },
      };
      AsyncStorage.save('user', state.currentUser);
      notifySubscribers();
    }

    function clearCurrentUser() {
      state = {
        isAuthenticated: false,
        currentUser: null,
      };
      AsyncStorage.remove('user');
      notifySubscribers();
    }

    function subscribe(listener) {
      subscribers.push(listener);
    }

    function notifySubscribers() {
      subscribers.forEach((listener) => listener());
      logger.log(`State updated: ${JSON.stringify(state)}`);
    }

    return {
      getState,
      updateCurrentUser,
      clearCurrentUser,
      subscribe,
    };
  }

  return function getInstance() {
    if (!instance) {
      instance = createStoreInstance();
    }
    return instance;
  };
})();

export default Store;