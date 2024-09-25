import Component from '../src/component/component.js';
import router from '../src/router.js';

const TEST_USER_NAME = 'testuser';

export default class LoginPage extends Component {
  #state = {
    username: '',
    password: ''
  };

  #handleEvents = {
    handleSubmitBound: null,
    handleInputBound: null
  };

  constructor() {
    super();

    this.#handleEvents.handleSubmitBound = this.#handleSubmit.bind(this);
    this.#handleEvents.handleInputBound = this.#handleInput.bind(this);
  }

  #validate(id) {
    if (!id) {
      alert('아이디를 입력해주세요');
      return false;
    }

    return true;
  }

  #login(id) {
    if (!this.#validate(id)) {
      return;
    }

    if (this.#state.username === TEST_USER_NAME) {
      localStorage.setItem('user', JSON.stringify({ 'username': `${id}`, 'email': '', 'bio': '' }));
      router.navigateTo('/');
    } else {
      alert('아이디 또는 비밀번호가 일치하지 않습니다');
    }
  }

  #handleSubmit(event) {
    event.preventDefault();
    this.#login(this.#state.username);
  }

  #handleInput(event) {
    this.#state.username = event.target.value;
  }

  render() {
    return `
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
            </div>
            <div class="mb-6">
              <input
                type="password"
                placeholder="비밀번호"
                class="w-full p-2 border rounded"
              />
            </div>
            <button
              type="submit"
              id="login"
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
  }

  #addEventListeners() {
    const form = document.getElementById('login-form');
    form.addEventListener('submit', this.#handleEvents.handleSubmitBound);

    const input = document.getElementById('username');
    input.addEventListener('input', this.#handleEvents.handleInputBound);
  }

  mount() {
    this.#addEventListeners();
  }

  #removeEventListeners() {
    const form = document.getElementById('login-form');
    form.removeEventListener('submit', this.#handleEvents.handleSubmitBound);

    const input = document.getElementById('username');
    input.removeEventListener('input', this.#handleEvents.handleInputBound);
  }

  unmount() {
    this.#removeEventListeners();
  }
}