import { navigateTo } from "../router";
export default class Profile {
  $target;
  state;
  header;

  constructor ($target) { // 클래스 생성자 함수. mouted같아 
    this.$target = $target;
    this.setup();
    this.render();
  }
  setup () {
    const isLogined = !!(JSON.parse(localStorage.getItem('user')));
    // if(isLogined) { 
    //   window.location.replace("/profile"); 
    //   return;
    // }

  };
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
  }
  render () {
    console.log(this.$target)
    this.$target.innerHTML = this.template();
    this.setTemplate();
    this.setEvent();
  }
  setEvent () {
    const form = this.$target.querySelector('form');
    const saveUserInfo = (event)=> {
      event.preventDefault();
      const username = form.querySelector('#username').value;
      localStorage.setItem('user', JSON.stringify({username,email:'',bio:''}));
      navigateTo('/profile');
      //   form.keyword.value = '' // FORM 초기화 
    }


    form.addEventListener("submit", saveUserInfo)
  }
  setState (newState) {
    this.state = { ...this.state, ...newState };
    // this.render();
  }
}