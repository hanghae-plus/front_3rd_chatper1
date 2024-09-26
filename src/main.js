//user
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

  updateUserBio(bio) {
    const user = this.getCurrentUser();
    if (user) {
      user.bio = bio;
      localStorage.setItem(this.storageKey, JSON.stringify(user));
    }
  }

  updateProfile(username, bio) {
    const user = this.getCurrentUser();
    if (user) {
      user.username = username;
      user.bio = bio;
      localStorage.setItem(this.storageKey, JSON.stringify(user));
    }
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

class MainPage extends Page {
  constructor(userService) {
    super();
    this.userService = userService;
    this.setTitle('홈 - 항해플러스');
  }

  render() {
    const user = this.userService.getCurrentUser();
    const navTemplate = user
      ? `<nav class="bg-white shadow-md p-2 sticky top-14">
          <ul class="flex justify-around">
            <li><a href="/main" class="text-blue-600">홈</a></li>
            <li><a href="/profile" class="text-gray-600">프로필</a></li>
            <li><a href="#" id="logout" class="text-gray-600">로그아웃</a></li>
          </ul>
        </nav>`
      : `<nav class="bg-white shadow-md p-2 sticky top-14">
          <ul class="flex justify-around">
            <li><a href="/main" class="text-blue-600">홈</a></li>
            <li><a href="/login" class="text-gray-600">로그인</a></li>
          </ul>
        </nav>`;

    const template = `
      <div class="bg-gray-100 min-h-screen flex justify-center">
        <div class="max-w-md w-full">
          <header class="bg-blue-600 text-white p-4 sticky top-0">
            <h1 class="text-2xl font-bold">항해플러스</h1>
          </header>
          ${navTemplate}
          <main class="p-4">
            ${user ? `<h2>환영합니다, ${user.username}님!</h2>` : '로그인해주세요.'}
            <div class="mb-4 bg-white rounded-lg shadow p-4">
              <textarea class="w-full p-2 border rounded" placeholder="무슨 생각을 하고 계신가요?"></textarea>
              <button class="mt-2 bg-blue-600 text-white px-4 py-2 rounded">게시</button>
            </div>

            <div class="space-y-4">

              <div class="bg-white rounded-lg shadow p-4">
                <div class="flex items-center mb-2">
                  <img src="https://via.placeholder.com/40" alt="프로필" class="rounded-full mr-2">
                  <div>
                    <p class="font-bold">홍길동</p>
                    <p class="text-sm text-gray-500">5분 전</p>
                  </div>
                </div>
                <p>오늘 날씨가 정말 좋네요. 다들 좋은 하루 보내세요!</p>
                <div class="mt-2 flex justify-between text-gray-500">
                  <button>좋아요</button>
                  <button>댓글</button>
                  <button>공유</button>
                </div>
              </div>

              <div class="bg-white rounded-lg shadow p-4">
                <div class="flex items-center mb-2">
                  <img src="https://via.placeholder.com/40" alt="프로필" class="rounded-full mr-2">
                  <div>
                    <p class="font-bold">김철수</p>
                    <p class="text-sm text-gray-500">15분 전</p>
                  </div>
                </div>
                <p>새로운 프로젝트를 시작했어요. 열심히 코딩 중입니다!</p>
                <div class="mt-2 flex justify-between text-gray-500">
                  <button>좋아요</button>
                  <button>댓글</button>
                  <button>공유</button>
                </div>
              </div>

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
              </div>

              <div class="bg-white rounded-lg shadow p-4">
                <div class="flex items-center mb-2">
                  <img src="https://via.placeholder.com/40" alt="프로필" class="rounded-full mr-2">
                  <div>
                    <p class="font-bold">박민수</p>
                    <p class="text-sm text-gray-500">1시간 전</p>
                  </div>
                </div>
                <p>주말에 등산 가실 분 계신가요? 함께 가요!</p>
                <div class="mt-2 flex justify-between text-gray-500">
                  <button>좋아요</button>
                  <button>댓글</button>
                  <button>공유</button>
                </div>
              </div>

              <div class="bg-white rounded-lg shadow p-4">
                <div class="flex items-center mb-2">
                  <img src="https://via.placeholder.com/40" alt="프로필" class="rounded-full mr-2">
                  <div>
                    <p class="font-bold">정수연</p>
                    <p class="text-sm text-gray-500">2시간 전</p>
                  </div>
                </div>
                <p>새로 나온 영화 재미있대요. 같이 보러 갈 사람?</p>
                <div class="mt-2 flex justify-between text-gray-500">
                  <button>좋아요</button>
                  <button>댓글</button>
                  <button>공유</button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    `;
    this.root.innerHTML = template;

    if (user) {
      this.addLogoutListener();
    }
  }

  addLogoutListener() {
    const logoutButton = document.querySelector('#logout');
    logoutButton.addEventListener('click', (e) => {
      e.preventDefault();
      this.userService.logout();
      this.render(); // 페이지 새로고침
    });
  }
}

// 프로필
class ProfilePage extends Page {
  constructor(userService, router) {
    super();
    this.userService = userService;
    this.router = router;
    this.setTitle('프로필 - 항해플러스');
  }
  
  render() {
    const user = this.userService.getCurrentUser();
    
    if (!user) {
      this.router.navigate('/login');
      return;
    }

    const template = `
      <div class="bg-gray-100 min-h-screen flex justify-center">
        <div class="max-w-md w-full">
          <header class="bg-blue-600 text-white p-4 sticky top-0">
            <h1 class="text-2xl font-bold">항해플러스</h1>
          </header>

          <nav class="bg-white shadow-md p-2 sticky top-14">
            <ul class="flex justify-around">
              <li><a href="/main" class="text-gray-600">홈</a></li>
              <li><a href="/profile" class="text-blue-600">프로필</a></li>
              <li><a href="#" id="logout" class="text-gray-600">로그아웃</a></li>
            </ul>
          </nav>

          <main class="p-4">
            <div class="bg-white p-8 rounded-lg shadow-md">
              <h2 class="text-2xl font-bold text-center text-blue-600 mb-8">내 프로필</h2>
              <form id="profile-form">
                <div class="mb-4">
                  <label for="username" class="block text-gray-700 text-sm font-bold mb-2">사용자 이름</label>
                  <input type="text" id="username" name="username" value="${user.username}" class="w-full p-2 border rounded">
                </div>
                <div class="mb-6">
                  <label for="bio" class="block text-gray-700 text-sm font-bold mb-2">자기소개</label>
                  <textarea id="bio" name="bio" rows="4" class="w-full p-2 border rounded">${user.bio || ''}</textarea>
                </div>
                <button type="submit" class="w-full bg-blue-600 text-white p-2 rounded font-bold">프로필 업데이트</button>
              </form>
            </div>
          </main>

          <footer class="bg-gray-200 p-4 text-center">
            <p>&copy; 2024 항해플러스. All rights reserved.</p>
          </footer>
        </div>
      </div>
    `;
    this.root.innerHTML = template;
    this.addEventListeners();
  }
  addEventListeners() {
    const form = document.querySelector('#profile-form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const username = document.querySelector('#username').value;
      const bio = document.querySelector('#bio').value;
      this.userService.updateProfile(username, bio);
      alert('프로필이 업데이트되었습니다.');
    });

    const logoutButton = document.querySelector('#logout');
    logoutButton.addEventListener('click', (e) => {
      e.preventDefault();
      this.userService.logout();
      this.router.navigate('/main');
    });
  }
}

// 로그인
class LoginPage extends Page {
  constructor(userService, router) {
    super();
    this.userService = userService;
    this.router = router;
    this.setTitle('로그인 - 항해플러스');
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
    this.setTitle('404 - 페이지를 찾을 수 없음');
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
      '/main': new MainPage(userService),
      '/profile': new ProfilePage(userService),
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
        history.pushState(null, '', href);
        this.route();
      }
    });
  }
}

// 애플리케이션 클래스
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

// 시작
const app = new App();
app.init();