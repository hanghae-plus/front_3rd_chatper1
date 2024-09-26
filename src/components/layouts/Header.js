import { PROJECT_NAME } from '@constants'
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
  const isActive = (path) => {
    return pathname === path ? 'text-blue-600 font-bold' : 'text-gray-600'
  }

  const isLogin = userStore.getState('isLogin')

  const navigationList = [
    {
      name: NAVIGATION.HOME.KOR,
      link: ROUTES.HOME,
      id: NAVIGATION.HOME.ENG,
      condition: true,
    },
    {
      name: NAVIGATION.PROFILE.KOR,
      link: ROUTES.PROFILE,
      id: NAVIGATION.PROFILE.ENG,
      condition: isLogin,
    },
    {
      name: NAVIGATION.LOGIN.KOR,
      link: ROUTES.LOGIN,
      id: NAVIGATION.LOGIN.ENG,
      condition: !isLogin,
    },
    {
      name: NAVIGATION.LOGOUT.KOR,
      link: ROUTES.LOGIN,
      id: NAVIGATION.LOGOUT.ENG,
      condition: isLogin,
    },
  ]
  return `<div>
    <header class="bg-blue-600 text-white p-4 sticky top-0">
      <h1 class="text-2xl font-bold">${PROJECT_NAME}</h1>
    </header>

    <nav class="bg-white shadow-md p-2 sticky top-14">
      <ul class="flex justify-around">
        ${navigationList
          .filter((item) => item.condition)
          .map(
            ({ id, link, name }) => `<li>
              <a id="${id}" href="${link}" class="${isActive(link)}">${name}</a>
            </li>`
          )
          .join('')} 
      </ul>
    </nav>
  </div>`
}
