import authStore from "../store/store";

// 헤더 컴포넌트
class Header {
  template(currentPath) {
    const isLogin = authStore.getIsLogin() === true;

    // 현재 경로와 일치하는 메뉴에 active 클래스 추가
    const isActive = (path) =>
      currentPath === path ? "text-blue-600 font-bold" : "text-gray-600";

    return `
      <header class="bg-blue-600 text-white p-4 sticky top-0">
        <h1 class="text-2xl font-bold">항해플러스</h1>
      </header>
      <nav class="bg-white shadow-md p-2 sticky top-14">
        <ul class="flex justify-around">
          <li><a href="/" class="menu ${isActive("/")}">홈</a></li>
            ${
              isLogin
                ? `<li><a href="/profile" class="menu ${isActive(
                    "/profile"
                  )}">프로필</a></li>`
                : ""
            }
          ${
            isLogin
              ? `<li><a href="/login" id="logout" class="menu ${isActive(
                  "/login"
                )}">로그아웃</a></li>`
              : `<li><a href="/login" id="login" class="menu ${isActive(
                  "/login"
                )}">로그인</a></li>`
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

        // 스토어 로그아웃 메서드 호출
        authStore.userLogout();

        renderPage("/login");
      });
    }
  }
}

export default new Header();
