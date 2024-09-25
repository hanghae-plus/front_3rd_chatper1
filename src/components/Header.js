import { PATH_INFO } from '../constant';
import UserInfo from '../userInfo';

export default function Header() {
  const currentPath = location.pathname;

  const hasLogin = !!UserInfo.get('username');
  const tabs = [
    { id: 'home', title: '홈', to: PATH_INFO.main, isVisible: true },
    {
      id: 'profile',
      title: '프로필',
      to: PATH_INFO.profile,
      isVisible: hasLogin,
    },
    { id: 'login', title: '로그인', to: PATH_INFO.login, isVisible: !hasLogin },
    {
      id: 'logout',
      title: '로그아웃',
      to: '#',
      isVisible: hasLogin,
    },
  ];
  console.log(tabs);

  return `
    <header class="bg-blue-600 text-white p-4 sticky top-0">
      <h1 class="text-2xl font-bold">항해플러스</h1>
    </header>

    <nav class="bg-white shadow-md p-2 sticky top-14">
      <ul class="flex justify-around">
        ${tabs
          .filter((tab) => tab.isVisible)
          .map(
            (visibleTab) => `
            <li>
              <a id="${visibleTab.id}" href="${visibleTab.to}" class="${
              currentPath === visibleTab.to
                ? 'text-blue-600 font-bold'
                : 'text-gray-600'
            }">
                ${visibleTab.title}
              </a>
            </li>
          `
          )
          .join('')}
      </ul>
    </nav>
  `;
}
