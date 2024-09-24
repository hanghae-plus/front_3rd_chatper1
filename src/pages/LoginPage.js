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
  setEvent () {
    const form = this.$target.querySelector('form');
    const $username = form.querySelector('#username');
    const regex = /^[a-zA-Z]+$/;
    
    const saveUserInfo = (event)=> {
      const username = $username.value;
      event.preventDefault();
      try {
        if (!regex.test(username)  || ( username.length < 3 || username.length > 20)) {
          throw new Error('오류 발생! 사용자 이름에 영어만 사용가능하며, 3자 이상 20자 이하로 입력해야 합니다.');
          // throw new Error('오류 발생! 사용자 이름에 영어만 사용가능하며, 3자 이상 20자 이하로 입력해야 합니다.');
        }
        localStorage.setItem('user', JSON.stringify({username,email:'',bio:''}));
        navigateTo('/profile');
      } catch (error) {
        // 에러 메시지를 화면에 출력 (DOM에 추가)
        const errorContainer = document.querySelector('#error_msg');
        if (errorContainer) {
          errorContainer.innerHTML = `<p class="text-red-600 text-sm">${error.message}</p>`;
        }
        console.log(error.message)
      }
    }
    form.addEventListener("submit", saveUserInfo)
  }
  
}