export const home = `
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
  </main>
`;
export const profile = `
  <main class="p-4">
    <div class="bg-white p-8 rounded-lg shadow-md">
      <h2 class="text-2xl font-bold text-center text-blue-600 mb-4">
        내 프로필
      </h2>
      <div class="text-center mb-4">
        <button id="global-state-button" class="bg-blue-600 text-white p-2 rounded font-bold">전역 상태로 변경</button>
      </div>
      <form id="profile-form">
        <div class="mb-4">
          <label
            for="username"
            class="block text-gray-700 text-sm font-bold mb-2"
            >사용자 이름</label
          >
          <input
            type="text"
            id="username"
            name="username"
            value="홍길동"
            class="w-full p-2 border rounded"
          />
        </div>
        <div class="mb-4">
          <label
            for="email"
            class="block text-gray-700 text-sm font-bold mb-2"
            >이메일</label
          >
          <input
            type="email"
            id="email"
            name="email"
            value="hong@example.com"
            class="w-full p-2 border rounded"
          />
        </div>
        <div class="mb-6">
          <label
            for="bio"
            class="block text-gray-700 text-sm font-bold mb-2"
            >자기소개</label
          >
          <textarea
            id="bio"
            name="bio"
            rows="4"
            class="w-full p-2 border rounded"
          >
안녕하세요, 항해플러스에서 열심히 공부하고 있는 홍길동입니다.</textarea
          >
        </div>
        <button
          type="submit"
          class="w-full bg-blue-600 text-white p-2 rounded font-bold"
        >
          프로필 업데이트
        </button>
      </form>
    </div>
  </main>
`;
export const login = `
  <main class="bg-gray-100 flex items-center justify-center min-h-screen">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h1 class="text-2xl font-bold text-center text-blue-600 mb-8">
        항해플러스
      </h1>
      <form id="login-form">
        <div class="mb-4">
          <input
            id="username"
            type="text"
            placeholder="이메일 또는 전화번호"
            class="w-full p-2 border rounded"
          />
          <div id="id-error" class="mt-2 text-red-400 font-bold text-xs"></div>
        </div>
        <div class="mb-6">
          <input
            id="password"
            type="password"
            placeholder="비밀번호"
            class="w-full p-2 border rounded"
          />
          <div id="pw-error" class="mt-2 text-red-400 font-bold text-xs"></div>
        </div>
        <button
          type="submit"
          class="w-full bg-blue-600 text-white p-2 rounded font-bold"
        >
          로그인
        </button>
      </form>
      <div class="mt-4 text-center">
        <a href="#" class="text-blue-600 text-sm">비밀번호를 잊으셨나요?</a>
      </div>
      <hr class="my-6" />
      <div class="text-center">
        <button class="bg-green-500 text-white px-4 py-2 rounded font-bold">
          새 계정 만들기
        </button>
      </div>
    </div>
  </main>
`;
export const error = `
  <main class="bg-gray-100 flex items-center justify-center min-h-screen">
    <div
      class="bg-white p-8 rounded-lg shadow-md w-full text-center"
      style="max-width: 480px"
    >
      <h1 class="text-2xl font-bold text-blue-600 mb-4">항해플러스</h1>
      <p class="text-4xl font-bold text-gray-800 mb-4">404</p>
      <p class="text-xl text-gray-600 mb-8">페이지를 찾을 수 없습니다</p>
      <p class="text-gray-600 mb-8">
        요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
      </p>
      <a
        href="/"
        id="home"
        class="bg-blue-600 text-white px-4 py-2 rounded font-bold"
      >
        홈으로 돌아가기
      </a>
    </div>
  </main>
`;
export const header = `
  <div class="max-w-md w-full">
    <header class="bg-blue-600 text-white p-4 sticky top-0">
      <h1 class="text-2xl font-bold">항해플러스</h1>
    </header>

    <nav class="bg-white shadow-md p-2 sticky top-14">
      <ul class="flex justify-around">
        <li>
          <a href="/" id="home" class="font-bold">홈</a>
        </li>
        <li>
          <a href="/profile" id="profile" class="font-bold"
            >프로필</a
          >
        </li>
        <li>
          <a href="/login" id="logout" class="text-gray-600 font-bold"
            >로그아웃</a
          >
        </li>
      </ul>
    </nav>
  </div>
`;
export const footer = `
  <div class="max-w-md w-full">
    <footer class="bg-gray-200 p-4 text-center">
      <p>&copy; 2024 항해플러스. All rights reserved.</p>
    </footer>
  </div>
`;
export const bodyLayout = `
  <div id="root">
    <div class="bg-gray-100 min-h-screen flex justify-center">
      <div class="max-w-md w-full">
        <header></header>
        <div id="content"></div>
        <footer></footer>
      </div>
    </div>
  </div>
`;
export const metadata = (templateName) => `
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>항해플러스 - ${templateName}</title>
  <script src="https://cdn.tailwindcss.com"></script>
`;
export const errorBoundary = `
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-lg text-center">
      <svg class="mx-auto h-16 w-16 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-12.728 12.728M5.636 5.636l12.728 12.728" />
      </svg>
      <h2 class="mt-4 text-xl font-bold text-gray-800">오류 발생!</h2>
      <div id="message" class="mt-2 text-gray-600"></div>
      <button
        id="home"
        class="mt-6 px-4 py-2 bg-red-500 text-white font-bold rounded-lg hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-400">
        홈 화면으로 가기
      </button>
    </div>
  </div>
`;
