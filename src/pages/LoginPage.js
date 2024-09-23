import Common from "../common";
import { navigateTo } from "../router";
export default class Login extends Common {
  setup () {
    if (this.state.isLogined) {
      navigateTo('/');
      return;
    }
    this.state.errorMsg = '';
  }
  render () {
    this.$target.innerHTML = this.template();
    this.setTemplate();
    this.setEvent();
  }
  template () { 
    return `
    <main class="bg-gray-100 flex items-center justify-center min-h-screen">
      <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 class="text-2xl font-bold text-center text-blue-600 mb-8">항해플러스</h1>
        <form id="login-form">
          <div class="mb-4">
            <input type="text" id="username" required placeholder="이메일 또는 전화번호" class="w-full p-2 border rounded">
          </div>
          <div class="mb-6">
            <input type="password" required placeholder="비밀번호" class="w-full p-2 border rounded">
          </div>
          <div class="mb-4 text-center" id="error_msg"></div>
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
    ` 
  }
  setTemplate() {
    this.$target.querySelector('#error_msg').innerHTML = `<p class="text-red-600 text-sm">${this.state.errorMsg}</p>`;
  }
  setEvent () {
    const form = this.$target.querySelector('form');
    const $username = form.querySelector('#username');
    const saveUserInfo = (event)=> {
      const username = $username.value;
      event.preventDefault();
      console.log($username,username)
      const regex = /^[a-zA-Z]+$/;
      if (username.length < 3 || username.length > 20) {
        this.setState({errorMsg:'오류 발생! 사용자 이름은 3자 이상 20자 이하로 입력해야 합니다.'});
        this.setTemplate();
        throw new Error('오류 발생!');
      }
      if (!regex.test(username)) {
        this.setState({errorMsg:'사용자 이름에 숫자는 의도적인 오류입니다.'});
        this.setTemplate();
        throw new Error('의도적인 오류입니다.');
      }
      localStorage.setItem('user', JSON.stringify({username,email:'',bio:''}));
      navigateTo('/profile');
    }
    form.addEventListener("submit", saveUserInfo)
  }
  
}