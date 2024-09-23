class Header {
  template() {
    const user = localStorage.getItem("user");
    return `
      <header class="bg-blue-600 text-white p-4 sticky top-0">
        <h1 class="text-2xl font-bold">항해플러스</h1>
      </header>
      <nav class="bg-white shadow-md p-2 sticky top-14">
        <ul class="flex justify-around">
          <li><a href="/" class="menu text-gray-600">홈</a></li>
            ${
              user
                ? '<li><a href="/profile" class="menu text-gray-600">프로필</a></li>'
                : ""
            }
          ${
            user
              ? '<li><a href="/login" id="logout" class="menu text-red-600">로그아웃</a></li>'
              : '<li><a href="/login" id="login" class="menu text-gray-600">로그인</a></li>'
          }
        </ul>
      </nav>
    `;
  }

  bindEvents(renderPage) {
    const logoutBtn = document.getElementById("logout");

    // 화면에 로그아웃 버튼이 있는 경우(로그인 상태)
    if (logoutBtn) {
      logoutBtn.addEventListener("click", (event) => {
        event.preventDefault();
        // 로그아웃 처리(유저 정보 삭제)
        localStorage.removeItem("user");
        renderPage("/login");
      });
    }
  }
}

export default new Header();
