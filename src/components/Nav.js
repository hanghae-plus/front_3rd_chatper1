export default function Nav() {
  return `
    <nav class="w-full bg-white shadow-md p-2 sticky top-14">
      <ul id="nav-list" class="w-full flex justify-around">
        ${paintNavItems()}
      </ul>
    </nav>
  `;
}

function paintNavItems() {
  const isLogin = localStorage.getItem('user');
  const BLUE = 'text-blue-600';
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
        <a data-route="login" id="nav-item-login" class="w-full flex align-center justify-center cursor-pointer ${GRAY}">로그인</a>
      </li>
    `
  }
  `;
}
