let isError = false;
// 페이지 렌더링 함수들
const renderHeader = () => {
  const user = JSON.parse(localStorage.getItem("user")) || null; // 사용자 정보 가져오기 , null 처리
  const isLoggedIn = user; // 로그인 상태 확인
  return `
    <header class="bg-blue-600 text-white p-4 sticky top-0">
      <h1 class="text-2xl font-bold">항해플러스</h1>
    </header>
    <nav class="bg-white shadow-md p-2 sticky top-14">
      <ul class="flex justify-around">
        <li><a href="/" class="text-blue-600 font-bold">홈</a></li>
        ${
          isLoggedIn
            ? "<li><a href='/profile' class='text-gray-600'>프로필</a></li><li><a id='logout' class='text-gray-600'>로그아웃</a></li>"
            : "<li><a href='/login' class='text-gray-600'>로그인</a></li>"
        }
      </ul>
    </nav>
  `;
};

// Footer 컴포넌트 함수
const renderFooter = () => {
  return `
    <footer class="bg-gray-200 p-4 text-center">
      <p>&copy; 2024 항해플러스. All rights reserved.</p>
    </footer>
  `;
};

const renderHomePage = () => {
  document.querySelector("#root").innerHTML = `
      <div class="bg-gray-100 min-h-screen flex justify-center">
          <div class="max-w-md w-full">
          ${renderHeader()}

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
  // 로그아웃 버튼이 있을 경우에만 이벤트 핸들러 등록
  const logoutButton = document.getElementById("logout");
  if (logoutButton) {
    logoutButton.addEventListener("click", () => {
      localStorage.removeItem("user"); // 사용자 정보를 완전히 삭제
      window.history.pushState({}, "", "/");
      router();
    });
  }
};

const renderLoginPage = () => {
  // throw new Error("의도적인 오류입니다.");
  const user = JSON.parse(localStorage.getItem("user")) || null; // 사용자 정보 가져오기 , null 처리
  const isLoggedIn = user; // 로그인 상태 확인

  if (isLoggedIn) {
    window.history.pushState({}, "", "/home");
    renderHomePage();
    return;
  }

  document.querySelector("#root").innerHTML = `
      <main class="bg-gray-100 flex items-center justify-center min-h-screen">
        <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 class="text-2xl font-bold text-center text-blue-600 mb-8">항해플러스</h1>
          <form id="login-form">
            <div class="mb-4">
              <input type="text" id="username" placeholder="사용자 이름" class="w-full p-2 border rounded">
            </div>
            <div class="mb-6">
              <input type="password" id="password" placeholder="비밀번호" class="w-full p-2 border rounded">
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
      <div class="bg-red-500 text-white p-4 rounded mt-4" style="display: ${
        isError ? "block" : "none"
      };">
        오류 발생!<br/>
        의도적인 오류입니다.
      </div>
      
    `;

  document.getElementById("login-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value || "";
    const password = document.getElementById("password").value || "";

    const email = ""; // 이메일 필드는 일단 빈 값
    const user = {
      username,
      email,
      bio: "",
    };
    // 사용자 정보를 localStorage에 저장
    localStorage.setItem("user", JSON.stringify(user));
    // 로그인 상태이므로 즉시 프로필 페이지로 이동
    window.history.pushState({}, "", "/profile");
    router(); // 프로필 페이지로 이동
  });
};

const renderProfilePage = () => {
  window.history.pushState({}, "", "/login");
  router(); // 프로필 페이지로 이동
  const user = JSON.parse(localStorage.getItem("user")) || null; // 사용자 정보 가져오기 , null 처리
  const isLoggedIn = user; // 로그인 상태 확인
  if (!isLoggedIn) {
    window.history.pushState({}, "", "/profile");
    renderLoginPage();
    return;
  }
  document.querySelector("#root").innerHTML = `
  <div class="bg-gray-100 min-h-screen flex justify-center">
    <div class="max-w-md w-full">
 ${renderHeader()}

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

     ${renderFooter()}
    </div>
  </div>
  `;
  // 로그인 폼 제출 이벤트 핸들러
  document.getElementById("profile-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const bio = document.getElementById("bio").value;
    // 사용자 정보를 localStorage에 저장
    const user = {
      username: username,
      email: email,
      bio: bio,
    };
    localStorage.setItem("user", JSON.stringify(user));
    alert(`프로필이 업데이트되었습니다.`);
  });

  if (isLoggedIn) {
    document.getElementById("logout").addEventListener("click", (e) => {
      window.history.pushState({}, "", "/login");
      localStorage.removeItem("user"); // 사용자 정보를 완전히 삭제
      router();
    });
  }
};

const renderNotFoundPage = () => {
  document.querySelector("#root").innerHTML = `
    <main class="bg-gray-100 flex items-center justify-center min-h-screen">
      <div class="bg-white p-8 rounded-lg shadow-md w-full text-center" style="max-width: 480px">
        <h1 class="text-2xl font-bold text-blue-600 font-bold mb-4">항해플러스</h1>
        <p class="text-4xl font-bold text-gray-800 mb-4">404</p>
        <p class="text-xl text-gray-600 mb-8">페이지를 찾을 수 없습니다</p>
        <p class="text-gray-600 mb-8">요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.</p>
        <a href="/" class="bg-blue-600 text-white px-4 py-2 rounded font-bold"> 홈으로 돌아가기 </a>
      </div>
    </main>
  `;
};

window.addEventListener("error", () => {
  window.history.pushState({}, "", "/error");
  router();
});

// 라우팅 함수
const router = () => {
  const path = window.location.pathname;
  const user = JSON.parse(localStorage.getItem("user")) || { email: "" }; // 사용자 정보 가져오기 , null 처리
  switch (path) {
    case "/":
      renderHomePage();
      break;
    case "/login":
      renderLoginPage();
      break;
    case "/profile":
      renderProfilePage();
      break;
    case "/error":
      () => "<div>오류 발생! <br> 의도적인 오류입니다.</div>";
      break;
    default:
      renderNotFoundPage();
      break;
  }
};

// 네비게이션 이벤트 처리
const handleLinkClick = (e) => {
  e.preventDefault();
  const href = e.target.getAttribute("href");
  if (href) {
    window.history.pushState(null, null, href);
    router();
  }
};

// 페이지 로드 시 라우터 실행
window.addEventListener("popstate", router);
document.addEventListener("DOMContentLoaded", () => {
  // 로컬스토리지에서 'user' 값을 가져옴
  let storedUser = localStorage.getItem("user");

  // 로컬스토리지에 값이 없으면 (null일 경우)
  if (!storedUser) {
    // 기본 유저 정보를 초기화
    localStorage.removeItem("user"); // 사용자 정보를 완전히 삭제
  }
  document.body.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      handleLinkClick(e);
    }
  });
  router();
});
