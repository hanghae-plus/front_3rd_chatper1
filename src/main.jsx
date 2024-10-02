/** @jsx createVNode */
import { createRouter, createVNode, renderElement } from '@lib'
import { HomePage, LoginPage, ProfilePage } from '@pages'
import { globalStore } from '@stores'
import { ForbiddenError, UnauthorizedError } from '@errors'
import { userStorage } from '@storages'
import { addEvent, registerGlobalEvents } from '@utils'
import { App } from './App'

const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  PROFILE: '/profile',
}
const LINK_ELEMENTS = '[data-link]'
const LOGOUT_BUTTON = '#logout'
const ERROR_BOUNDARY = '#error-boundary'

const router = createRouter({
  [ROUTES.HOME]: HomePage,
  [ROUTES.LOGIN]: () => {
    const { loggedIn } = globalStore.getState()
    if (loggedIn) {
      throw new ForbiddenError()
    }
    return <LoginPage />
  },
  [ROUTES.PROFILE]: () => {
    const { loggedIn } = globalStore.getState()
    if (!loggedIn) {
      throw new UnauthorizedError()
    }
    return <ProfilePage />
  },
})

function logout() {
  globalStore.setState({ currentUser: null, loggedIn: false })
  router.push(ROUTES.LOGIN)
  userStorage.reset()
}

function handleError(error) {
  globalStore.setState({ error })
}

// 초기화 함수
function render() {
  const $root = document.querySelector('#root')
  try {
    renderElement(<App targetPage={router.getTarget()} />, $root)
  } catch (error) {
    if (error instanceof ForbiddenError) {
      router.push(ROUTES.HOME)
      return
    }
    if (error instanceof UnauthorizedError) {
      router.push(ROUTES.LOGIN)
      return
    }

    console.error(error)
  }
  registerGlobalEvents()
}

function main() {
  router.subscribe(render)
  globalStore.subscribe(render)
  window.addEventListener('error', handleError)
  window.addEventListener('unhandledrejection', handleError)

  addEvent('click', LINK_ELEMENTS, (e) => {
    e.preventDefault()
    router.push(e.target.href.replace(window.location.origin, ''))
  })

  addEvent('click', LOGOUT_BUTTON, (e) => {
    e.preventDefault()
    logout()
  })

  addEvent('click', ERROR_BOUNDARY, (e) => {
    e.preventDefault()
    globalStore.setState({ error: null })
  })

  render()
}

main()
