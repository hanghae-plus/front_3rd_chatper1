const Header = () => `
        <header class="bg-blue-600 text-white p-4 sticky top-0">
          <h1 class="text-2xl font-bold">항해플러스</h1>
        </header>
      `;

const Footer = () => `
      <footer class="bg-gray-200 p-4 text-center">
        <p>&copy; 2024 항해플러스. All rights reserved.</p>
      </footer>`;

const Nav = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const currentPath = window.location.pathname;

  return `
    <nav class="bg-white shadow-md p-2 sticky top-14">
      <ul class="flex justify-around">
        <li><a href="/" class="${
          currentPath === "/"
            ? "text-blue-600 font-bold"
            : "text-gray-600 font-bold"
        }">홈</a></li>
        ${
          user
            ? `
            <li><a href="/profile" class="${
              currentPath === "/profile"
                ? "text-blue-600 font-bold"
                : "text-gray-600 font-bold"
            }">프로필</a></li>
            <li><button id="logout" class="text-gray-600 font-bold">로그아웃</button></li>
          `
            : `
            <li><a href="/login" class="${
              currentPath === "/login"
                ? "text-blue-600 font-bold"
                : "text-gray-600 font-bold"
            }">로그인</a></li>
          `
        }
      </ul>
    </nav>
  `;
};

const Layout = (content, shouldInclude) => `
  <div class="bg-gray-100 min-h-screen flex justify-center">
    <div class="max-w-md w-full">
      ${shouldInclude ? Header() : ""}
      ${shouldInclude ? Nav() : ""}
      ${content}
      ${shouldInclude ? Footer() : ""}
    </div>
  </div>
`;

const pages = {
  "/": `
             <main class="p-4">
               <div class="mb-4 bg-white rounded-lg shadow p-4">
                 <textarea
                   class="w-full p-2 border rounded"
                   placeholder="무슨 생각을 하고 계신가요?"
                 ></textarea>
                 <button class="mt-2 bg-blue-600 text-white px-4 py-2 rounded">
                   게시
                 </button>
               </div>
               <div class="space-y-4">
                 <div class="bg-white rounded-lg shadow p-4">
                   <div class="flex items-center mb-2">
                     <img
                       src="https://via.placeholder.com/40"
                       alt="프로필"
                       class="rounded-full mr-2"
                     />
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
                     <img
                       src="https://via.placeholder.com/40"
                       alt="프로필"
                       class="rounded-full mr-2"
                     />
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
                     <img
                       src="https://via.placeholder.com/40"
                       alt="프로필"
                       class="rounded-full mr-2"
                     />
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
                     <img
                       src="https://via.placeholder.com/40"
                       alt="프로필"
                       class="rounded-full mr-2"
                     />
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
                     <img
                       src="https://via.placeholder.com/40"
                       alt="프로필"
                       class="rounded-full mr-2"
                     />
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
             </main>`,

  "/login": `
      <main class="bg-gray-100 flex items-center justify-center min-h-screen">
        <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 class="text-2xl font-bold text-center text-blue-600 mb-8">항해플러스</h1>
          <form id="login-form">
            <div class="mb-4">
              <input type="text" id="username" placeholder="이메일 또는 전화번호" class="w-full p-2 border rounded" required>
            </div>
            <div class="mb-6">
              <input type="password" placeholder="비밀번호" class="w-full p-2 border rounded" required>
            </div>
            <button type="submit" class="w-full bg-blue-600 text-white p-2 rounded font-bold">로그인</button>
          </form>
          <div id="error-message" class="text-red-600 mt-2"></div>
          <div class="mt-4 text-center">
            <a href="#" class="text-blue-600 text-sm">비밀번호를 잊으셨나요?</a>
          </div>
          <hr class="my-6">
          <div class="text-center">
            <button class="bg-green-500 text-white px-4 py-2 rounded font-bold">새 계정 만들기</button>
          </div>
        </div>
      </main>`,

  "/profile": (user) => `
            <main class="p-4">
              <div class="bg-white p-8 rounded-lg shadow-md">
                <h2 class="text-2xl font-bold text-center text-blue-600 mb-8">내 프로필</h2>
                <form id="profile-form">
                  <div class="mb-4">
                    <label for="username" class="block text-gray-700 text-sm font-bold mb-2">사용자 이름</label>
                    <input type="text" id="username" value="${
                      user.username
                    }" class="w-full p-2 border rounded" readonly />
                  </div>
                  <div class="mb-4">
                    <label for="email" class="block text-gray-700 text-sm font-bold mb-2">이메일</label>
                    <input type="email" id="email" value="${
                      user.email || ""
                    }" class="w-full p-2 border rounded" />
                  </div>
                  <div class="mb-4">
                    <label for="bio" class="block text-gray-700 text-sm font-bold mb-2">자기소개</label>
                    <textarea id="bio" class="w-full p-2 border rounded" rows="4">${
                      user.bio || ""
                    }</textarea>
                  </div>
                  <button type="submit" class="w-full bg-blue-600 text-white p-2 rounded font-bold">프로필 업데이트</button>
                </form>
              </div>
            </main>`,
  "/404": `<main class="bg-gray-100 flex items-center justify-center min-h-screen">
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
    </main>`,
};

const shouldIncludeComponents = (path) => {
  return ["/", "/profile"].includes(path); // 메인 페이지와 프로필 페이지에만 포함
};

// 페이지 렌더링 함수
const renderPage = (path) => {
  const root = document.getElementById("root");
  const user = JSON.parse(localStorage.getItem("user"));

  // 로그인하지 않은 상태에서 /profile로 접근 시 리다이렉트
  if (path === "/profile" && !user) {
    return goTo("/login");
  }

  // 로그인 한 상태에서 /login로 접근 시 리다이렉트
  if (path === "/login" && user) {
    return goTo("/");
  }

  const pageContent =
    typeof pages[path] === "function"
      ? pages[path](user)
      : pages[path] || pages["/404"];

  // Header, Footer, Nav를 필요한 페이지에만 포함
  const shouldInclude = shouldIncludeComponents(path);

  // 공통 레이아웃으로 페이지를 감싸서 렌더링
  root.innerHTML = Layout(pageContent, shouldInclude);

  if (path === "/login") {
    const loginForm = document.getElementById("login-form");
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const username = document.getElementById("username").value;

      try {
        if (!username.trim()) {
          throw new Error("사용자 이름을 입력하세요.");
        }
        localStorage.setItem(
          "user",
          JSON.stringify({ username, email: "", bio: "" })
        );
        goTo("/profile");
      } catch (error) {
        handleError(error);
      }
    });
  }

  if (path === "/profile") {
    const profileForm = document.getElementById("profile-form");
    profileForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("email").value;
      const bio = document.getElementById("bio").value;
      localStorage.setItem("user", JSON.stringify({ ...user, email, bio }));
      alert("프로필이 수정되었습니다.");
    });
  }

  const logoutButton = document.getElementById("logout");
  if (logoutButton) {
    logoutButton.addEventListener("click", () => {
      localStorage.removeItem("user");
      goTo("/login");
    });
  }
};

// 에러 처리
const handleError = (error) => {
  const errorMessageElement = document.createElement("div");
  errorMessageElement.id = "global-error-message";
  errorMessageElement.textContent = `오류 발생! ${error.message}`;

  document.body.appendChild(errorMessageElement); // 에러 메시지를 body에 추가
};

// 이벤트 핸들러에 에러 핸들링 추가
window.addEventListener("error", (event) => {
  event.preventDefault(); // 기본 에러 로그 방지
  handleError(event.error); // 에러 핸들링 함수 호출
});

// History API를 사용한 라우팅
window.addEventListener("popstate", () => {
  renderPage(window.location.pathname);
});

// 페이지 이동 함수
const goTo = (path) => {
  window.history.pushState({}, "", path);
  renderPage(path);
};

// 초기 페이지 렌더링
document.addEventListener("DOMContentLoaded", () => {
  renderPage(window.location.pathname);
});
