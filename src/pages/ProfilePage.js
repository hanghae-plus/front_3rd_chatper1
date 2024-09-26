import Header from "../components/Header.js";
import Footer from "../components/Footer.js";

export default class ProfilePage {
  constructor() {
    document.title = "ProfilePage ";
    this.header = new Header();
    this.footer = new Footer();
  }
  getHtml() {
    return `
          ${this.header.getHtml()}
          <main class="p-4">
            <div class="bg-white p-8 rounded-lg shadow-md">
              <h2 class="text-2xl font-bold text-center text-blue-600 mb-8">내 프로필</h2>
              <form id="profile-form">
                <div class="mb-4">
                  <label for="username" class="block text-gray-700 text-sm font-bold mb-2">사용자 이름</label>
                  <input type="text" id="username" name="username" value="" class="w-full p-2 border rounded">
                </div>
                <div class="mb-4">
                  <label for="email" class="block text-gray-700 text-sm font-bold mb-2">이메일</label>
                  <input type="email" id="email" name="email" value="" class="w-full p-2 border rounded">
                </div>
                <div class="mb-6">
                  <label for="bio" class="block text-gray-700 text-sm font-bold mb-2">자기소개</label>
                  <textarea id="bio" name="bio" rows="4" class="w-full p-2 border rounded"></textarea>
                </div>
                <button id="updateBtn" type="submit" class="w-full bg-blue-600 text-white p-2 rounded font-bold">프로필 업데이트</button>
              </form>
            </div>
          </main>

          ${this.footer.getHtml()}
        </div>
      </div>
      `;
  }
  addEventListeners() {
    //이벤트 모음
    this.header.addEventListeners();
    this.getProfile();

    //프로필 업데이트 폼 제출
    document
      .getElementById("profile-form")
      .addEventListener("submit", (event) => {
        event.preventDefault();
        this.updateProfile();
      });
  }
  getProfile() {
    //로그인 정보 프로필 가져오기

    //이메일
    if (localStorage.getItem("user")) {
      const user = JSON.parse(localStorage.getItem("user"));
      document.getElementById("username").value = user.username; //이름
      document.getElementById("email").value = user.email; //이메일
      document.getElementById("bio").value = user.bio; //자기소개
    }
  }
  updateProfile() {
    //프로필 업데이트
    const user = {
      username: "testuser",
      email: "",
      bio: "Updated bio",
    };
    localStorage.setItem("user", JSON.stringify(user));
  }
}
