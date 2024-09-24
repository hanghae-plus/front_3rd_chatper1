import Articles from './components/Articles';
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

function initFunctions() {
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

        case 'logout':
          if (!confirm('로그아웃 하시겠습니까?')) return;

          localStorage.removeItem('login');

          history.pushState({ home: 1 }, '', '/');
          render();
          break;

        default:
          break;
      }

      console.log(location.pathname);
      console.log(history);
    });
  }
}

localStorage.setItem('login', true);

function render() {
  const Home = `
    <main class="p-4">
      ${Write()}
      ${Articles()}
    </main>
  `;

  const paintMain = () => {
    switch (location.pathname) {
      case '/':
        return Home;

      case '/profile':
        return 'profile';

      case '/login':
        return 'login';

      default:
        break;
    }
  };

  document.querySelector('#root').innerHTML = `
    <div class="bg-gray-100 min-h-screen flex justify-center">
      <div class="max-w-md w-full">
        ${Header()}
        ${Nav()}

        ${paintMain()}
        

        <footer class="bg-gray-200 p-4 text-center">
          <p>&copy; 2024 항해플러스. All rights reserved.</p>
        </footer>
      </div>
    </div>
  `;

  initFunctions();
}

render();
