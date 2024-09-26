import { LoginPage, MainPage, ProfilePage, NotFoundPage } from '@pages'
import { ROUTES } from '@constants'
import { UserStore } from '@stores'

let currentPage = null
const LINK_TAG = 'A'
const LOGOUT = 'logout'
const REPLACE_HOME_MESSAGE = '홈으로 돌아가기'
const NOT_FOUND_MESSAGE = '요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.'

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
    const { tagName, href, id } = e.target
    if (tagName === LINK_TAG && href.startsWith(window.location.origin)) {
      e.preventDefault()

      if (id === LOGOUT) {
        handleLogout()
        return
      }

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
      NotFoundPage({ title: NOT_FOUND_MESSAGE, buttonMessage: REPLACE_HOME_MESSAGE, replacePath: ROUTES.HOME }),
  },
})

export default Router
