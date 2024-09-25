import Component from "../component.js";
import Footer from "../components/footer.js";
import Header from "../components/header.js";

//TODO: localStorage user에 bio 업데이트
export default class Profile extends Component {
  mounted() {
    const $header = this.target.querySelector("#header");
    const $footer = this.target.querySelector("#footer");
    new Header($header, this.store).render();
    new Footer($footer).render();
  }

  template() {
    return `
    <div id="header" ></div>
    <div class="bg-gray-100 min-h-screen flex justify-center">
    <div class="max-w-md w-full">

      <main class="p-4">
        <div class="bg-white p-8 rounded-lg shadow-md">
          <h2 class="text-2xl font-bold text-center text-blue-600 mb-8">내 프로필</h2>
          <form id='profile-form'>
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

      <div id="footer" ></div>
    </div>
  </div>`;
  }

  addEvent() {
    const user = this.store.getState("user");
    const $form = this.target.querySelector("#profile-form");
    const $username = this.target.querySelector("#username");
    const $bio = this.target.querySelector("#bio");

    if (user) {
      $username.value = user.username;
    }

    $form.addEventListener("submit", (e) => {
      if ($bio.value) {
        e.preventDefault();
        this.store.setState("user", (prev) => ({
          ...prev,
          bio: "Updated bio",
        }));
      }
    });
  }
}
