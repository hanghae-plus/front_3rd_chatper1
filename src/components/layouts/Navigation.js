import { UserStore } from '@stores'
import { ROUTES, NAVIGATION } from '@constants'

const userStore = UserStore()

export default function navigation() {
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

  return `<nav class="bg-white shadow-md p-2 sticky top-14">
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
  </nav>`
}
