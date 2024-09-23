// 각 경로에 맞는 HTML 템플릿을 미리 정의
const routes = {
  '/': {
    content: `
      <div class="bg-gray-100 min-h-screen flex justify-center">
        <div class="max-w-md w-full">
          <header class="bg-blue-600 text-white p-4 sticky top-0">
            <h1 class="text-2xl font-bold">항해플러스</h1>
          </header>
    
          <nav class="bg-white shadow-md p-2 sticky top-14">
            <ul class="flex justify-around">
              <li><a href="/" class="text-blue-600">홈</a></li>
              <li><a href="/profile" class="text-gray-600">프로필</a></li>
              <li><a href="#" id="logout" class="text-gray-600">로그아웃</a></li>
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
    `,
    title: '항해플러스 - 홈',
  },
  '/login': {
    content: `
      <main class="bg-gray-100 flex items-center justify-center min-h-screen">
        <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 class="text-2xl font-bold text-center text-blue-600 mb-8">항해플러스</h1>
          <form id="login-form">
            <div class="mb-4">
              <input type="text" placeholder="이메일 또는 전화번호" id="username" class="w-full p-2 border rounded">
            </div>
            <div class="mb-6">
              <input type="password" placeholder="비밀번호" id="password" class="w-full p-2 border rounded">
            </div>
            <button type="submit" class="w-full bg-blue-600 text-white p-2 rounded font-bold">로그인</button>
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
    `,
    title: '항해플러스 - 로그인',
  },
  '/profile': {
    content: `
      <div class="bg-gray-100 min-h-screen flex justify-center">
        <div class="max-w-md w-full">
          <header class="bg-blue-600 text-white p-4 sticky top-0">
            <h1 class="text-2xl font-bold">항해플러스</h1>
          </header>
    
          <nav class="bg-white shadow-md p-2 sticky top-14">
            <ul class="flex justify-around">
              <li><a href="/" class="text-gray-600">홈</a></li>
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
                  <input type="text" id="username" name="username" value="" class="w-full p-2 border rounded">
                </div>
                <div class="mb-4">
                  <label for="email" class="block text-gray-700 text-sm font-bold mb-2">이메일</label>
                  <input type="email" id="email" name="email" value="" class="w-full p-2 border rounded">
                </div>
                <div class="mb-6">
                  <label for="bio" class="block text-gray-700 text-sm font-bold mb-2">자기소개</label>
                  <textarea id="bio" name="bio" rows="4" class="w-full p-2 border rounded"></textarea>
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
    `,
    title: '항해플러스 - 프로필',
  },
  '/error': {
    content: `
      <main class="bg-gray-100 flex items-center justify-center min-h-screen">
        <div class="bg-white p-8 rounded-lg shadow-md w-full text-center" style="max-width: 480px">
          <h1 class="text-2xl font-bold text-blue-600 mb-4">항해플러스</h1>
          <p class="text-4xl font-bold text-gray-800 mb-4">404</p>
          <p class="text-xl text-gray-600 mb-8">페이지를 찾을 수 없습니다</p>
          <p class="text-gray-600 mb-8">
            요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
          </p>
          <a href="/" class="bg-blue-600 text-white px-4 py-2 rounded font-bold">
            홈으로 돌아가기
          </a>
        </div>
      </main>
    `,
    title: '항해플러스 - 에러',
  },
};

let isLogin = false;

// 페이지를 로드하는 함수
const loadPage = (page) => {
  const route = routes[page] || routes['/error'];

  // 동기적으로 콘텐츠를 설정
  document.getElementById('root').innerHTML = route.content;
  document.title = route.title;

  if (page === '/') {
    // 로그아웃 버튼 초기화
    initLogoutButton();
  }

  if (page === '/profile') {
    // 로그인이 되지 않은 상태에서 /profile로 접근할 경우, /login으로 리다이렉션
    if (!isLogin) {
      navigate('/login');
      return;
    }

    // 로그아웃 버튼 초기화
    initLogoutButton();
    // 프로필 폼 초기화
    initProfileForm();
  }

  if (page === '/login') {
    // 로그인 폼 초기화
    initLoginForm();
  }
};

// 현재 경로에 맞는 페이지를 로드하는 함수
const route = () => {
  const path = window.location.pathname;
  loadPage(path);
};

// 새로운 경로로 이동하는 함수
const navigate = (path) => {
  window.history.pushState({}, '', path);
  route();
};

// SPA 라우터를 초기화하는 함수
const initRouter = () => {
  document.body.addEventListener('click', (e) => {
    if (!e.target.matches('a')) return;

    e.preventDefault();
    const path = new URL(e.target.href).pathname;
    navigate(path);
  });

  route();
};

// popstate 이벤트 처리 (뒤로 가기/앞으로 가기)
window.addEventListener('popstate', route);

// 페이지 로드 시 라우터 초기화
window.onload = () => {
  checkLoginStatus();
  initRouter();
};

// localStorage에서 사용자 정보를 확인하고 로그인 상태를 설정
const checkLoginStatus = () => {
  const userData = JSON.parse(localStorage.getItem('user'));
  isLogin = !!userData;
};

// 로그인
const loginUser = (username) => {
  isLogin = true;
  localStorage.setItem(
    'user',
    JSON.stringify({
      username,
      email: '',
      bio: '',
    }),
  );
};

// 로그아웃
const logoutUser = () => {
  isLogin = false;
  localStorage.removeItem('user');
};

// 로그인 폼 제출 시 처리
const handleFormSubmit = (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value;

  if (!username) return;

  loginUser(username);
  navigate('/');
};

// 로그인 폼 초기화
const initLoginForm = () => {
  const loginForm = document.getElementById('login-form');

  if (!loginForm) return;

  loginForm.addEventListener('submit', handleFormSubmit);
};

// 로그아웃 버튼 초기화
const initLogoutButton = () => {
  const logoutButton = document.getElementById('logout');

  if (!logoutButton) return;

  logoutButton.addEventListener('click', (e) => {
    e.preventDefault();
    logoutUser();
    navigate('/login');
  });
};

// 프로필 폼 초기화
const initProfileForm = () => {
  const profileForm = document.getElementById('profile-form');

  if (!profileForm) return;

  const userData = JSON.parse(localStorage.getItem('user'));

  if (!userData) return;

  document.getElementById('username').value = userData.username || '';
  document.getElementById('email').value = userData.email || '';
  document.getElementById('bio').value = userData.bio || '';

  profileForm.addEventListener('submit', handleProfileFormSubmit);
};

// 프로필 폼 제출 시 처리
const handleProfileFormSubmit = (e) => {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const bio = document.getElementById('bio').value;

  const userData = {
    username,
    email,
    bio,
  };

  localStorage.setItem('user', JSON.stringify(userData));
};
