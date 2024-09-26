// UserPreferences 관리 (LocalStorage 연동): 지연 초기화하는 방식
const UserPreferences = (() => {
  const getPreferences = () => JSON.parse(localStorage.getItem('user')) || {};

  return {
    get preferences() {
      return getPreferences(); // getter 호출 시 데이터 로딩
    },
    set(data) {
      localStorage.setItem('user', JSON.stringify(data));
    },
    delete() {
      localStorage.removeItem('user');
    },
  };
})();

// Router 구현 (싱글톤 패턴 적용)
const Router = (function () {
  let instance;

  function createInstance() {
    return {
      routes: {},
      // 로그인 상태를 확인하기 위해 getter를 호출
      isLoggedIn: !!UserPreferences.preferences.isLoggedIn, // 여기서 실제 로컬 스토리지에서 데이터가 로드됨
      addRoute(path, handler) {
        this.routes[path] = handler;
      },

      navigateTo(path) {
        history.pushState(null, '', path);
        this.handleRoute(path);
      },

      handlePopState() {
        this.handleRoute(window.location.pathname);
      },

      handleRoute(path) {
        const loginStatusRedirects = {
          '/profile': '/login', // 비로그인 상태에서는 프로필 접근 시 로그인 페이지로 리다이렉트
          '/login': '/', // 로그인 상태에서 로그인 페이지 접근 시 메인 페이지로 리다이렉트
        };

        if (loginStatusRedirects[path]) {
          if (
            (path === '/profile' && !this.isLoggedIn) ||
            (path === '/login' && this.isLoggedIn)
          ) {
            this.navigateTo(loginStatusRedirects[path]);
            return;
          }
        }

        const handler = this.routes[path] || this.routes['/404'];
        handler();
      },

      setLoginStatus(status) {
        this.isLoggedIn = status;
      },

      handleLogin() {
        this.setLoginStatus(true);
      },

      handleLogout() {
        this.setLoginStatus(false);
      },

      init() {
        window.addEventListener('popstate', this.handlePopState.bind(this));
      },
    };
  }

  return {
    getInstance() {
      if (!instance) instance = createInstance();
      return instance;
    },
  };
})();

const router = Router.getInstance();
router.init(); // 라우터 초기화

// 공통 Header 컴포넌트
const Header = (isLoggedIn) => {
  return `
    <header class="bg-blue-600 text-white p-4 sticky top-0">
      <h1 class="text-2xl font-bold">항해플러스</h1>
    </header>
  
    <nav class="bg-white shadow-md p-2 sticky top-14">
      <ul class="flex justify-around">
        <li><a href="/" class="text-blue-600 font-bold">홈</a></li>
        ${
          isLoggedIn
            ? '<li><a href="/profile" class="text-gray-600">프로필</a></li>'
            : ''
        }
        ${
          isLoggedIn
            ? '<li><a href="#" id="logout" class="text-gray-600">로그아웃</a></li>'
            : '<li><a href="/login" class="text-gray-600">로그인</a></li>'
        }
      </ul>
    </nav>
  `;
};

// 공통 Footer 컴포넌트
const Footer = () => {
  return `  
    <footer class="bg-gray-200 p-4 text-center">
      <p>&copy; 2024 항해플러스. All rights reserved.</p>
    </footer>
  `;
};

// 게시물 컴포넌트
const Post = ({ username, time, content }) => `
  <div class="bg-white rounded-lg shadow p-4">
    <div class="flex items-center mb-2">
      <img src="https://via.placeholder.com/40" alt="프로필" class="rounded-full mr-2">
      <div>
        <p class="font-bold">${username}</p>
        <p class="text-sm text-gray-500">${time}</p>
      </div>
    </div>
    <p>${content}</p>
    <div class="mt-2 flex justify-between text-gray-500">
      <button>좋아요</button>
      <button>댓글</button>
      <button>공유</button>
    </div>
  </div>
`;

// 게시물 목록 컴포넌트
const PostList = () => {
  const posts = [
    {
      username: '홍길동',
      time: '5분 전',
      content: '오늘 날씨가 정말 좋네요. 다들 좋은 하루 보내세요!',
    },
    {
      username: '김철수',
      time: '15분 전',
      content: '새로운 프로젝트를 시작했어요. 열심히 코딩 중입니다!',
    },
    {
      username: '이영희',
      time: '30분 전',
      content: '오늘 점심 메뉴 추천 받습니다. 뭐가 좋을까요?',
    },
    {
      username: '박민수',
      time: '1시간 전',
      content: '주말에 등산 가실 분 계신가요? 함께 가요!',
    },
    {
      username: '정수연',
      time: '2시간 전',
      content: '새로 나온 영화 재미있대요. 같이 보러 갈 사람?',
    },
  ];

  return posts.map((post) => Post(post)).join('');
};

// 컴포넌트 기반 구조 설계
const renderHomePage = (isLoggedIn) => {
  document.querySelector('#root').innerHTML = `
  <div class="bg-gray-100 min-h-screen flex justify-center">
      <div class="max-w-md w-full">
        ${Header(isLoggedIn)}  
        <main class="p-4">
          <div class="mb-4 bg-white rounded-lg shadow p-4">
            <textarea class="w-full p-2 border rounded" placeholder="무슨 생각을 하고 계신가요?"></textarea>
            <button class="mt-2 bg-blue-600 text-white px-4 py-2 rounded">게시</button>
          </div>  
          <div class="space-y-4">
            <div class="space-y-4">${PostList()}</div>
          </div>
        </main>  
        ${Footer()}
      </div>
    </div>
  `;

  // 로그아웃 버튼 클릭 이벤트 리스너 추가
  if (isLoggedIn) {
    document.getElementById('logout').addEventListener('click', (e) => {
      e.preventDefault();

      // LocalStorage에서 데이터 삭제
      UserPreferences.delete('user');

      router.handleLogout();
      router.navigateTo('/');
    });
  }
};

const renderProfilePage = (isLoggedIn) => {
  // LocalStorage에서 데이터 가져오기 (key: 'user')
  const user = UserPreferences.get('user');

  document.querySelector('#root').innerHTML = `
  <div class="bg-gray-100 min-h-screen flex justify-center">
    <div class="max-w-md w-full">
      ${Header(isLoggedIn)}
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
              <input type="email" id="email" name="email" value="${
                user.email
              }" class="w-full p-2 border rounded">
            </div>
            <div class="mb-6">
              <label for="bio" class="block text-gray-700 text-sm font-bold mb-2">자기소개</label>
              <textarea id="bio" name="bio" rows="4" class="w-full p-2 border rounded">${
                user.bio
              }</textarea>
            </div>
            <button type="submit" class="w-full bg-blue-600 text-white p-2 rounded font-bold">프로필 업데이트</button>
          </form>
        </div>
      </main>
  
      ${Footer()}
    </div>
  </div>
  `;

  document.getElementById('profile-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const userInfo = {
      username: document.getElementById('username').value,
      password: document.getElementById('userPw').value,
      email: document.getElementById('email').value,
      bio: document.getElementById('bio').value,
    };

    // LocalStorage에 데이터 저장 (key: 'user')
    UserPreferences.set(userInfo);
    alert('프로필이 업데이트되었습니다.');
  });

  // 로그아웃 버튼 클릭 이벤트 리스너 추가
  if (isLoggedIn) {
    document.getElementById('logout').addEventListener('click', (e) => {
      e.preventDefault();

      // LocalStorage에서 데이터 삭제 (key: 'user')
      UserPreferences.delete('user');

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

  // 사용자 이름 입력 이벤트 핸들러 등록
  const $username = document.querySelector('#username');
  $username.addEventListener(
    'input',
    (e) => {
      try {
        if (e.target.value === '1') {
          throw new Error('의도적인 오류입니다.');
        }
      } catch (error) {
        errorBoundary(error); // 에러를 에러 바운더리에 전달
      }
    },
    { once: true }
  );

  // 로그인 폼 제출 이벤트 핸들러
  document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const userInfo = {
      username: document.getElementById('username').value,
      password: document.getElementById('userPw').value,
      email: '',
      bio: '',
    };

    // LocalStorage에 데이터 저장 (key: 'user')
    UserPreferences.set(userInfo);
    router.handleLogin();
    router.navigateTo('/profile');
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
        <a href="/" class="bg-blue-600 text-white px-4 py-2 rounded font-bold">
          홈으로 돌아가기
        </a>
      </div>
    </main>
  `;
};

// 라우팅 설정 : 라우터에 경로와 해당 컴포넌트 등록
router.addRoute('/', () => renderHomePage(router.isLoggedIn));
router.addRoute('/profile', () => renderProfilePage(router.isLoggedIn));
router.addRoute('/login', () => renderLoginPage());
router.addRoute('/404', () => renderNotFoundPage());

// 초기화
document.addEventListener('DOMContentLoaded', () => {
  router.handleRoute(window.location.pathname);
  handleMenuActive(window.location.pathname); // 메뉴 활성화 처리
});

// 에러 바운더리 처리
function errorBoundary(error) {
  // 에러 메시지를 표시하는 부분
  document.querySelector('#root').innerHTML = `
    <div>
      <p>오류 발생!</p>
      <p>${error.message}</p>
    </div>
  `;
}

// 메뉴 활성화
const handleMenuActive = (currentPath) => {
  const navLinks = document.querySelectorAll('nav a');

  navLinks.forEach((link) => {
    link.classList.remove('text-blue-600', 'font-bold');
    link.classList.add('text-gray-600');

    if (link.getAttribute('href').replace('.', '') === currentPath) {
      link.classList.remove('text-gray-600');
      link.classList.add('text-blue-600', 'font-bold');
    }
  });
};

// 네비게이션 이벤트 처리 (링크 클릭 시 페이지 전환)
document.addEventListener('click', (e) => {
  const link = e.target.closest('nav a');
  if (link) {
    e.preventDefault();
    router.navigateTo(link.pathname);
    handleMenuActive(link.pathname);
  }
});

// 전역 에러 처리
window.addEventListener('error', (e) => {
  e.preventDefault();
});
