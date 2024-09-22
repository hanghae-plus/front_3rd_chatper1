// History API를 사용하여 SPA 라우터 구현
class Router {
  constructor() {
    this.routes = {};
    window.addEventListener('popstate', this.handlePopState.bind(this));
    this.isLoggedIn = false; // 로그인 상태 초기화
  }

  addRoute(path, handler) {
    this.routes[path] = handler;
  }

  navigateTo(path) {
    history.pushState(null, '', path);
    this.handleRoute(path);
  }

  handlePopState() {
    this.handleRoute(window.location.pathname);
  }

  handleRoute(path) {
    // 로그인 상태에 따라 프로필 페이지 접근 제어
    if (path === '/profile' && !this.isLoggedIn) {
      this.navigateTo('/login');
      return;
    }

    const handler = this.routes[path];
    if (handler) {
      handler();
    } else {
      this.navigateTo('/404');
    }
  }

  setLoginStatus(status) {
    this.isLoggedIn = status;
  }

  handleLogin() {
    this.setLoginStatus(true);
  }

  handleLogout() {
    this.setLoginStatus(false);
  }
}

// 각 라우트에 해당하는 컴포넌트 렌더링 함수 작성
const renderHomePage = (isLoggedIn) => {
  document.querySelector('#root').innerHTML = `
  <div class="bg-gray-100 min-h-screen flex justify-center">
      <div class="max-w-md w-full">
        <header class="bg-blue-600 text-white p-4 sticky top-0">
          <h1 class="text-2xl font-bold">항해플러스</h1>
        </header>
  
        <nav class="bg-white shadow-md p-2 sticky top-14">
          <ul class="flex justify-around">
            <li><a href="./" class="text-blue-600">홈</a></li>
            ${
              isLoggedIn
                ? '<li><a href="./profile" class="text-gray-600">프로필</a></li>'
                : ''
            }
            ${
              isLoggedIn
                ? '<li><a href="#" id="logout" class="text-gray-600">로그아웃</a></li>'
                : '<li><a href="./login" class="text-gray-600">로그인</a></li>'
            }
          </ul>
        </nav>
  
        <main class="p-4">
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
  
        <footer class="bg-gray-200 p-4 text-center">
          <p>&copy; 2024 항해플러스. All rights reserved.</p>
        </footer>
      </div>
    </div>
  `;

  // 로그아웃 버튼 클릭 이벤트 리스너 추가
  if (isLoggedIn) {
    document.getElementById('logout').addEventListener('click', (e) => {
      e.preventDefault();

      // LocalStorage에서 데이터 삭제
      localStorage.removeItem('user');

      router.handleLogout();
      router.navigateTo('/');
    });
  }
};

const renderProfilePage = (isLoggedIn) => {
  // LocalStorage에서 데이터 가져오기 (key: 'user')
  const user = JSON.parse(localStorage.getItem('user'));

  document.querySelector('#root').innerHTML = `
  <div class="bg-gray-100 min-h-screen flex justify-center">
    <div class="max-w-md w-full">
      <header class="bg-blue-600 text-white p-4 sticky top-0">
        <h1 class="text-2xl font-bold">항해플러스</h1>
      </header>

      <nav class="bg-white shadow-md p-2 sticky top-14">
        <ul class="flex justify-around">
          <li><a href="./" class="text-gray-600">홈</a></li>
          <li><a href="#" class="text-blue-600">프로필</a></li>
          <li><a href="#" id="logout" class="text-gray-600">로그아웃</a></li>
        </ul>
      </nav>

      <main class="p-4">
        <div class="bg-white p-8 rounded-lg shadow-md">
          <h2 class="text-2xl font-bold text-center text-blue-600 mb-8">내 프로필</h2>
          <form id="profile-form">
            <div class="mb-4">
              <label for="username" class="block text-gray-700 text-sm font-bold mb-2">사용자 이름</label>
              <input type="text" id="username" name="username" value="홍길동" class="w-full p-2 border rounded">
            </div>
            <div class="mb-4">
              <label for="email" class="block text-gray-700 text-sm font-bold mb-2">이메일</label>
              <input type="email" id="email" name="email" value="hong@example.com" class="w-full p-2 border rounded">
            </div>
            <div class="mb-6">
              <label for="bio" class="block text-gray-700 text-sm font-bold mb-2">자기소개</label>
              <textarea id="bio" name="bio" rows="4" class="w-full p-2 border rounded">${user.bio}</textarea>
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

  document.getElementById('username').value = user.username;

  document.getElementById('profile-form').addEventListener('submit', (e) => {
    e.preventDefault(); // 폼 제출 기본 동작 방지

    const userInfo = {
      username: document.getElementById('username').value,
      email: '',
      bio: document.getElementById('bio').value,
    };

    // // LocalStorage에 데이터 저장 (key: 'user')
    localStorage.setItem('user', JSON.stringify(userInfo));
  });

  // 로그아웃 버튼 클릭 이벤트 리스너 추가
  if (isLoggedIn) {
    document.getElementById('logout').addEventListener('click', (e) => {
      e.preventDefault();

      // LocalStorage에서 데이터 삭제 (key: 'user')
      localStorage.removeItem('user');

      router.handleLogout();
      router.navigateTo('/');
    });
  }
};

const renderLoginPage = () => {
  document.querySelector('#root').innerHTML = `
    <main class="bg-gray-100 flex items-center justify-center min-h-screen">
      <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 class="text-2xl font-bold text-center text-blue-600 mb-8">항해플러스</h1>
        <form id="login-form">
          <div class="mb-4">
            <input type="text" id="username" placeholder="사용자 이름" class="w-full p-2 border rounded">
          </div>
          <div class="mb-6">
            <input type="password" id="userPw" placeholder="비밀번호" class="w-full p-2 border rounded">
          </div>
          <button type="submit" id="loginButton" class="w-full bg-blue-600 text-white p-2 rounded font-bold">로그인</button>
        </form>
        <div class="mt-4 text-center">
          <a href="#" class="text-blue-600 text-sm">비밀번호를 잊으셨나요?</a>
        </div>
        <hr class="my-6">
        <div class="text-center">
          <button class="bg-green-500 text-white px-4 py-2 rounded font-bold">새 계정 만들기</button>
        </div>
      </div>
    </main>
  `;

  document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault(); // 폼 제출 기본 동작 방지

    const userInfo = {
      username: document.getElementById('username').value,
      email: '',
      bio: '',
    };

    // LocalStorage에 데이터 저장 (key: 'user')
    localStorage.setItem('user', JSON.stringify(userInfo));

    router.handleLogin();
    router.navigateTo('/');
  });
};

const renderNotFoundPage = () => {
  document.querySelector('#root').innerHTML = `
    <main class="bg-gray-100 flex items-center justify-center min-h-screen">
      <div class="bg-white p-8 rounded-lg shadow-md w-full text-center" style="max-width: 480px">
        <h1 class="text-2xl font-bold text-blue-600 mb-4">항해플러스</h1>
        <p class="text-4xl font-bold text-gray-800 mb-4">404</p>
        <p class="text-xl text-gray-600 mb-8">페이지를 찾을 수 없습니다</p>
        <p class="text-gray-600 mb-8">
          요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
        </p>
        <a href="./.html" class="bg-blue-600 text-white px-4 py-2 rounded font-bold">
          홈으로 돌아가기
        </a>
      </div>
    </main>
  `;
};

// 라우터에 경로와 해당 컴포넌트 등록
const router = new Router();
router.addRoute('/', () => renderHomePage(router.isLoggedIn));
router.addRoute('/profile', () => renderProfilePage(router.isLoggedIn));
router.addRoute('/login', renderLoginPage);
router.addRoute('/404', renderNotFoundPage);

document.addEventListener('DOMContentLoaded', () => {
  router.handleRoute(window.location.pathname);
});

// 네비게이션 이벤트 처리 (링크 클릭 시 페이지 전환)
document.addEventListener('click', (e) => {
  const link = e.target.closest('nav a');
  if (link) {
    e.preventDefault();
    router.navigateTo(link.pathname);
  }
});
