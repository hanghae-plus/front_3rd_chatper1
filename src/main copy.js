document.querySelector('#root').innerHTML = `
<div class="bg-gray-100 min-h-screen flex justify-center">
    <div class="max-w-md w-full">
      <header class="bg-blue-600 text-white p-4 sticky top-0">
        <h1 class="text-2xl font-bold">항해플러스</h1>
      </header>

      <nav class="bg-white shadow-md p-2 sticky top-14">
        <ul class="flex justify-around">
          <li><a href="./main.html" class="text-blue-600">홈</a></li>
          <li><a href="./profile.html" class="text-gray-600">프로필</a></li>
          <li><a href="#" class="text-gray-600">로그아웃</a></li>
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
const root = document.querySelector('#root');

// 페이지별 템플릿을 불러오는 함수
const loadTemplate = async (template) => {
  return fetch(`./templates/${template}.html`).then(res => res.text());
};

// 라우팅에 사용할 페이지별 컴포넌트 함수
const HomePage = async () => {
  const content = await loadTemplate('main');
  return content;
};

const LoginPage = async () => {
  const content = await loadTemplate('login');
  return content;
};

const ProfilePage = async () => {
  const content = await loadTemplate('profile');
  return content;
};

const ErrorPage = async () => {
  const content = await loadTemplate('error');
  return content;
};

// 라우팅 처리
const routes = {
  '/': HomePage,
  '/login': LoginPage,
  '/profile': async () => {
    const isLoggedIn = localStorage.getItem('loggedIn');
    if (!isLoggedIn) {
      history.pushState({}, '', '/login');
      return await LoginPage();
    }
    return await ProfilePage();
  },
  '404': ErrorPage
};

// 페이지 렌더링 함수
const renderPage = async () => {
  const path = window.location.pathname;
  const route = routes[path] || routes['404'];
  const content = await route();
  root.innerHTML = content;
  
  // 로그인 폼 처리
  if (path === '/login') {
    document.getElementById('login-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const username = document.getElementById('username').value;
      if (username) {
        localStorage.setItem('user', JSON.stringify({ username, email: '', bio: '' }));
        localStorage.setItem('loggedIn', true);
        history.pushState({}, '', '/profile');
        renderPage();
      }
    });
  }

  // 로그아웃 처리
  const logoutButton = document.getElementById('logout');
  if (logoutButton) {
    logoutButton.addEventListener('click', () => {
      localStorage.removeItem('loggedIn');
      localStorage.removeItem('user');
      history.pushState({}, '', '/login');
      renderPage();
    });
  }

  // 프로필 수정 처리
  if (path === '/profile') {
    document.getElementById('profile-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const username = document.getElementById('username').value;
      const email = document.getElementById('email').value;
      const bio = document.getElementById('bio').value;
      localStorage.setItem('user', JSON.stringify({ username, email, bio }));
      renderPage();
    });
  }
};

// 페이지 이동 처리 함수
const goTo = (path) => {
  history.pushState({}, '', path);
  renderPage();
};

// popstate 이벤트 리스너 (뒤로가기 등 처리)
window.addEventListener('popstate', renderPage);

// 초기 페이지 렌더링
renderPage();
