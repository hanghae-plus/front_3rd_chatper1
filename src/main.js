const router = {
  push: newPath => {
    const currentPath = history.state?.path || window.location.pathname;
    if (newPath !== currentPath) {
      window.history.pushState({ path: newPath }, '', newPath);
      render();
    }
  },
  replace: newPath => {
    window.history.replaceState({ path: newPath }, '', newPath);
    render();
  },
};

function render() {
  document.querySelector('#root').innerHTML = App();
}

render();

window.addEventListener('popstate', render);

document.addEventListener('click', e => {
  const anchor = e.target.closest('a');
  const button = e.target.closest('button');

  if (anchor && anchor.tagName === 'A') {
    e.preventDefault();
    const newPath = anchor.getAttribute('href');
    router.push(newPath);
  }
  if (button && button.id === 'logout') {
    e.preventDefault();
    localStorage.removeItem('user');
    router.push('/login');
  }
});

document.addEventListener('submit', e => {
  const form = e.target.closest('form');

  if (!form) return;

  e.preventDefault();

  if (form.id === 'login-form') {
    const username = document.getElementById('username')?.value;
    if (!username) return;

    localStorage.setItem('user', JSON.stringify({ username, email: '', bio: '' }));
    router.push('/');
  }

  if (form.id === 'profile-form') {
    const updatedUsername = document.getElementById('username').value || '';
    const updatedEmail = document.getElementById('email').value || '';
    const updatedBio = document.getElementById('bio').value || '';

    const updatedUser = {
      username: updatedUsername,
      email: updatedEmail,
      bio: updatedBio,
    };

    localStorage.setItem('user', JSON.stringify(updatedUser));
  }
});

function App() {
  const path = window.location.pathname;
  const isLogin = !!localStorage.getItem('user');

  switch (path) {
    case '/':
      return HomePage();
    case '/profile': {
      if (!isLogin) {
        router.replace('/login');
        return LoginPage();
      }
      return ProfilePage();
    }
    case '/login':
      if (isLogin) {
        router.replace('/');
        return HomePage();
      }
      return LoginPage();
    default:
      return ErrorPage();
  }
}

function Header() {
  const currentPath = window.location.pathname;
  const isLogin = !!localStorage.getItem('user');

  return `<header class="bg-blue-600 text-white p-4 sticky top-0">
        <h1 class="text-2xl font-bold">항해플러스</h1>
      </header>

      <nav class="bg-white shadow-md p-2 sticky top-14">
        <ul class="flex justify-around">
          <li><a href="/" class="${currentPath === '/' ? 'text-blue-600 font-bold' : 'text-gray-600'}">홈</a></li>
          <li><a href="/profile" class="${
            currentPath === '/profile' ? 'text-blue-600' : 'text-gray-600'
          }">프로필</a></li>
          <li><button type="button" id="logout" class="text-gray-600">${isLogin ? '로그아웃' : '로그인'}</button></li>
        </ul>
      </nav>`;
}

function Footer() {
  return `
      <footer class="bg-gray-200 p-4 text-center">
        <p>&copy; 2024 항해플러스. All rights reserved.</p>
      </footer>`;
}

function HomePage() {
  return `
  <div class="bg-gray-100 min-h-screen flex justify-center">
    <div class="max-w-md w-full">
      ${Header()}
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

      ${Footer()}
    </div>
  </div>
`;
}

function ProfilePage() {
  const { username, email, bio } = JSON.parse(localStorage.getItem('user'));

  return `
  <div class="bg-gray-100 min-h-screen flex justify-center">
    <div class="max-w-md w-full">
    ${Header()}

      <main class="p-4">
        <div class="bg-white p-8 rounded-lg shadow-md">
          <h2 class="text-2xl font-bold text-center text-blue-600 mb-8">내 프로필</h2>
          <form id="profile-form">
            <div class="mb-4">
              <label for="username" class="block text-gray-700 text-sm font-bold mb-2">사용자 이름</label>
              <input type="text" id="username" name="username" value="${username}" class="w-full p-2 border rounded">
            </div>
            <div class="mb-4">
              <label for="email" class="block text-gray-700 text-sm font-bold mb-2">이메일</label>
              <input type="text" id="email" name="email" value="${email}" class="w-full p-2 border rounded">
            </div>
            <div class="mb-6">
              <label for="bio" class="block text-gray-700 text-sm font-bold mb-2">자기소개</label>
              <textarea id="bio" name="bio" rows="4" class="w-full p-2 border rounded">${bio}</textarea>
            </div>
            <button type="submit" class="w-full bg-blue-600 text-white p-2 rounded font-bold">프로필 업데이트</button>
          </form>
        </div>
      </main>

      ${Footer()}
    </div>
  </div>
  `;
}

function LoginPage() {
  return `<main class="bg-gray-100 flex items-center justify-center min-h-screen">
      <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 class="text-2xl font-bold text-center text-blue-600 mb-8">항해플러스</h1>
        <form id="login-form">
          <div class="mb-4">
            <input id="username" name="username" type="text" placeholder="이메일 또는 전화번호" class="w-full p-2 border rounded">
          </div>
          <div class="mb-6">
            <input id="password" name="password" type="password" placeholder="비밀번호" class="w-full p-2 border rounded">
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
    </main>`;
}

function ErrorPage() {
  return `<main class="bg-gray-100 flex items-center justify-center min-h-screen">
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
    </main>`;
}
