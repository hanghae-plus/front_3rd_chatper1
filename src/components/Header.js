
import user from "../User"

class Header{
  template(isLoggedIn, currentPath) {

    const isActive = (path) => {
      if (currentPath === path) {
        return "text-blue-600 font-bold"
      } else {
        return "text-gray-600"
      };
    }

    return `
      <header class="bg-blue-600 text-white p-4 sticky top-0">
        <h1 class="text-2xl font-bold">항해플러스</h1>
      </header>

      <nav class="bg-white shadow-md p-2 sticky top-14">
        <ul class="flex justify-around">
          <li><a href="/" data-link id="home" class="${isActive('/')}">홈</a></li>
          ${isLoggedIn
          ?
            `
              <li> <a href="/profile" id="profile" data-link class="${isActive('/profile')}">프로필</a></li>
              <li><a href="/login" id="logout" data-link class="${isActive('/login')}" id="logoutBtn">로그아웃</a></li>
            `
          :
            `
              <li><a href="/login" id="login" data-link class="${isActive('/login')}">로그인</a></li>
            `
          }
        </ul>
      </nav>
    `
  }


  bindEvents(renderHTML) {
    const logoutBtn = document.querySelector("#logout");

    if (logoutBtn) {
      logoutBtn.addEventListener("click", (e) => {
        e.preventDefault();

        // 로그아웃 호출
        user.logout();

        renderHTML("/login");
      });
    }
  }
}

export default new Header();