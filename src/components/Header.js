import UserData from '../stores/UserData.js';
import Router from '../Router.js';

export default class Header {
  static init() {
    this.updateLoginUI();
  }

  static updateLoginUI() {
    const isLogin = UserData.getUserData().isLogin;
    const currentPath = window.location.pathname;
    const $navList = document.getElementById('nav-list');
    if (!$navList) return;

    $navList.innerHTML = isLogin
      ? `
        <li><a href="/" class="${currentPath === '/' ? 'text-blue-600 font-bold' : 'text-gray-600'}">홈</a></li>
        <li><a href="/profile" class="${currentPath === '/profile' ? 'text-blue-600 font-bold' : 'text-gray-600'}">프로필</a></li>
        <li><a href="#" id="logout" class="text-gray-600">로그아웃</a></li>
      `
      : `
        <li><a href="/" class="text-blue-600 font-bold">홈</a></li>
        <li><a href="/login" class="text-gray-600">로그인</a></li>
      `;

    if (isLogin) {
      const $logoutButton = document.getElementById('logout');
      if (!$logoutButton) return;

      $logoutButton.addEventListener('click', () => this.logout());
    }
  }

  static logout() {
    UserData.setUserData({
      isLogin: false,
      user: null,
    });
    localStorage.removeItem('user');
    Router.navigate('/login');
  }

  render() {
    return `
      <header class="bg-blue-600 text-white p-4 sticky top-0">
        <h1 class="text-2xl font-bold">항해플러스</h1>
      </header>
      <nav class="bg-white shadow-md p-2 sticky top-14">
        <ul id="nav-list" class="flex justify-around"> 
          <li><a href="/" class="text-blue-600 font-bold" data-tab="home">홈</a></li>
          <li><a href="/login" class="text-gray-600">로그인</a></li>
        </ul>
      </nav>
    `;
  }
}
