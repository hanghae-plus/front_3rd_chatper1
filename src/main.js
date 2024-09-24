import Header from './components/Header';
import Nav from './components/Nav';
import Write from './components/Write';

const Login = () => {
  return `
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
  `;
};

const render = () => {
  const Home = `
    <main class="p-4">
      ${Write()}
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

  document.querySelector('#root').innerHTML = `
    <div class="bg-gray-100 min-h-screen flex justify-center">
      <div class="max-w-md w-full">
        ${Header()}
        ${Nav()}

        ${location.pathname === '/' ? Home : ``}
        

        <footer class="bg-gray-200 p-4 text-center">
          <p>&copy; 2024 항해플러스. All rights reserved.</p>
        </footer>
      </div>
    </div>
  `;

  const list = document.getElementById('nav-list');

  if (list) {
    list.addEventListener('click', (e) => {
      if (!list.contains(e.target)) return;

      const route = e.target.dataset.route;
      switch (route) {
        case 'home':
          history.pushState({ home: 1 }, '', '/');
          render();
          break;

        case 'profile':
          history.pushState({ profile: 1 }, '', '/profile');
          render();
          break;

        case 'login':
          history.pushState({ login: 1 }, '', '/login');
          render();
          break;

        default:
          break;
      }

      console.log(location.pathname);
      console.log(history);
    });
  }
};

render();
