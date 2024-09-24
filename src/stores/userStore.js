import { Logger, Storage } from '@services'

const USER_STORAGE_KEY = 'user'

const UserStore = (function () {
  let instance

  const initialState = {
    isLogin: !!Storage.load(USER_STORAGE_KEY),
    user: Storage.load(USER_STORAGE_KEY) || null,
  }

  const logger = Logger()

  function createInstance() {
    let state = { ...initialState }
    const listeners = []

    function getState(type) {
      return state[type]
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

    // 실행시 state변경을 감지해 콜백함수를 실행
    function subscribe(listener) {
      listeners.push(listener)
    }

    function notify() {
      listeners.forEach((listener) => listener())
      logger.log(`상태 변경: ${JSON.stringify(state)}`)
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
