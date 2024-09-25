const Header = () => {
  const isLoggedIn = localStorage.getItem("user") ? true : false;
  return /* HTML */ `<header class="bg-blue-600 text-white p-4 sticky top-0">
      <h1 class="text-2xl font-bold">항해플러스</h1>
    </header>

    <nav class="bg-white shadow-md p-2 sticky top-14">
      <ul class="flex justify-around">
        <li><a href="/" class="tab text-blue-600">홈</a></li>

        ${isLoggedIn
          ? /* HTML */ `
              <li>
                <a href="/profile" class="tab text-gray-600">프로필</a>
              </li>
              <li>
                <a href="/login" class="tab text-gray-600" id="logout"
                  >로그아웃</a
                >
              </li>
            `
          : /* HTML */ ` <li>
              <a href="/login" class="tab text-gray-600">로그인</a>
            </li>`}
      </ul>
    </nav> `;
};

export default Header;
