// 태그사용
// ID : # ex) document.querySelector('#root')
// class : . ex) document.querySelector('.root')
// 태그 : 없음 ex) document.querySelector('root')

document.querySelector("#root").innerHTML = `
<div class="bg-gray-100 min-h-screen flex justify-center">
    <div class="max-w-md w-full">
      <header class="bg-blue-600 text-white p-4 sticky top-0">
        <h1 class="text-2xl font-bold">항해플러스</h1>
      </header>

      <nav class="bg-white shadow-md p-2 sticky top-14">
        <ul class="flex justify-around">
          <li><a href="/" class="text-blue-600">홈</a></li>
          <li><a href="/login" class="text-gray-600">로그인</a></li>
        </ul>
      </nav>

      <main id="content" class="p-4">
        <!-- 초기 페이지가 홈 -->
      </main>

      <footer class="bg-gray-200 p-4 text-center">
        <p>&copy; 2024 항해플러스. All rights reserved.</p>
      </footer>
    </div>
  </div>
`;

class Router {
  constructor() {
    this.routes = {};
    window.addEventListener("popstate", this.handlePopState.bind(this));
  }

  addRoute(path, handler) {
    this.routes[path] = handler;
  }

  navigateTo(path) {
    history.pushState(null, "", path);
    this.handleRoute(path);
  }

  handlePopState() {
    this.handleRoute(window.location.pathname);
  }

  handleRoute(path) {
    const HANDLER = this.routes[path];
    if (HANDLER) {
      HANDLER();
    } else {
      // 경로가 등록되지 않았을 때 에러 페이지로 이동
      console.log("Route not found, navigating to error page.");
      this.routes["/error"](); // 에러 페이지 핸들러 호출
    }
  }
  
}

// 라우터 인스턴스 생성
const ROUTER = new Router();

// 메인 홈
function hasHomePage() {
  ROUTER.addRoute("/", () => {
    document.querySelector("#content").innerHTML = `
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
    `;
    // 네비게이션 클릭 이벤트 처리
    document.querySelector("nav").addEventListener("click", (e) => {
      if (e.target.tagName === "A") {
        e.preventDefault(); // 페이지를 새로고침 하지않고 동적으로 콘텐츠를 바꾸는 역할. 자바스크립트 내에서 라우팅 처리하는 역할.
        const PATH = e.target.getAttribute("href"); // getAttribute : 속성값을 불러오는 메소드
        ROUTER.navigateTo(PATH);
      }
    });
  });
}

// 로그인 페이지
function hasLogin() {
  ROUTER.addRoute("/login", () => {
    document.querySelector("#root").innerHTML = `
    <div id="root">
      <main class="bg-gray-100 flex items-center justify-center min-h-screen">
        <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 class="text-2xl font-bold text-center text-blue-600 mb-8">항해플러스</h1>
          <form>
            <div class="mb-4">
              <input type="text" placeholder="이메일 또는 전화번호" class="w-full p-2 border rounded">
            </div>
            <div class="mb-6">
              <input type="password" placeholder="비밀번호" class="w-full p-2 border rounded">
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
    </div>
    `;
    document.querySelector("#root").addEventListener("submit", (e) => {
      e.preventDefault(); // 페이지를 새로고침 하지않고 동적으로 콘텐츠를 바꾸는 역할. 자바스크립트 내에서 라우팅 처리하는 역할.
      ROUTER.navigateTo("/profile");
    });
  });
}

// 프로필
function hasProfile() {
  ROUTER.addRoute("/profile", () => {
    document.querySelector("main").innerHTML = `
    <div class="bg-gray-100 min-h-screen flex justify-center">
    <div class="max-w-md w-full">
      <header class="bg-blue-600 text-white p-4 sticky top-0">
        <h1 class="text-2xl font-bold">항해플러스</h1>
      </header>

      <nav class="bg-white shadow-md p-2 sticky top-14">
        <ul class="flex justify-around">
          <li><a href="/" class="text-blue-600">홈</a></li>
          <li><a href="/profile" class="text-gray-600">프로필</a></li>
          <li><a href="/login" class="text-gray-600">로그아웃</a></li>
        </ul>
      </nav>

      <main id="content" class="p-4">
        <div class="bg-white p-8 rounded-lg shadow-md">
        <h2 class="text-2xl font-bold text-center text-blue-600 mb-8">내 프로필</h2>
        <form id="profileForm" class="space-y-4">
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
            <textarea id="bio" name="bio" rows="4" class="w-full p-2 border rounded">안녕하세요, 항해플러스에서 열심히 공부하고 있는 홍길동입니다.</textarea>
          </div>
          <button type="submit" class="w-full bg-blue-600 text-white p-2 rounded font-bold">프로필 업데이트</button>
          <div class="alert alert-dark" role="alert"></div>
        </form>
        </div>
      </main>

      <footer class="bg-gray-200 p-4 text-center">
        <p>&copy; 2024 항해플러스. All rights reserved.</p>
      </footer>
    </div>
  </div>`;
    // 프로필 업데이트 이벤트 처리
    document.querySelector("#profileForm").addEventListener("submit", (e) => {
      e.preventDefault(); // 기본 폼 제출 방지
      console.log("폼이 제출되었습니다."); // 확인용 로그
      const ALERTDIV = document.querySelector(".alert.alert-dark");
      ALERTDIV.innerHTML = "프로필이 업데이트되었습니다!"; // 알림 메시지
      alert("프로필이 업데이트되었습니다!"); // 실제 alert 창 표시
    });
    // 네비게이션 클릭 이벤트 처리
    document.querySelector("nav").addEventListener("click", (e) => {
      if (e.target.tagName === "A") {
        e.preventDefault(); // 페이지를 새로고침 하지않고 동적으로 콘텐츠를 바꾸는 역할. 자바스크립트 내에서 라우팅 처리하는 역할.
        const PATH = e.target.getAttribute("href"); // getAttribute : 속성값을 불러오는 메소드
        ROUTER.navigateTo(PATH);
      }
    });
  });
}

// 에러 페이지
function hasError() {
  ROUTER.addRoute("/error", () => {
    document.querySelector("#content").innerHTML = `
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
    </main>`;
  });
}

// handleRoute 함수 수정: 경로가 없는 경우 에러 페이지로 이동
ROUTER.handleRoute = function (path) {
  const handler = this.routes[path];
  console.log(handler)
  if (handler) {
    console.log(handler)
    handler();
  } else {
    console.log("Route not found, navigating to error page.");
    this.navigateTo("/error"); // 경로가 존재하지 않으면 에러 페이지로 이동
  }
};

// 라우터 경로 설정
hasHomePage();
hasLogin();
hasProfile();
hasError(); // 에러 페이지 라우트 추가

// 기본 경로로 이동 (홈 화면)
ROUTER.navigateTo("/");
