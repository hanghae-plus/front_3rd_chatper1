import Store from '../utils/store'

const userStore = Store();

export default function Header() {
  const pathname = location.pathname;
  const isLoggedIn = userStore.getState('isLoggedIn');

  const navList = [
    { name: '홈', link: '/', id: 'home', show: true },
    { name: '프로필 수정', link: '/profile', id: 'profile', show: isLoggedIn },
    { name: '로그인', link: '/login', id: 'login', show: !isLoggedIn },
    { name: '로그아웃', link: '/login', id: 'logout', show: isLoggedIn },
  ];

  return `
    <header class="bg-blue-600 text-white p-4 sticky top-0">
      <h1 class="text-2xl font-bold">항해플러스</h1>
    </header>
    <nav class="bg-white shadow-md p-2 sticky top-14">
      <ul class="flex justify-around">
        ${navList
          .filter(item => item.show)
          .map(item => `
            <li>
              <a id="${item.id}" href="${item.link}" class="${pathname === item.link ? 'text-blue-600 font-bold' : 'text-gray-600'}">
                ${item.name}
              </a>
            </li>
          `)
          .join('')}
      </ul>
    </nav>
  `;
}
