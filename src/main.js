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

// 각 페이지 컴포넌트 정의
const MainPage = async () => {
  const content = await loadTemplate('main');
  root.innerHTML = content;
};

const LoginPage = async () => {
  const content = await loadTemplate('login');
  root.innerHTML = content;

  const loginForm = document.querySelector('form');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const username = document.querySelector('input[type="text"]').value;
      const password = document.querySelector('input[type="password"]').value;

      if (username && password) {
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
        localStorage.setItem('loggedIn', true);
        history.pushState({}, '', '/profile');
        renderPage('profile');
      } else {
        alert('사용자이름과 비밀번호를 입력하세요.');
      }
    });
  }
};

const ProfilePage = async () => {
  const content = await loadTemplate('profile');
  root.innerHTML = content;

  const storedUsername = localStorage.getItem('username');
  const storedEmail = localStorage.getItem('email');
  const storedBio = localStorage.getItem('bio');

  const usernameInput = document.getElementById('username');
  const emailInput = document.getElementById('email');
  const bioInput = document.getElementById('bio');

  if (storedUsername && usernameInput) usernameInput.value = storedUsername;
  if (storedEmail && emailInput) emailInput.value = storedEmail;
  if (storedBio && bioInput) bioInput.value = storedBio;

  const profileForm = document.querySelector('form');
  profileForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const updatedUsername = usernameInput.value;
    const updatedEmail = emailInput.value;
    const updatedBio = bioInput.value;

    if (updatedUsername && updatedEmail && updatedBio) {
      localStorage.setItem('username', updatedUsername);
      localStorage.setItem('email', updatedEmail);
      localStorage.setItem('bio', updatedBio);
      alert('프로필이 업데이트되었습니다.');
    } else {
      alert('모든 필드를 입력하세요.');
    }
  });
};

const ErrorPage = async () => {
  const content = await loadTemplate('error');
  root.innerHTML = content;
};

// 페이지 컴포넌트를 매핑하는 객체
const pageComponents = {
  'main': MainPage,
  'profile': ProfilePage,
  'login': LoginPage,
  'error': ErrorPage
};

// 페이지를 렌더링하는 함수
const renderPage = async (page) => {
  const validPages = Object.keys(pageComponents);
  if (!validPages.includes(page)) page = 'error';

  await pageComponents[page](); // 해당 페이지 컴포넌트를 호출
  updateNavigation(); // 네비게이션 업데이트
};

// 네비게이션 업데이트 함수
const updateNavigation = () => {
  const nav = document.querySelector('nav ul');
  if (!nav) return;

  const isLoggedIn = localStorage.getItem('loggedIn');
  if (isLoggedIn) {
    nav.innerHTML = `
      <li><a href="/main" class="text-blue-600">홈</a></li>
      <li><a href="/profile" class="text-gray-600">프로필</a></li>
      <li><a href="#" id="logout" class="text-gray-600">로그아웃</a></li>
    `;
  } else {
    nav.innerHTML = `
      <li><a href="/main" class="text-blue-600">홈</a></li>
      <li><a href="/login" class="text-gray-600">로그인</a></li>
    `;
  }

  const logoutButton = document.getElementById('logout');
  if (logoutButton) {
    logoutButton.addEventListener('click', (e) => {
      e.preventDefault();
      localStorage.removeItem('loggedIn');
      window.location.reload();
    });
  }
};

// 현재 URL에서 페이지 이름을 가져오는 함수
const getCurrentPage = () => {
  const path = window.location.pathname;
  const page = path.replace('/', '').replace('.html', '');
  return page || 'main';
};

// 초기 페이지 로드
renderPage(getCurrentPage());

// 네비게이션 링크 클릭 이벤트 처리
document.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') {
    e.preventDefault();
    const page = e.target.getAttribute('href').replace('/', '');
    history.pushState({}, '', `/${page}`);
    renderPage(page);
  }
});

// 브라우저의 뒤로가기 및 앞으로가기 버튼 처리
window.onpopstate = () => {
  renderPage(getCurrentPage());
};
