import { Logger, Storage } from '@utils'

const USER_STORAGE_KEY = 'user'

const UserStore = (function () {
  let instance

  const initialState = {
    isLoggedIn: !!Storage.load(USER_STORAGE_KEY),
    user: Storage.load(USER_STORAGE_KEY) || null,
  }

  const logger = Logger()

  function createInstance() {
    let state = { ...initialState }
    const listeners = []

    function getState(type) {
      return state[type]
    }

    function updateUser(userInfo) {
      state = {
        ...state,
        isLoggedIn: true,
        user: { ...state.user, ...userInfo },
      }
      Storage.save(USER_STORAGE_KEY, state.user)
      notify()
    }

    function clearUserInfo() {
      state = {
        isLoggedIn: false,
        user: null,
      }
      Storage.clear(USER_STORAGE_KEY)
      notify()
    }

    function subscribe(listener) {
      listeners.push(listener)
    }

    function notify() {
      listeners.forEach((listener) => listener())
      logger.log(`상태 변경: ${JSON.stringify(state)}`)
    }

    return {
      getState,
      updateUser,
      clearUserInfo,
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
