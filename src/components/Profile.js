import user from "../User";

class Profile {
  template() {

    return `
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
            <button type="submit" class="w-full bg-blue-600 text-white p-2 rounded font-bold">프로필 업데이트</button>
          </form>
        </div>
      </main>
    `
  }

  bindEvents(renderHTML) {
    //로그인 안되어있을 시 로그인 페이지로 이동
    if (!user.isLoggedIn()) {
      history.pushState(null, null, '/login')
      renderHTML('/login');
    }
    const profileForm = document.querySelector("#profile-form");

    document.querySelector("#username").value = user !== null ? user.getUser().username : "";
    document.querySelector("#email").value = user !== null ? user.getUser().email : "";
    document.querySelector("#bio").value = user !== null ? user.getUser().bio : "";

    profileForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const updatedProfile = {
        username: document.querySelector("#username").value,
        email: document.querySelector("#email").value,
        bio: document.querySelector("#bio").value
      }

      // 사용자 정보 업데이트
      user.setUserData(updatedProfile);

      alert("프로필이 성공적으로 업데이트되었습니다.");
    })
  }
}
export default new Profile();