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

// 페이지를 로드하고 렌더링하는 함수
const renderPage = async (page) => {
  let content;

  const validPages = ['main', 'profile', 'login'];

  // 페이지 이름이 없으면 기본 페이지(main)를 로드
  if (page === '') {
    content = await fetch('./templates/main.html').then(res => res.text());
  } else if (validPages.includes(page)) {
    // 유효한 페이지 이름일 경우 해당 페이지를 로드
    content = await fetch(`./templates/${page}.html`).then(res => res.text());
  } else {
    // 유효하지 않은 페이지일 경우 에러 페이지를 로드
    content = await fetch('./templates/error.html').then(res => res.text());
  }

  // 내용을 root에 렌더링
  root.innerHTML = content;

  // 페이지가 렌더링된 후 네비게이션 및 페이지별 추가 로직 업데이트
  updateNavigation();  
  handlePageSpecificLogic(page);
};

// 페이지별 추가 처리 (로그인 이벤트 등)
const handlePageSpecificLogic = (page) => {
  if (page === 'login') {
    const loginForm = document.querySelector('form');

    if (loginForm) {
      loginForm.addEventListener('submit', (e) => {
        e.preventDefault(); // 기본 제출 동작 방지

        const username = document.querySelector('input[type="text"]').value;
        const password = document.querySelector('input[type="password"]').value;

        // 입력값 확인 후 로컬스토리지에 저장
        if (username && password) {
          localStorage.setItem('username', username);
          localStorage.setItem('password', password);
          localStorage.setItem('loggedIn', true);

          // 프로필 페이지로 이동
          history.pushState({}, '', '/profile');
          renderPage('profile');
        } else {
          alert('사용자이름과 비밀번호를 입력하세요.');
        }
      });
    }
  }

   // 프로필 페이지 처리
  if (page === 'profile') {
    const storedUsername = localStorage.getItem('username');
    const storedEmail = localStorage.getItem('email');
    const storedBio = localStorage.getItem('bio');

    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const bioInput = document.getElementById('bio');

    // 저장된 값이 있으면 각 필드에 설정
    if (storedUsername && usernameInput) usernameInput.value = storedUsername;
    if (storedEmail && emailInput) emailInput.value = storedEmail;
    if (storedBio && bioInput) bioInput.value = storedBio;

    const profileForm = document.querySelector('form');

    // 프로필 업데이트 이벤트 처리
    profileForm.addEventListener('submit', (e) => {
      e.preventDefault(); // 기본 폼 제출 동작 방지

      const updatedUsername = usernameInput.value;
      const updatedEmail = emailInput.value;
      const updatedBio = bioInput.value;

      // 로컬스토리지에 새 값을 저장
      if (updatedUsername && updatedEmail && updatedBio) {
        localStorage.setItem('username', updatedUsername);
        localStorage.setItem('email', updatedEmail);
        localStorage.setItem('bio', updatedBio);
        alert('프로필이 업데이트되었습니다.');
      } else {
        alert('모든 필드를 입력하세요.');
      }
    });
  }
};


// 네비게이션 업데이트 함수
const updateNavigation = () => {
  const nav = document.querySelector('nav ul'); // 네비게이션 요소 가져오기
  if (!nav) return; // nav가 존재하지 않으면 함수를 종료

  const isLoggedIn = localStorage.getItem('loggedIn'); // 로그인 상태 확인

  if (isLoggedIn) {
    // 로그인 상태일 때 네비게이션
    nav.innerHTML = `
      <li><a href="./main.html" class="text-blue-600">홈</a></li>
      <li><a href="./profile.html" class="text-gray-600">프로필</a></li>
      <li><a href="#" id="logout" class="text-gray-600">로그아웃</a></li>
    `;
  } else {
    // 비로그인 상태일 때 네비게이션
    nav.innerHTML = `
      <li><a href="./main.html" class="text-blue-600">홈</a></li>
      <li><a href="./login.html" class="text-gray-600">로그인</a></li>
    `;
  }

  // 로그아웃 버튼 클릭 시 처리
  const logoutButton = document.getElementById('logout');
  if (logoutButton) {
    logoutButton.addEventListener('click', (e) => {
      e.preventDefault();
      localStorage.removeItem('loggedIn'); // 로그인 상태 제거
      window.location.reload(); // 페이지 새로고침
    });
  }
};

// 현재 URL에서 페이지 이름을 가져오는 함수
const getCurrentPage = () => {
  const path = window.location.pathname;
  const page = path.replace('/', '').replace('.html', ''); // 경로에서 불필요한 부분을 제거
  return page || 'main'; // 기본 페이지를 'main'으로 설정
};

// 초기 페이지 로드
renderPage(getCurrentPage());

// 네비게이션 링크 클릭 이벤트 처리
document.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') {
    e.preventDefault(); // 기본 링크 동작을 막음
    const page = e.target.getAttribute('href').replace('./', '').replace('.html', ''); // 링크에서 페이지 이름을 추출
    history.pushState({}, '', `/${page}`); // URL을 히스토리 스택에 푸시
    renderPage(page); // 페이지 렌더링
  }
});

// 브라우저의 뒤로가기 및 앞으로가기 버튼 처리
window.onpopstate = () => {
  renderPage(getCurrentPage()); // URL에 맞는 페이지를 렌더링
};

// 페이지가 처음 로드될 때 현재 URL에 맞는 페이지 렌더링
window.onload = () => {
  renderPage(getCurrentPage());
};
