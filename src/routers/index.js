import { LoginPage, MainPage, ProfilePage, NotFoundPage } from '@pages'
import { UserStore } from '@stores'
import { ROUTES } from '@constants'

function createRouter(options = {}) {
  const userStore = UserStore()
  const routes = options.routes || {}
  const rootElement = options.rootElement || 'root'

  function protectRoute(path) {
    const isLogin = userStore.getState('isLogin')
    if (path === ROUTES.PROFILE && !isLogin) return ROUTES.LOGIN
    if (path === ROUTES.LOGIN && isLogin) return ROUTES.HOME
    return path
  }

  function renderComponent(path) {
    const component = routes[path] || routes[ROUTES.NOT_FOUND]
    document.getElementById(rootElement).innerHTML = component()
  }

  function navigate(path) {
    const protectedPath = protectRoute(path)
    renderComponent(protectedPath)
    history.pushState(null, null, protectedPath)

    const currentComponent = routes[protectedPath]
    if (currentComponent && typeof currentComponent === 'function') {
      currentComponent()
    }
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

    if (target.tagName === 'A' && target.href.startsWith(window.location.origin)) {
      e.preventDefault()

      if (target.id === 'logout') {
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
    [ROUTES.HOME]: () => MainPage(),
    [ROUTES.PROFILE]: () => ProfilePage(),
    [ROUTES.LOGIN]: () => LoginPage(),
    [ROUTES.NOT_FOUND]: () => NotFoundPage(),
  },
  rootElement: 'root',
})

export default Router
