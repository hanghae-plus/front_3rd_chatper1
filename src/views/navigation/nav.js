import { useUserStore } from '/src/store/useUserStore.js';

export const nav = () => {
  const currentPath = window.location.pathname;

  const getNavLinkClass = (path) => {
    return currentPath === path
      ? 'text-blue-600 font-bold'
      : 'text-gray-600 hover:text-blue-600';
  };

  return `
    <nav class="bg-white shadow-md p-2 sticky top-14">
      <ul class="flex justify-around">
        <li><a href="/" class="${getNavLinkClass('/')}">홈</a></li>
        ${
          useUserStore.isLoggedIn()
            ? `<li><a href="/profile" class="${getNavLinkClass(
                '/profile'
              )}">프로필</a></li>`
            : ``
        }
        ${
          useUserStore.isLoggedIn()
            ? `<li><button id="logout" class="text-gray-600 hover:text-blue-600">로그아웃</button></li>`
            : `<li><a href="/login" class="${getNavLinkClass(
                '/login'
              )}">로그인</a></li>`
        }
      </ul>
    </nav>
  `;
};
