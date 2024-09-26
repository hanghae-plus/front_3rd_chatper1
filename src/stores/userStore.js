import { Storage, Publisher } from '@services'

const USER_STORAGE_KEY = 'user'

const UserStore = (function () {
  let instance

  const initialState = {
    isLogin: !!Storage.load(USER_STORAGE_KEY),
    user: Storage.load(USER_STORAGE_KEY) || null,
  }

  const publisher = Publisher()

  function createInstance() {
    let state = { ...initialState }

    function getState(type) {
      return state[type] || null
    }

    function setState(key, value) {
      state = {
        ...state,
        [key]: value,
      }
      Storage.save(USER_STORAGE_KEY, state.user)
      notify()
    }

    function clearState() {
      state = {
        isLogin: false,
        user: null,
      }
      Storage.remove(USER_STORAGE_KEY)
      notify()
    }

    function subscribe(listener) {
      publisher.subscribe(listener)
    }

    function notify() {
      publisher.publish(state)
    }

    return {
      getState,
      setState,
      clearState,
      subscribe,
    }
  }

  return function () {
    if (!instance) {
      instance = createInstance()
    }
    return instance
  }
})()

export default UserStore
