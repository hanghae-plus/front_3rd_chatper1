import Header from "../components/header";
import Footer from "../components/footer";
import Common from "../common";
export default class Profile extends Common{
  setup () {
    this.setState(JSON.parse(localStorage.getItem('user')) || {username:'',email:'',bio:''});
  };
  template () { 
    return `
    <div class="bg-gray-100 min-h-screen flex justify-center">
      <div class="max-w-md w-full">
      <header></header>
      <main class="p-4">
        <div class="bg-white p-8 rounded-lg shadow-md">
          <h2 class="text-2xl font-bold text-center text-blue-600 mb-8">내 프로필</h2>
          <form id="profile-form">
            <div class="mb-4">
              <label for="username" class="block text-gray-700 text-sm font-bold mb-2">사용자 이름</label>
              <input type="text" id="username" name="username" value="${this.state.username ?? ''}" class="w-full p-2 border rounded" required>
            </div>
            <div class="mb-4">
              <label for="email" class="block text-gray-700 text-sm font-bold mb-2">이메일</label>
              <input type="email" id="email" name="email" value="${this.state.email ?? ''}" class="w-full p-2 border rounded" required>
            </div>
            <div class="mb-6">
              <label for="bio" class="block text-gray-700 text-sm font-bold mb-2">자기소개</label>
              <textarea id="bio" name="bio" rows="4" class="w-full p-2 border rounded">${this.state.bio ?? ''}</textarea>
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
    const header = new Header(this.$target.querySelector('header'));
    const footer = new Footer(this.$target.querySelector('footer'));
  }
  setEvent () {
    const form = this.$target.querySelector('form');
    const saveUserInfo = (event)=> {
      event.preventDefault();
      const username = form.querySelector('#username').value;
      const email = form.querySelector('#email').value;
      const bio = form.querySelector('#bio').value;
      localStorage.setItem('user', JSON.stringify({username,email,bio}));
      alert('프로필이 업데이트되었습니다');
    }

    form.addEventListener("submit", saveUserInfo)
  }
}