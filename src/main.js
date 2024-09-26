const userInfoManager = (() => {
  let userInfo = {
    username: '',
    email: '',
    bio: '',
  };

  const savedUser = localStorage.getItem('user');
  if (savedUser) {
    userInfo = JSON.parse(savedUser);
  }

  return {
    getUserInfo: () => userInfo,
    setUserInfo: newUserInfo => {
      userInfo = { ...userInfo, ...newUserInfo };
      localStorage.setItem('user', JSON.stringify(userInfo));
    },
    clearUserInfo: () => {
      userInfo = { username: '', email: '', bio: '' };
      localStorage.removeItem('user');
    },
  };
})();

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

function goTo(path) {
  history.pushState({}, '', path); // URL 변경
  renderPage(path); // 페이지 렌더링
}

function renderPage(path) {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  // 로그인하지 않은 경우
  if (path === '/profile' && !isLoggedIn) {
    history.pushState({}, '', '/login');
    renderLogin(); // 로그인 페이지 렌더링
    return;
  }

  switch (path) {
    case '/':
    case '/main':
      renderHome();
      break;
    case '/login':
      renderLogin();
      break;
    case '/profile':
      renderProfile();
      break;
    default:
      renderNotFound();
  }
}

function renderHeader(isLoggedIn) {
  const navItems = isLoggedIn
    ? `
  <li><a href="./profile" class="text-gray-600">프로필</a></li>
  <li><a href="/" class="text-gray-600" id="logout">로그아웃</a></li>
  `
    : `
  <li><a href="./login" class="text-gray-600" id="loginBtn">로그인</a></li>
  `;

  return `
    <header class="bg-blue-600 text-white p-4 sticky top-0">
      <h1 class="text-2xl font-bold">항해플러스</h1>
    </header>

    <nav class="bg-white shadow-md p-2 sticky top-14">
      <ul class="flex justify-around">
        <li><a href="./main" class="text-gray-600">홈</a></li>
        ${navItems}
      </ul>
    </nav>
  `;
}

function renderFooter() {
  return `
    <footer class="bg-gray-200 p-4 text-center">
      <p>&copy; 2024 항해플러스. All rights reserved.</p>
    </footer>
  `;
}

function renderHome() {
  // localStorage에서 로그인 여부를 확인
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true' ? true : false;

  document.querySelector('#root').innerHTML = `
    <div class="bg-gray-100 min-h-screen flex justify-center">
    <div class="max-w-md w-full">
      ${renderHeader(isLoggedIn)} 
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

      ${renderFooter()}
    </div>
  </div>
  `;
}

function renderLogin() {
  document.querySelector('#root').innerHTML = `
   <main class="bg-gray-100 flex items-center justify-center min-h-screen">
      <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 class="text-2xl font-bold text-center text-blue-600 mb-8">항해플러스</h1>
        <form id="login-form">
          <div class="mb-4">
            <input id="username" type="text" placeholder="이메일 또는 전화번호" class="w-full p-2 border rounded">
          </div>
          <div class="mb-6">
            <input id="password" type="password" placeholder="비밀번호" class="w-full p-2 border rounded">
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
  `;
}

function renderProfile() {
  const user = JSON.parse(localStorage.getItem('user'));
  // const userInfo = userInfoManager.getUserInfo();
  // localStorage에서 로그인 여부를 확인
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true' ? true : false;

  if (user) {
    document.querySelector('#root').innerHTML = `
   <div class="bg-gray-100 min-h-screen flex justify-center">
    <div class="max-w-md w-full">
       ${renderHeader(isLoggedIn)}

      <main class="p-4">
        <div class="bg-white p-8 rounded-lg shadow-md">
          <h2 class="text-2xl font-bold text-center text-blue-600 mb-8">내 프로필</h2>
          <form id="profile-form">
            <div class="mb-4">
              <label for="username" class="block text-gray-700 text-sm font-bold mb-2">사용자 이름</label>
              <input type="text" id="username" name="username" value="${
                user.username
              }" class="w-full p-2 border rounded">
            </div>
            <div class="mb-4">
              <label for="email" class="block text-gray-700 text-sm font-bold mb-2">이메일</label>
              <input type="email" id="email" name="email" value="${user.email}" class="w-full p-2 border rounded">
            </div>
            <div class="mb-6">
              <label for="bio" class="block text-gray-700 text-sm font-bold mb-2">자기소개</label>
              <textarea id="bio" name="bio" rows="4" class="w-full p-2 border rounded">${user.bio}</textarea>
            </div>
            <button type="submit" class="w-full bg-blue-600 text-white p-2 rounded font-bold">프로필 업데이트</button>
          </form>
        </div>
      </main>

      ${renderFooter()}
    </div>
  </div>
 `;
  } else {
    console.error('사용자 정보가 없습니다.');
  }
}

function renderNotFound() {
  document.querySelector('#root').innerHTML = `
     <main class="bg-gray-100 flex items-center justify-center min-h-screen">
      <div class="bg-white p-8 rounded-lg shadow-md w-full text-center" style="max-width: 480px">
        <h1 class="text-2xl font-bold text-blue-600 mb-4">항해플러스</h1>
        <p class="text-4xl font-bold text-gray-800 mb-4">404</p>
        <p class="text-xl text-gray-600 mb-8">페이지를 찾을 수 없습니다</p>
        <p class="text-gray-600 mb-8">
          요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
        </p>
        <a href="./main" class="bg-blue-600 text-white px-4 py-2 rounded font-bold">
          홈으로 돌아가기
        </a>
      </div>
    </main>
  `;
}

// 링크에 navigate 함수 연결
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', event => {
    const path = link.getAttribute('href');
    // navigate(event, path);
    goTo(path);
  });
});

// 초기 로드 시 URL 처리
window.addEventListener('popstate', () => {
  renderPage(location.pathname);
});

// 처음 로드 시 현재 URL에 따라 페이지 렌더링
document.addEventListener('DOMContentLoaded', () => {
  renderPage(location.pathname || '/');
});

// 로그인 폼 제출 이벤트 리스너
document.addEventListener('submit', () => {
  event.preventDefault();
  const path = location.pathname;
  console.log(path);

  if (path === '/login') {
    handleLogin();
  }
});

// 로그인 처리 함수
function handleLogin(event) {
  // event.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const email = '';
  const bio = '';

  const user = {
    username: username,
    email: email,
    bio: bio,
  };

  userInfoManager.setUserInfo(user);

  // LocalStorage에 사용자 정보 저장
  localStorage.setItem('user', JSON.stringify(user));

  // 로그인 성공 시
  localStorage.setItem('isLoggedIn', 'true');

  console.log('로그인 성공:', user);
  // 사용자 페이지 렌더링
  renderHome(userInfoManager.getUserInfo());
}

function logout() {
  localStorage.removeItem('user');
  localStorage.removeItem('isLoggedIn');

  // localStorage.clear();
  console.log('로그아웃 성공');
  renderLogin();
}

// 로그아웃 이벤트 리스너
document.addEventListener('click', e => {
  if (e.target.id === 'logout') {
    logout(); // logout 함수 호출
  }
});

//
document.addEventListener('submit', () => {
  event.preventDefault();
  const path = location.pathname;
  console.log(path);

  if (path === '/profile') {
    handleProfileSubmit();
  }
});

function handleProfileSubmit(event) {
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const bio = document.getElementById('bio').value;

  const user = {
    username: username,
    email: email,
    bio: bio,
  };

  console.log(user);

  localStorage.setItem('user', JSON.stringify(user));

  alert('프로필이 업데이트 되었습니다.');
}
