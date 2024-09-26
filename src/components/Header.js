import UserManager from '../store/UserManager';

class Header {
  render(path) {
    return this.template(path);
  }

  template(path) {
    const homeClass =
      path === '/' ? 'text-blue-600 font-bold' : 'text-gray-600';
    const profileClass =
      path === '/profile' ? 'text-blue-600 font-bold' : 'text-gray-600';
    const loginClass =
      path === '/login' ? 'text-blue-600 font-bold' : 'text-gray-600';

    return `
        <div class="bg-gray-100 min-h-screen flex justify-center">
          <div class="max-w-md w-full">
              <header class="bg-blue-600 text-white p-4 sticky top-0">
                <h1 class="text-2xl font-bold">항해플러스</h1>
              </header>

              <nav class="bg-white shadow-md p-2 sticky top-14">
                  <ul class="flex justify-around">
                      <li><a href="/" class="navItem ${homeClass}">홈</a></li>
                      ${
                        UserManager.isLoggedIn()
                          ? `<li><a href="/profile" class="navItem ${profileClass}" id="profile">프로필</a></li>`
                          : ''
                      }
                      ${
                        UserManager.isLoggedIn()
                          ? `<li><a href="/login" class="navItem ${loginClass}" id="logout">로그아웃</a></li>`
                          : `<li><a href="/login" class="${loginClass}" id="login">로그인</a></li>`
                      }
                      
                  </ul>
              </nav>
          
      `;
  }

  registerEvents(renderPage) {
    const logoutBtn = document.getElementById('logout');

    if (logoutBtn) {
      logoutBtn.addEventListener('click', (event) => {
        event.preventDefault();

        UserManager.logout();
        renderPage('/login');
      });
    }
  }
}

export default new Header();
