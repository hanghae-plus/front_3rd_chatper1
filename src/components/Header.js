const user = localStorage.getItem('user');

const Header = `
  <header class="bg-blue-600 text-white p-4 sticky top-0">
    <h1 class="text-2xl font-bold">항해플러스</h1>
  </header>

  <nav class="bg-white shadow-md p-2 sticky top-14">
    <ul class="flex justify-around">
      <li><a href="/" data-link id="home" class="text-blue-600">홈</a></li>
      ${user
    ?
    `<li><a href="/profile" id="profile" data-link class="text-gray-600">프로필</a></li>
      <li><a href="/logout" id="logout" data-link class="text-gray-600" id="logoutBtn">로그아웃</a></li>`
    :
    `<li><a href="/login" id="login" data-link class="text-gray-600">로그인</a></li>`
  }
    </ul>
  </nav>
`;

export default Header;
