import { store } from '../store';

const Header = (currentPath) => {
  const isLoggedIn = store.getState('isLoggedIn');

  const menus = [
    { name: '홈', path: '/', active: true },
    { name: '프로필', path: '/profile', active: isLoggedIn },
    { name: '로그인', path: '/login', active: !isLoggedIn },
  ];

  const render = () => {
    return /* HTML */ `<header class="bg-blue-600 text-white p-4 sticky top-0">
        <h1 class="text-2xl font-bold">항해플러스</h1>
      </header>

      <nav class="bg-white shadow-md p-2 sticky top-14">
        <ul class="flex justify-around">
          ${menus
            .map((menu) => {
              if (!menu.active) return '';
              return /* HTML */ `<li>
                <a href=${menu.path} class="${currentPath === menu.path ? 'text-blue-600 font-bold' : 'text-gray-600'}"
                  >${menu.name}</a
                >
              </li>`;
            })
            .join('')}
          ${isLoggedIn ? '<li><button id="logout" class="text-gray-600">로그아웃</button></li>' : ''}
        </ul>
      </nav>`;
  };

  let headerHTML = render();
  return headerHTML;
};

export default Header;
