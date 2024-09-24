import { UserStore } from '@stores'
import { ROUTES } from '@constants'

const userStore = UserStore()

export default function navigation() {
  let pathname = location.pathname

  const isActive = (path) => (pathname === path ? 'text-blue-600 font-bold' : 'text-gray-600')

  const isLogin = userStore.getState('isLogin')

  const navList = [
    {
      name: '홈',
      link: ROUTES.HOME,
      id: 'home',
      condition: () => true,
    },
    {
      name: '프로필',
      link: ROUTES.PROFILE,
      id: 'profile',
      condition: () => isLogin,
    },
    {
      name: '로그인',
      link: ROUTES.LOGIN,
      id: 'login',
      condition: () => !isLogin,
    },
    {
      name: '로그아웃',
      link: ROUTES.LOGIN,
      id: 'logout',
      condition: () => isLogin,
    },
  ]

  return `<nav class="bg-white shadow-md p-2 sticky top-14">
    <ul class="flex justify-around">
      ${navList
        .filter((item) => item.condition()) // 조건을 만족하는 항목만 필터링
        .map(
          (item) => `<li>
              <a id="${item.id}" href="${item.link}" class="${isActive(item.link)}">${item.name}</a>
            </li>`
        )
        .join('')} 
    </ul>
  </nav>`
}
