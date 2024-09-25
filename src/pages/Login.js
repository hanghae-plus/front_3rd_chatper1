import authStore from '../store/authStore.js';
import UserStorage from '../utils/UserStorage.js';

export default class Login {
  constructor({ $element, router }) {
    this.userStorage = new UserStorage();

    // 로그연 상태라면 홈으로 이동
    const isLoggedIn = this.userStorage.get('name');

    if (isLoggedIn) {
      router.navigateTo('/');
      return;
    }

    this.$element = $element;
    this.$element.innerHTML = '';
    this.router = router;
    this.errorMessage = '';
    this.render();
    this.submitLoginForm();
  }

  render() {
    let loginContainer = this.$element.querySelector('#login-container');

    if (!loginContainer) {
      loginContainer = document.createElement('div');
      loginContainer.classList.add('h-screen', 'flex', 'items-center');
      loginContainer.id = 'login-container';
      this.$element.append(loginContainer);
    }
    loginContainer.innerHTML = `
      <main class="p-4 w-full max-w-md">
        <div class="bg-white p-8 rounded-lg shadow-md">
          <h1 class="text-2xl font-bold text-center text-blue-600 mb-8">항해플러스</h1>
          <form id='login-form'>
            <div class="mb-4">
              <input type="text" id="username" placeholder="이메일 또는 전화번호" class="w-full p-2 border rounded">
              ${
                this.errorMessage
                  ? `<p class="text-red-500 text-sm">${this.errorMessage}</p>`
                  : ''
              }
              
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
        `;

    this.$element.append(loginContainer);
  }

  submitLoginForm() {
    const form = this.$element.querySelector('#login-form');
    if (!form) return;
    try {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = this.$element.querySelector('#username').value;

        authStore.setState({
          isLoggedIn: !!username,
        });
        this.userStorage.set('name', username);
        this.userStorage.set('email', '');
        this.userStorage.set('bio', '');
        this.router.navigateTo('/');
        this.render();
      });
    } catch (error) {
      handleError();
    }

    // const $username = this.$element.querySelector('#username');
    // $username.addEventListener(
    //   'input',
    //   () => {
    //     this.handleError();
    //   },
    //   { once: true }
    // );
  }

  handleError() {
    this.errorMessage = `오류 발생! 의도적인 오류입니다.`;
    this.render();
  }
}
