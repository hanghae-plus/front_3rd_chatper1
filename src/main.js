// 태그사용
// ID : # ex) document.querySelector('#root')
// class : . ex) document.querySelector('.root')
// 태그 : 없음 ex) document.querySelector('root')

/* 페이지화면 */

// 초기화면

function isLoginBefore() {
  return `
    <nav class="bg-white shadow-md p-2 sticky top-14">
      <ul class="flex justify-around">
        <li><a href="./" class="text-blue-600">홈</a></li>
        <li><a href="./login" class="text-gray-600">로그인</a></li>
      </ul>
    </nav>
  `;
}

function isLoginAfter() {
  return `
    <nav class="bg-white shadow-md p-2 sticky top-14">
      <ul class="flex justify-around">
        <li><a href="./" class="text-blue-600">홈</a></li>
        <li><a href="./profile" class="text-gray-600">프로필</a></li>
        <li><a href="#" class="text-gray-600">로그아웃</a></li>
      </ul>
    </nav>
  `;
}

function isHeader() {
  return `
    <header class="bg-blue-600 text-white p-4 sticky top-0">
      <h1 class="text-2xl font-bold">항해플러스</h1>
    </header>
  `;
}

function isFooter() {
  return `
    <footer class="bg-gray-200 p-4 text-center">
      <p>&copy; 2024 항해플러스. All rights reserved.</p>
    </footer>
  `;
}

function isError() {
  return `
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
}

// 메인 홈
function isHomePage() {
  return `
  ${isLoginBefore()}
  <main id="content" class="p-4">
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
  `;
}

// 로그인 페이지
function isLogin() {
  return `
    <main class="bg-gray-100 flex items-center justify-center min-h-screen">
      <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 class="text-2xl font-bold text-center text-blue-600 mb-8">항해플러스</h1>
        <form id="login-form">
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
  `;
}

// 프로필
function isProfile() {
  return `
  ${isLoginAfter()}
    <main id="content" class="p-4">
      <div class="bg-white p-8 rounded-lg shadow-md">
      <h2 class="text-2xl font-bold text-center text-blue-600 mb-8">내 프로필</h2>
      <form id="profile-form" class="space-y-4">
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
  `;
}

function isLayout({
  children,
  disableHeader,
  disableFooter
}) {
  return `
    <div class="bg-gray-100 min-h-screen flex justify-center">
      <div class="max-w-md w-full">
        ${disableHeader ? "" : isHeader()}
        ${children}
        ${disableFooter ? "" : isFooter()}
      </div>
    </div>
  `;
}

function TabList() {
  const user = controlUserData.getUser();
  const tabListHtml = tabList
    .map((tab) => {
      const currentPath = window.location.pathname;
      if (user && tab.path === "/login") {
        return "";
      }
      if (
        tab.isPublic ||
        (!tab.isPublic && user) ||
        (tab.path === "/login" && !user)
      ) {
        return `<li><a href="${tab.path}" id="${tab.id}" class="${
          tab.path === currentPath ? "text-blue-600 font-bold" : "text-gray-600"
        }">${tab.name}</a></li>`;
      }
      return "";
    })
    .join("");

  return `
      <nav class="bg-white shadow-md p-2 sticky top-14">
        <ul id='tab-list' class="flex justify-around">
          ${tabListHtml}  
        </ul>
      </nav>
      `;
}

// utils

// 라우터
class Router {
  constructor(notFound) {
    this.routes = {};
    this.notFound = notFound;
    window.addEventListener("popstate", this.handlePopState.bind(this)); // 뒤로가기, 앞으로가기에 대응
  }

  addRoute(path, handler) {
    this.routes[path] = handler;
  }

  navigateTo(path) {
    history.pushState(null, "", path);
    this.handleRoute(path);
  }

  handlePopState() {
    this.handleRoute(window.location.pathname); // 뒤로가기 및 앞으로 가기를 눌렀을 때 현재 경로 처리
  }

  handleRoute(path) {
    const handler = this.routes[path];
    console.log(handler);
    if (handler) {
      console.log(handler);
      handler();
    } else {
      // 경로가 등록되지 않았을 때 에러 페이지로 이동
      console.log("Route not found, navigating to error page.");
      this.notFound(); // 에러 페이지 핸들러 호출
    }
  }

  redirectTo(path, condition) {
    if (condition) {
      this.navigateTo(path);
    }
  }
}

//세션 스토리지 관리
class ControlUser {
  constructor() {
    this.storage = new Storage();
    this.user = this.storage.getParsed("user");
  }
  login(data, callback) {
    this.storage.set("user", data);
    this.user = data;
    callback();
  }
  update(data, callback) {
    this.storage.set("user", data);
    this.user = data;
    callback();
  }
  logout(callback) {
    this.storage.remove("user");
    this.user = null;
    callback();
  }
  getUser() {
    return this.user;
  }
}

// 세션 스토리지
class Storage {
  constructor() {
    this.storage = localStorage;
  }

  get(key) {
    return this.storage.getItem(key);
  }

  getParsed(key) {
    return JSON.parse(this.storage.getItem(key));
  }

  set(key, value) {
    this.storage.setItem(key, JSON.stringify(value));
  }

  remove(key) {
    this.storage.removeItem(key);
  }
}

function getFormData(elements) {
  return Object.fromEntries(new FormData(elements).entries());
}

function submitForm(form, callback) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = getFormData(form);
    callback(formData);
  });
}

//렌더링

function isRender(targetName, html) {
  document.querySelector(targetName).innerHTML = html;
}

// const prefs = new UserPreferences();
// prefs.set('theme', 'dark');
// console.log(prefs.get('theme')); // 'dark'

//main 함수 시작
const controlUserData = new ControlUser(); // 사용자 클래스 생성

const tabList = [
  {
    name: "홈",
    id: "home",
    path: "/",
    isPublic: true,
  },
  {
    name: "프로필",
    id: "profile",
    path: "/profile",
    isPublic: false,
  },
  {
    name: "로그아웃",
    id: "logout",
    path: "",
    isPublic: false,
  },
  {
    name: "로그인",
    id: "login",
    path: "/login",
    isPublic: false,
  },
];

// 라우터 인스턴스 생성

const ROUTER = new Router(() => {
  isRender(
    "#root",
    isLayout({
      children: isError(),
      disableHeader: true,
      disableFooter: true,
    })
  );
});


ROUTER.addRoute("/", () => {
  isLoginBefore()
  isRender(
    "#root",
    isLayout({
      children: isHomePage(),
    })
  );
});

ROUTER.addRoute("/login", () => {
  isRender(
    "#root",
    isLayout({
      children: isLogin(),
      disableHeader: true,
      disableFooter: true,
    })
  );
  const user = controlUserData.getUser();
  // ROUTER.redirectTo("/", user);
  const loginForm = document.getElementById("login-form");
  if (!loginForm) {
    return ROUTER.redirectTo("/", user);
  }
  submitForm(loginForm, (formData) => {
    const user = {
      name: "",
      email: "",
      bio: ""
    };
    controlUserData.login(user, () => {
      ROUTER.navigateTo("/profile");
    });
  });
});

ROUTER.addRoute("/profile", () => {
  isRender(
    "#root",
    isLayout({
      children: isProfile(),
    })
  );
  const user = controlUserData.getUser();
  ROUTER.redirectTo("/login", !user);

  const profileForm = document.getElementById("profile-form");
  if (!profileForm) {
    return;
  }
  const userKeys = Object.keys(user);
  userKeys.forEach((key) => {
    const keyName = key === "name" ? "username" : key;
    const input = document.getElementById(keyName);
    if (!input) {
      return;
    }
    input.defaultValue = user[key];
  });
  submitForm(profileForm, (formData) => {
    const updatedData = {
      name: formData.username,
      email: formData.email,
      bio: formData.bio,
      username: formData.username,
    };
    controlUserData.update(updatedData, () => {
      alert("프로필이 수정되었습니다.");
    });
  });
});

// 브라우저에서 직접 경로로 접근했을 때 초기화
document.addEventListener("DOMContentLoaded", () => {
  const currentPath = window.location.pathname;
  ROUTER.handleRoute(currentPath);  // 현재 경로에 해당하는 라우팅 처리
});

document.body.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    e.preventDefault();
    ROUTER.navigateTo(e.target.pathname);
  }
  if (e.target.innerHTML === "로그아웃") {
    controlUserData.logout(() => {
      ROUTER.navigateTo("/login");
    });
  }
});