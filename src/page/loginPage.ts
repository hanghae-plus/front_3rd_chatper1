import { useRouter } from '../module/route';
import { throttle } from '../module/util';
import Component from '../core/component';
import store from '../module/store';

const router = useRouter();

function submitHandle() {
  const usernameDiv = document.querySelector('#username') as HTMLInputElement;
  const username = usernameDiv.value;
  store.setState({ username, email: '', bio: '' });
  router.push('/profile');
}

export default class LoginPage extends Component {
  init() {
    this.state = { id: '', password: '' };
  }

  attachEventListeners() {
    const loginForm = document.querySelector('#login-form')!;

    loginForm.addEventListener('submit', function (event) {
      event.preventDefault();
      throttle(submitHandle, 500)();
    });

    const btnList = document.querySelectorAll('[data-path]');
    btnList.forEach((e) => {
      e.addEventListener('click', function (event) {
        event.preventDefault();
        const path = e.getAttribute('data-path');
        if (path) router.push(path);
      });
    });
  }

  template() {
    return `
          <main class="bg-gray-100 flex items-center justify-center min-h-screen">
            <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
              <h1 class="text-2xl font-bold text-center text-blue-600 mb-8">
                <button data-path='/' > 항해플러스 </button>
              </h1>
              <form id="login-form">
                <div class="mb-4">
                  <input id="username" type="text" placeholder="사용자 이름" class="w-full p-2 border rounded">
                </div>
                <div class="mb-6">
                  <input id="password" type="password" placeholder="비밀번호" class="w-full p-2 border rounded">
                </div>
                <button type="submit" class="w-full bg-blue-600 text-white p-2 rounded font-bold">로그인</button>
              </form>
              <div class="mt-4 text-center">
                <a href="#" class="text-blue-600 text-sm">비밀번호를 잊으셨나요?</a>
              </div>
              <hr class="my-6">
              <div class="text-center">
                <button data-path='/' class="bg-green-500 text-white px-4 py-2 rounded font-bold">새 계정 만들기</button>
              </div>
            </div>
          </main>
        `;
  }
}
