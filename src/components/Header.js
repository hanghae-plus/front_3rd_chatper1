class HeaderComponent {
  constructor(isLogin) {
    this.isLogin = isLogin;
  }

  render() {
    const homeUrl = window.location.pathname === "/";

    return `
      <header class="bg-blue-600 text-white p-4 sticky top-0">
        <h1 class="text-2xl font-bold">항해플러스</h1>
      </header>
      <nav class="bg-white shadow-md p-2 sticky top-14">
        <ul class="flex justify-around">
          <li><a href="/" class="${homeUrl ? "text-blue-600 font-bold" : "text-gray-600 font-bold"}">홈</a></li>
          ${
            this.isLogin
              ? `
            <li><a href="/profile" id="login" class="${!homeUrl ? "text-blue-600 font-bold" : "text-gray-600 font-bold"}">프로필</a></li>
            <li><a href="/login" id="logout" class="text-gray-600">로그아웃</a></li>
            `
              : `
            <li><a href="/login" class="text-gray-600">로그인</a></li>
            `
          }
        </ul>
      </nav>
    `;
  }
}

export default HeaderComponent;
