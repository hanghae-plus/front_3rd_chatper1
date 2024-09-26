beforeAll(() => {
  // DOM 초기화
  document.body.innerHTML = '<div id="root"></div>';
});
// 페이지별 템플릿을 불러오는 함수
const loadTemplate = async (template) => {
  return fetch(`./templates/${template}.html`).then(res => res.text());
};

// 각 페이지 컴포넌트 정의
const MainPage = async () => {
  const content = await loadTemplate('main');
  document.querySelector('#root').innerHTML = content;
};

const LoginPage = async () => {
  const content = await loadTemplate('login');
  document.querySelector('#root').innerHTML = content;

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
  document.querySelector('#root').innerHTML = content;

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
  document.querySelector('#root').innerHTML = content;
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
  const isLoggedIn = localStorage.getItem('loggedIn'); // 로그인 상태 확인

  if (page === 'login' && isLoggedIn) {
    history.pushState({}, '', '/main');  
    page = 'main';
  }
  if (page === 'profile' && !isLoggedIn) {
    history.pushState({}, '', '/login'); 
    page = 'login';
  }
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

  // 이벤트 위임을 통한 네비게이션 클릭 처리 및 전파 중단
  nav.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
      // 특정 링크에 대해 이벤트 전파를 중단하고 아무 동작도 일어나지 않게 하기
      if (e.target.getAttribute('href') === '/login') {
        e.stopPropagation(); // 이벤트 전파 중단
        return; // 아무 동작도 하지 않음
      }

      e.preventDefault();
      const page = e.target.getAttribute('href').replace('/', '');
      history.pushState({}, '', `/${page}`);
      renderPage(page);
    }
  });
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