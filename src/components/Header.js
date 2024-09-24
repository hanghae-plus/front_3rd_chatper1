const Header = ({ isLogged }) => {
  const checkSelectedPath = (path) => {
    return window.location.pathname === path ? 'font-bold' : '';
  };

  return `
  <header class="bg-blue-600 text-white p-4 sticky top-0">
    <h1 class="text-2xl font-bold">항해플러스</h1>
  </header>
  <nav class="bg-white shadow-md p-2 sticky top-14">
    <ul class="flex justify-around">
      <li><a href="/" class="text-blue-600 ${checkSelectedPath(
        '/'
      )}">홈</a></li>
      ${
        isLogged
          ? `<li><a href="/profile" class="text-gray-600 ${checkSelectedPath(
              '/profile'
            )}">프로필</a></li>`
          : ''
      }
      ${
        isLogged
          ? `<li>
            <a href='#' id="logout" class='text-gray-600'>
              로그아웃
            </a>
          </li>`
          : `<li>
            <a href='/login' class='text-gray-600'>
              로그인
            </a>
          </li>`
      }
    </ul>
  </nav>`;
};

export default Header;
