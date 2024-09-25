import { UserStore } from '@stores'
import { ROUTES, NAVIGATiON } from '@constants'

const userStore = UserStore()

export default function navigation() {
  let pathname = location.pathname

  const isActive = (path) => (pathname === path ? 'text-blue-600 font-bold' : 'text-gray-600')

  const isLogin = userStore.getState('isLogin')

  const navList = [
    {
      name: NAVIGATiON.HOME.KOR,
      link: ROUTES.HOME,
      id: NAVIGATiON.HOME.ENG,
      condition: () => true,
    },
    {
      name: NAVIGATiON.PROFILE.KOR,
      link: ROUTES.PROFILE,
      id: NAVIGATiON.PROFILE.ENG,
      condition: () => isLogin,
    },
    {
      name: NAVIGATiON.LOGIN.KOR,
      link: ROUTES.LOGIN,
      id: NAVIGATiON.LOGIN.ENG,
      condition: () => !isLogin,
    },
    {
      name: NAVIGATiON.LOGOUT.KOR,
      link: ROUTES.LOGIN,
      id: NAVIGATiON.LOGOUT.ENG,
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
