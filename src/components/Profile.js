class Profile {
  template() {
    // localStorage에서 user 정보 가져오기
    const user = JSON.parse(localStorage.getItem("user")) || {
      username: "",
      email: "",
      bio: "",
    };

    return `
     <main class="p-4">
        <div class="bg-white p-8 rounded-lg shadow-md">
          <h2 class="text-2xl font-bold text-center text-blue-600 mb-8">내 프로필</h2>
          <form id='profile-form'>
            <div class="mb-4">
              <label for="username" class="block text-gray-700 text-sm font-bold mb-2">사용자 이름</label>
              <input type="text" id="username" name="username" value="${user.username}" class="w-full p-2 border rounded">
            </div>
            <div class="mb-4">
              <label for="email" class="block text-gray-700 text-sm font-bold mb-2">이메일</label>
              <input type="email" id="email" name="email" value="${user.email}" class="w-full p-2 border rounded">
            </div>
            <div class="mb-6">
              <label for="bio" class="block text-gray-700 text-sm font-bold mb-2">자기소개</label>
              <textarea id="bio" name="bio" rows="4" class="w-full p-2 border rounded">${user.bio}</textarea>
            </div>
            <button type="submit" id='update-button' class="w-full bg-blue-600 text-white p-2 rounded font-bold">프로필 업데이트</button>
          </form>
        </div>
      </main>
      `;
  }

  bindEvents() {
    const profileForm = document.getElementById("profile-form");

    profileForm.addEventListener("submit", (e) => {
      e.preventDefault(); // submit 이벤트 새로고침 방지

      const updatedProfile = {
        username: document.getElementById("username").value,
        email: document.getElementById("email").value,
        bio: document.getElementById("bio").value,
      };

      // 로컬 스토리지에 프로필 업데이트
      localStorage.setItem("user", JSON.stringify(updatedProfile));

      console.log("업데이트:", updatedProfile);
      alert("프로필이 성공적으로 업데이트되었습니다.");
    });
  }
}

export default new Profile();
