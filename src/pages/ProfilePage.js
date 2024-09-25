import Header from '../components/Header.js';
import Footer from '../components/Footer.js';

export default class ProfilePage  {
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
              <form>
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
  addEventListeners() { //이벤트 모음
    this.header.addEventListeners();
    this.getProfile()

    const updateBtn = document.getElementById('updateBtn');

    // 프로필 업데이트 버튼 누를때
    updateBtn.addEventListener('click', (event) => {
        event.preventDefault(); 
        this.updateProfile();
    });
  }
  getProfile(){ //로그인 정보 프로필 가져오기

    //이메일
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    document.getElementById('email').value = userInfo.userId;

    if(localStorage.getItem("userProfile")){
      const userProfile = JSON.parse(localStorage.getItem("userProfile"));
      //이름
      document.getElementById('username').value = userProfile.name;
      //자기소개
      document.getElementById('bio').value = userProfile.introduction;
    }else{ 
      //프로필 설정 안했을때
      document.getElementById('username').value = "";
      document.getElementById('bio').value = "";
    }
  }
  updateProfile(){ //프로필 업데이트
    const profileInfo = {
      name: document.getElementById('username').value, 
      introduction : document.getElementById('bio').value
    };
    localStorage.setItem("userProfile", JSON.stringify(profileInfo));

    // 로그인 아이디,비번 
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const updatedUserInfo = {
      userId: document.getElementById('email').value, 
      password: userInfo.password
    };
    localStorage.setItem("userInfo", JSON.stringify(updatedUserInfo));
  }
}
