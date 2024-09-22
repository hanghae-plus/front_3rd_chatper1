import Header from "./header";
import Footer from "./footer";
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

    // this.state = 'home'
  };
  template () { 
    return `
    <div class="bg-gray-100 min-h-screen flex justify-center">
      <div class="max-w-md w-full">
      <header></header>
      <main class="p-4">
        <div class="bg-white p-8 rounded-lg shadow-md">
          <h2 class="text-2xl font-bold text-center text-blue-600 mb-8">내 프로필</h2>
          <form>
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
          </form>
        </div>
      </main>
      <footer></footer>
      </div>
    </div>
    ` 
  }
  setTemplate() {
    const header = new Header(this.$target.querySelector('header'),['프로필','로그아웃']);
    const footer = new Footer(this.$target.querySelector('footer'));

    // header.setState(['프로필','로그아웃'])

    // this.footer = new Footer({ $element: this.$element.querySelector('footer') });
  }
  render () {
    console.log(this.$target)
    this.$target.innerHTML = this.template();
    this.setEvent();
    this.setTemplate();
    // this.updateClass('bg-gray-100', 'min-h-screen', 'flex', 'justify-center'); // 렌더링 후 클래스 업데이트
  }
  setEvent () {
    
  }
   // 클래스 변경 메서드
  // updateClass(...className) {
  //   this.$target.classList.add(...className); // 렌더링 후 클래스 추가
  // }
  setState (newState) {
    this.state = { ...this.state, ...newState };
    this.render();
  }
}