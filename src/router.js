import { LoginPage, MainPage, ProfilePage, NotFoundPage } from '@pages'
import { UserStore } from '@stores'

function createRouter(options = {}) {
  const userStore = UserStore()
  const routes = options.routes || {}
  const rootElement = options.rootElement || 'root'

  function protectRoute(path) {
    const isLoggedIn = userStore.getState('isLoggedIn')
    if (path === '/profile' && !isLoggedIn) return '/login'
    if (path === '/login' && isLoggedIn) return '/'
    return path
  }

  function renderComponent(path) {
    const component = routes[path] || routes['/404']
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

  function handleLinkClick(e) {
    const target = e.target

    if (target.tagName === 'A' && target.href.startsWith(window.location.origin)) {
      e.preventDefault()

      if (target.id === 'logout') {
        userStore.clearUserInfo()
        navigate('/login')
        return
      }

      const href = target.getAttribute('href')
      navigate(href)
    }
  }

  function init() {
    window.addEventListener('popstate', handlePopState)
    document.addEventListener('click', handleLinkClick)
    navigate(window.location.pathname || '/')
  }

  return {
    navigate,
    init,
  }
}

const Router = createRouter({
  routes: {
    '/': () => MainPage(),
    '/profile': () => ProfilePage(),
    '/login': () => LoginPage(),
    '/404': () => NotFoundPage(),
  },
  rootElement: 'root',
})

export default Router
