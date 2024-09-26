import ObserverStore from '../core/observer';

function store() {
  const storeList = {
    userData: new ObserverStore('userData', {
      username: '',
      email: '',
      bio: '',
    }),
  };

  function subscribe(key: string, fn: () => void) {
    storeList[key]?.subscribe(fn);
  }

  function unsubscribe(key: string, fn: () => void) {
    storeList[key]?.unsubscribe(fn);
  }

  function getStoreState(key: string) {
    return storeList[key]?.getState();
  }

  function setStoreState(key: string, newValue: any, prevFn?: () => void) {
    if (prevFn) prevFn();
    storeList[key]?.setState(newValue);
  }

  function resetStoreState(key: string) {
    storeList[key]?.reset();
  }

  function removeStoreState(key: string) {
    storeList[key]?.destroy();
    delete storeList[key];
  }

  return {
    subscribe,
    unsubscribe,
    getStoreState,
    setStoreState,
    resetStoreState,
    removeStoreState,
  };
}

const {
  subscribe,
  unsubscribe,
  getStoreState,
  setStoreState,
  resetStoreState,
  removeStoreState,
} = store();

export {
  subscribe,
  unsubscribe,
  getStoreState,
  setStoreState,
  resetStoreState,
  removeStoreState,
};
