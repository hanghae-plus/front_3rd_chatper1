import { paths } from './constant'
import { FallbackView } from './pages/FallbackView'
import { LoginPage } from './pages/LoginPage'
import { MainPage } from './pages/MainPage'
import { NotFound } from './pages/NotFound'
import { ProfilePage } from './pages/ProfilePage'
import { Router } from './router'

const routes = [
  { path: paths.main, view: MainPage },
  { path: paths.login, view: LoginPage },
  { path: paths.profile, view: ProfilePage },
  { path: '/404', view: NotFound },
]

Router.initialize(routes)

window.addEventListener('error', function (event) {
  const { message } = event.error

  const fallbackView = new FallbackView(message)

  fallbackView.render()
})
