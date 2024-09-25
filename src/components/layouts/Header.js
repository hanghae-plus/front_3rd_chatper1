import { PAGE_TITLE } from '@constants'
import { UserStore } from '@stores'
import { ROUTES } from '@constants'

const userStore = UserStore()
const NAVIGATION = {
  HOME: { KOR: '홈', ENG: 'home' },
  PROFILE: { KOR: '프로필', ENG: 'profile' },
  LOGIN: { KOR: '로그인', ENG: 'login' },
  LOGOUT: { KOR: '로그아웃', ENG: 'logout' },
}

export default function header() {
  let pathname = location.pathname
  const isActive = (path) => (pathname === path ? 'text-blue-600 font-bold' : 'text-gray-600')

  const isLogin = userStore.getState('isLogin')

  const navList = [
    {
      name: NAVIGATION.HOME.KOR,
      link: ROUTES.HOME,
      id: NAVIGATION.HOME.ENG,
      condition: () => true,
    },
    {
      name: NAVIGATION.PROFILE.KOR,
      link: ROUTES.PROFILE,
      id: NAVIGATION.PROFILE.ENG,
      condition: () => isLogin,
    },
    {
      name: NAVIGATION.LOGIN.KOR,
      link: ROUTES.LOGIN,
      id: NAVIGATION.LOGIN.ENG,
      condition: () => !isLogin,
    },
    {
      name: NAVIGATION.LOGOUT.KOR,
      link: ROUTES.LOGIN,
      id: NAVIGATION.LOGOUT.ENG,
      condition: () => isLogin,
    },
  ]
  return `<div>
    <header class="bg-blue-600 text-white p-4 sticky top-0">
      <h1 class="text-2xl font-bold">${PAGE_TITLE}</h1>
    </header>

    <nav class="bg-white shadow-md p-2 sticky top-14">
      <ul class="flex justify-around">
        ${navList
          .filter((item) => item.condition())
          .map(
            (item) => `<li>
                <a id="${item.id}" href="${item.link}" class="${isActive(item.link)}">${item.name}</a>
              </li>`
          )
          .join('')} 
      </ul>
    </nav>
  </div>`
}
