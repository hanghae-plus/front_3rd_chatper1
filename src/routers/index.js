import { LoginPage, MainPage, ProfilePage, NotFoundPage } from '@pages'
import { ROUTES, MESSAGE, LINK_TAG, NAVIGATION } from '@constants'
import { UserStore } from '@stores'

let currentPage = null

function createRouter(options = {}) {
  const userStore = UserStore()
  const routes = options.routes || {}

  function protectRoute(path) {
    const isLogin = userStore.getState('isLogin')
    if (path === ROUTES.PROFILE && !isLogin) return ROUTES.LOGIN
    if (path === ROUTES.LOGIN && isLogin) return ROUTES.HOME
    return path
  }

  function renderComponent(path) {
    if (currentPage && currentPage.cleanup) {
      currentPage.cleanup()
    }
    const component = routes[path] || routes[ROUTES.NOT_FOUND]
    currentPage = component()
    currentPage.render()
  }

  function navigate(path) {
    const protectedPath = protectRoute(path)
    history.pushState(null, null, protectedPath)
    renderComponent(protectedPath)
  }

  function handlePopState() {
    const path = window.location.pathname
    navigate(path)
  }

  function handleLogout() {
    userStore.clearState()
    navigate(ROUTES.LOGIN)
  }

  function handleLinkClick(e) {
    const target = e.target

    if (target.tagName === LINK_TAG && target.href.startsWith(window.location.origin)) {
      e.preventDefault()

      if (target.id === NAVIGATION.LOGOUT.ENG) {
        handleLogout()
        return
      }

      const href = target.getAttribute('href')
      navigate(href)
    }
  }

  function init() {
    window.addEventListener('popstate', handlePopState)
    document.addEventListener('click', handleLinkClick)
    navigate(window.location.pathname || ROUTES.HOME)
  }

  return {
    navigate,
    init,
  }
}

const Router = createRouter({
  routes: {
    [ROUTES.HOME]: MainPage,
    [ROUTES.PROFILE]: ProfilePage,
    [ROUTES.LOGIN]: LoginPage,
    [ROUTES.NOT_FOUND]: () =>
      NotFoundPage({ title: MESSAGE.NOT_FOUND, buttonMessage: MESSAGE.REPLACE_HOME, replacePath: ROUTES.HOME }),
  },
})

export default Router
