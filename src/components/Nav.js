import router from '../router';
import { localGetItem, localRemoveItem } from '../utils/storage';

const Nav = () => {
  return `
    <nav class="w-full bg-white shadow-md p-2 sticky top-14">
      <ul id="nav-list" class="w-full flex justify-around">
        ${paintNavItems()}
      </ul>
    </nav>
  `;
};

function paintNavItems() {
  const isLogin = !!localGetItem('user');
  const BLUE = 'text-blue-600 font-bold';
  const GRAY = 'text-gray-600';

  return `${
    isLogin
      ? `
      <li class="w-1/3">
        <a data-route="home" id="nav-item-home" class="w-full flex align-center justify-center cursor-pointer ${
          location.pathname === '/' ? BLUE : GRAY
        }">홈</a>
      </li>
      
      <li class="w-1/3">
        <a data-route="profile" id="nav-item-profile" class="w-full flex align-center justify-center cursor-pointer ${
          location.pathname === '/profile' ? BLUE : GRAY
        }">프로필</a>
      </li>
      <li class="w-1/3">
        <a data-route="logout" id="logout" class="w-full flex align-center justify-center cursor-pointer ${GRAY}">로그아웃</a>
      </li>
    `
      : `
      <li class="w-1/2">
        <a data-route="home" id="nav-item-home" class="w-full flex align-center justify-center cursor-pointer ${
          location.pathname === '/' ? BLUE : GRAY
        }">홈</a>
      </li>
      <li class="w-1/2">
        <a data-route="login" href="/login" id="nav-item-login" class="w-full flex align-center justify-center cursor-pointer ${GRAY}">로그인</a>
      </li>
    `
  }
  `;
}

Nav.listeners = {
  handleClickNavItem() {
    const list = document.getElementById('nav-list');

    if (!list) return;

    list.addEventListener('click', (e) => {
      const route = e.target.dataset.route;

      switch (route) {
        case 'home':
          router.push('/');
          break;

        case 'profile':
          router.push('/profile');
          break;

        case 'login':
          router.push('/login');
          break;

        case 'logout':
          // 로그아웃 버튼 클릭 시 local storage 삭제 후 로그인 페이지 이동
          localRemoveItem('user');
          router.push('/login');
          break;

        default:
          router.push('/404');
          break;
      }
    });
  },
};

export default Nav;
