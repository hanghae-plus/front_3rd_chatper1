document.addEventListener("DOMContentLoaded", () => {
  function router() {
    const path = window.location.pathname;

    switch (path) {
      case "/":
        renderHome();
        break;
      case "/login":
        renderLogin();
        break;
      case "/profile":
        renderProfile();
        break;
      default:
        renderNotFound();
        break;
    }
  }

  // 각 페이지를 렌더링하는 함수들
  function renderHome() {
    document.querySelector("#root").innerHTML = `
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
  }

  function renderLogin() {
    document.title = "Login";
    document.querySelector("#root").innerHTML = `
  <div class="bg-gray-100 min-h-screen flex justify-center">
    <div class="max-w-md w-full">
      <main class="p-4">
       <div class="mb-4 bg-white rounded-lg shadow p-6 text-center">
        <h1 class="text-2xl font-bold text-blue-600 mb-6">항해플러스</h1>
        <form id="login-form">
          <input id="username" type="text" class="rounded-md w-full border p-2" placeholder="이메일 또는 전화번호" name="" id="" />
          <input id="password" type="text" class="rounded-md w-full border p-2 my-4" placeholder="비밀번호" name="" id="" />
          <button class="rounded-md w-full bg-blue-600 text-white py-2">로그인</button>
        </form>
         <p class="my-6 text-blue-500">비밀번호를 잊으셨나요?</p>
         <div class="border border-gray-100"></div>
         <button class="mt-6 text-white bg-green-600 px-3 py-2 rounded-md">새 계정 만들기</button>
        </div>
      </main>
    </div>
  </div>`;

    // 로그인 폼 이벤트 리스너
    document.getElementById("login-form").addEventListener("submit", (e) => {
      e.preventDefault();
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;

      if (username === "" || password === "")
        return alert("모든 정보를 입력해주세요.");
      localStorage.setItem("username", username);
      history.pushState({}, "", "/profile");
      router();
    });
  }

  function renderProfile() {
    const username = localStorage.getItem("username");
    const email = localStorage.getItem("email")
      ? localStorage.getItem("email")
      : "";
    const introduction = localStorage.getItem("introduction")
      ? localStorage.getItem("introduction")
      : "";

    document.querySelector(
      "#root"
    ).innerHTML = `<div class="bg-gray-100 min-h-screen flex justify-center">
    <div class="max-w-md w-full">
      <header class="bg-blue-600 text-white p-4 sticky top-0">
        <h1 class="text-2xl font-bold">항해플러스</h1>
      </header>

      <nav class="bg-white shadow-md p-2 sticky top-14">
        <ul class="flex justify-around">
          <li><a href="/" class="text-gray-600">홈</a></li>
          <li><a href="/profile" class="text-blue-600">프로필</a></li>
          <li><a href="/login" class="text-gray-600">로그아웃</a></li>
        </ul>
      </nav>

      <main class="p-4">
        <div class="mb-4 bg-white rounded-lg shadow p-6 text-center">
        <h1 class="text-2xl font-bold text-blue-600 mb-6">내 프로필</h1>
        <form id="login-form" class="text-left">
          <label for="" c>사용자 이름 </label>
          <input id="username" type="text" class="rounded-md w-full border p-2 mb-6" value="${username}" />
          <label for="" >이메일</label>
          <input id="" type="text" class="rounded-md w-full border p-2 mb-6" placeholder="이메일" value="${email}"  />
           <label for="">자기소개</label>
          <textarea id="" class="rounded-md w-full border p-2 mb-6" placeholder="자기소개" />${introduction}</textarea>
          <button class="rounded-md w-full bg-blue-600 text-white py-2">프로필 업데이트</button>
        </form>
      </main>

      <footer class="bg-gray-200 p-4 text-center">
        <p>&copy; 2024 항해플러스. All rights reserved.</p>
      </footer>
    </div>
  </div>`;
  }

  function renderNotFound() {
    document.title = "404 Not Found";
    document.querySelector("#root").innerHTML = `
           <div class="bg-gray-100 min-h-screen flex justify-center">
    <div class="max-w-md w-full">
     

      <main class="p-4">
        NOT
      </main>

     
    </div>
  </div>`;
  }

  // 브라우저에서 뒤로 가기 등을 처리하기 위한 이벤트 리스너
  window.addEventListener("popstate", router);

  // 초기 로드 시 라우팅 함수 실행
  router();

  // 네비게이션 링크 클릭 시 페이지 전환
  document.querySelectorAll("nav a").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const href = e.target.getAttribute("href");
      history.pushState({}, "", href);
      router();
    });
  });
});
