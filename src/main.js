// User클래스
class UserService {
  constructor() {
    this.storageKey = 'user';
  }

  login(username, email = '', bio = '') {
    const user = { username, email, bio };
    localStorage.setItem(this.storageKey, JSON.stringify(user));
  }

  logout() {
    localStorage.removeItem(this.storageKey);
  }

  getCurrentUser() {
    const userJson = localStorage.getItem(this.storageKey);
    return userJson ? JSON.parse(userJson) : null;
  }

  isLoggedIn() {
    return !!this.getCurrentUser();
  }

  updateProfile(username, bio) {
    const user = this.getCurrentUser();
    if (user) {
      user.username = username;
      user.bio = bio;
      localStorage.setItem(this.storageKey, JSON.stringify(user));
      return true;
    }
    return false;
  }
}

// 페이지관리
class Page {
  constructor() {
    this.root = document.querySelector('#root');
  }

  setTitle(title) {
    document.title = title;
  }

  render() {
    throw new Error('render method must be implemented');
  }
}

class Header {
  constructor(userService) {
    this.userService = userService;
  }

  render() {
    const user = this.userService.getCurrentUser();
    return `
      <header class="bg-blue-600 text-white p-4 sticky top-0">
        <h1 class="text-2xl font-bold">항해플러스</h1>
        ${user ? `<span>환영합니다, ${user.username}님!</span>` : ''}
      </header>
    `;
  }
}

// Navigation 클래스
class Navigation {
  constructor(userService, router) {
    this.userService = userService;
    this.router = router;
  }

  render() {
    const user = this.userService.getCurrentUser();
    const currentPath = window.location.pathname;

    if (!user) {
      return `
        <nav class="bg-white shadow-md p-2 sticky top-14">
          <ul class="flex justify-around">
            <li><a href="/main" class="${currentPath === '/main' ? 'text-blue-600 font-bold' : 'text-gray-600'}">홈</a></li>
            <li><a href="/login" class="${currentPath === '/login' ? 'text-blue-600 font-bold' : 'text-gray-600'}">로그인</a></li>
          </ul>
        </nav>
      `;
    }

    return `
      <nav class="bg-white shadow-md p-2 sticky top-14">
        <ul class="flex justify-around">
          <li><a href="/main" class="${currentPath === '/main' ? 'text-blue-600 font-bold' : 'text-gray-600'}">홈</a></li>
          <li><a href="/profile" class="${currentPath === '/profile' ? 'text-blue-600 font-bold' : 'text-gray-600'}">프로필</a></li>
          <li><a href="#" id="logout" class="text-gray-600">로그아웃</a></li>
        </ul>
      </nav>
    `;
  }

  addEventListeners() {
    const logoutButton = document.querySelector('#logout');
    if (logoutButton) {
      logoutButton.addEventListener('click', (e) => {
        e.preventDefault();
        this.userService.logout();
        this.router.navigate('/login');
      });
    }
  }
}

class Footer {
  render() {
    return `
      <footer class="bg-gray-200 p-4 text-center">
        <p>&copy; 2024 항해플러스. All rights reserved.</p>
      </footer>
    `;
  }
}

// Main 클래스
class MainPage extends Page {
  constructor(userService, router) {
    super();
    this.userService = userService;
    this.router = router;
    this.navigation = new Navigation(userService, router);
    this.header = new Header(userService);
    this.footer = new Footer();
  }

  render() {
    const user = this.userService.getCurrentUser();
    const template = `
      <div class="bg-gray-100 min-h-screen flex justify-center">
          ${this.header.render()}
          ${this.navigation.render()}
          <main class="p-4">
            ${user ? `<h2>환영합니다, ${user.username}님!</h2>` : '로그인해주세요.'}
            <div class="bg-white rounded-lg shadow p-4">
            <div class="flex items-center mb-2">
              <img src="https://via.placeholder.com/40" alt="프로필" class="rounded-full mr-2">
              <div>
                <p class="font-bold">이영희</p>
                <p class="text-sm text-gray-500">30분 전</p>
              </div>
            </div>
            <p>오늘 점심 메뉴 추천 받습니다. 뭐가 좋을까요?</p>
            <div class="mt-2 flex justify-between text-gray-500">
              <button>좋아요</button>
              <button>댓글</button>
              <button>공유</button>
            </div>
          </main>
           ${this.footer.render()}
      </div>
    `;
    this.root.innerHTML = template;
    this.navigation.addEventListeners();
  }
}

// Profile클래스
class ProfilePage extends Page {
  constructor(userService, router) {
    super();
    this.userService = userService;
    this.router = router;
    this.navigation = new Navigation(userService, router);
    this.header = new Header(userService);
    this.footer = new Footer();
  }
  
  render() {
    const user = this.userService.getCurrentUser();
    
    if (!user) {
      this.router.navigate('/login');
      return;
    }

    const template = `
      <div class="bg-gray-100 min-h-screen flex justify-center">
          ${this.header.render()}
          ${this.navigation.render()}
          <main class="p-4">
            <div class="bg-white p-8 rounded-lg shadow-md">
              <h2 class="text-2xl font-bold text-center text-blue-600 mb-8">내 프로필</h2>
              <div id="message" class="mb-4 hidden"></div>
              <form id="profile-form">
                <div class="mb-4">
                  <label for="username" class="block text-gray-700 text-sm font-bold mb-2">사용자 이름</label>
                  <input type="text" id="username" name="username" value="${user.username}" class="w-full p-2 border rounded">
                </div>
                <div class="mb-4">
                  <label for="email" class="block text-gray-700 text-sm font-bold mb-2">이메일</label>
                  <input type="email" id="email" name="email" value="${user.email}" class="w-full p-2 border rounded" readonly>
                </div>
                <div class="mb-6">
                  <label for="bio" class="block text-gray-700 text-sm font-bold mb-2">자기소개</label>
                  <textarea id="bio" name="bio" rows="4" class="w-full p-2 border rounded">${user.bio}</textarea>
                </div>
                <button type="submit" class="w-full bg-blue-600 text-white p-2 rounded font-bold">
                  <span class="submit-text">프로필 업데이트</span>
                  <span class="loading-text hidden">업데이트 중...</span>
                </button>
              </form>
            </div>
          </main>
           ${this.footer.render()}
      </div>
    `;
    this.root.innerHTML = template;
    this.addEventListeners();
  }

  addEventListeners() {
    const form = document.querySelector('#profile-form');
    const submitButton = form.querySelector('button[type="submit"]');
    const submitText = submitButton.querySelector('.submit-text');
    const loadingText = submitButton.querySelector('.loading-text');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const username = document.querySelector('#username').value;
      const bio = document.querySelector('#bio').value;

      submitText.classList.add('hidden');
      loadingText.classList.remove('hidden');
      submitButton.disabled = true;

      try {
        if (await this.userService.updateProfile(username, bio)) {
          alert('프로필이 성공적으로 업데이트되었습니다.', 'success');
          this.render();
        } else {
          throw new Error('프로필 업데이트에 실패했습니다.');
        }
      } catch (error) {
        alert(error.message, 'error');
      } finally {
        submitText.classList.remove('hidden');
        loadingText.classList.add('hidden');
        submitButton.disabled = false;
      }
    });

    this.navigation.addEventListeners();
  }

}

// Login 클래스
class LoginPage extends Page {
  constructor(userService, router) {
    super();
    this.userService = userService;
    this.router = router;
  }

  render() {
    const template = `
      <main class="bg-gray-100 flex items-center justify-center min-h-screen">
        <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 class="text-2xl font-bold text-center text-blue-600 mb-8">항해플러스</h1>
          <form id="login-form">
            <div class="mb-4">
              <input type="text" id="username" placeholder="사용자 이름" class="w-full p-2 border rounded" required>
            </div>
            <button type="submit" class="w-full bg-blue-600 text-white p-2 rounded font-bold">로그인</button>
          </form>
        </div>
      </main>
    `;
    this.root.innerHTML = template;
    this.addEventListeners();
  }

  addEventListeners() {
    const form = document.querySelector('#login-form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const username = document.querySelector('#username').value;
      this.userService.login(username);
      this.router.navigate('/main');
    });
  }
}

// 에러
class ErrorPage extends Page {
  constructor() {
    super();
  }

  render() {
    const template = `
      <main class="bg-gray-100 flex items-center justify-center min-h-screen">
        <div class="bg-white p-8 rounded-lg shadow-md w-full text-center" style="max-width: 480px">
          <h1 class="text-2xl font-bold text-blue-600 mb-4">항해플러스</h1>
          <p class="text-4xl font-bold text-gray-800 mb-4">404</p>
          <p class="text-xl text-gray-600 mb-8">페이지를 찾을 수 없습니다</p>
          <p class="text-gray-600 mb-8">
            요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
          </p>
          <a href="/main" class="bg-blue-600 text-white px-4 py-2 rounded font-bold">
            홈으로 돌아가기
          </a>
        </div>
      </main>
    `;
    this.root.innerHTML = template;
  }
}

// 라우터
class Router {
  constructor(userService) {
    this.userService = userService;
    this.routes = {
      '/': new MainPage(userService, this),
      '/main': new MainPage(userService, this),
      '/profile': new ProfilePage(userService, this),
      '/login': new LoginPage(userService, this),
      '/error': new ErrorPage()
    };
  }

  navigate(path) {
    history.pushState(null, '', path);
    this.route();
  }

  route() {
    const path = window.location.pathname;
    const page = this.routes[path] || this.routes['/error'];
    page.render();
  }

  initEventListeners() {
    window.addEventListener('popstate', () => this.route());
    document.addEventListener('click', (e) => {
      if (e.target.matches('a')) {
        e.preventDefault();
        const href = e.target.getAttribute('href');
        this.navigate(href);
      }
    });
  }
}

// 애플리케이션
class App {
  constructor() {
    this.userService = new UserService();
    this.router = new Router(this.userService);
  }

  init() {
    this.router.initEventListeners();
    this.router.route();
  }
}


const app = new App();
app.init();