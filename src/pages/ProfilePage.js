export function ProfilePage() {
  // 로컬 스토리지에 저장된 사용자 이름, 이메일, 자기소개 가져오기
  const user = JSON.parse(localStorage.getItem('user')) || {};
  const { username = '', email = '', bio = '' } = user;

  const content = document.createElement('main');
  content.className = 'p-4';
  content.innerHTML = `
      <div class="bg-white p-8 rounded-lg shadow-md">
        <h2 class="text-2xl font-bold text-center text-blue-600 mb-8">내 프로필</h2>
        <form id="profile-form">
          <div class="mb-4">
            <label for="username" class="block text-gray-700 text-sm font-bold mb-2">사용자 이름</label>
            <input type="text" id="username" name="username" value="${username}" class="w-full p-2 border rounded">
          </div>
          <div class="mb-4">
            <label for="email" class="block text-gray-700 text-sm font-bold mb-2">이메일</label>
            <input type="email" id="email" name="email" value="${email}" class="w-full p-2 border rounded">
          </div>
          <div class="mb-6">
            <label for="bio" class="block text-gray-700 text-sm font-bold mb-2">자기소개</label>
            <textarea id="bio" name="bio" rows="4" class="w-full p-2 border rounded">${bio}</textarea>
          </div>
          <button type="submit" class="w-full bg-blue-600 text-white p-2 rounded font-bold">프로필 업데이트</button>
        </form>
      </div>
  `;

  const profileForm = content.querySelector('#profile-form');
  profileForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = profileForm.querySelector('#username').value;
    const email = profileForm.querySelector('#email').value;
    const bio = profileForm.querySelector('#bio').value;

    localStorage.setItem('user', JSON.stringify({ username, email, bio }));
    alert('프로필이 업데이트되었습니다.');
  });
  return content; // DOM 요소를 반환
}
