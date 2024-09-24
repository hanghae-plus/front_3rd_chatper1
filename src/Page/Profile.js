import { goTo, setNavElemTapped } from '../Util/util';

export const Profile = () => {
    console.log('Profile Components!');

    document.querySelector('#root').innerHTML = `
<body>
<div id="root">
  <div class="bg-gray-100 min-h-screen flex justify-center">
    <div class="max-w-md w-full">
      <header class="bg-blue-600 text-white p-4 sticky top-0">
        <h1 class="text-2xl font-bold">항해플러스</h1>
      </header>

      <nav class="bg-white shadow-md p-2 sticky top-14">
        <ul class="flex justify-around">
            <li><a href="/" class="text-gray-600">홈</a></li>
            <li><a id="profile" href="/profile" class="hidden text-blue-600">프로필</a></li>
            <li>
              <a id="login"  href="/login" class="text-gray-600">로그인</a>
              <button id="logout" class="hidden text-gray-600">로그아웃</button>
            </li>
        </ul>
      </nav>

      <main class="p-4">
        <div class="bg-white p-8 rounded-lg shadow-md">
          <h2 class="text-2xl font-bold text-center text-blue-600 mb-8">내 프로필</h2>
          <form id="profile-form">
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

      <footer class="bg-gray-200 p-4 text-center">
        <p>&copy; 2024 항해플러스. All rights reserved.</p>
      </footer>
    </div>
  </div>
</div>
</body>
  `;

    // Route 이동을 위한 클릴 이벤트 설정
    setNavElemTapped();

    const loginButton = document.getElementById('login');
    const logoutButton = document.getElementById('logout');
    const profileButton = document.getElementById('profile');

    const profileUpdateForm = document.getElementById('profile-form');

    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const bioInput = document.getElementById('bio');

    profileUpdateForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const newProfileInfo = {
            username: usernameInput.value,
            email: emailInput.value,
            bio: bioInput.value,
        };

        console.log('newProfileInfo: ', newProfileInfo);

        window.localStorage.setItem('user', JSON.stringify(newProfileInfo));

        alert('⚓️ 프로필 업데이트를 완료했습니다');
    });

    const isUserLogin = window.localStorage.getItem('user');

    if (isUserLogin) {
        loginButton.classList.add('hidden');
        profileButton.classList.remove('hidden');
        logoutButton.classList.remove('hidden');
    } else {
        goTo('/');
        console.log('⚠️ 로그인해야 접근 가능한 페이지입니다 ⚠️ ');
    }

    if (isUserLogin) {
        console.log(isUserLogin);

        const userInfo = JSON.parse(isUserLogin);

        console.log(userInfo);

        usernameInput.value = userInfo.username;
        emailInput.value = userInfo.email;
        bioInput.value = userInfo.bio;
    }

    // 로그아웃 버튼 클릭 처리
    logoutButton.addEventListener('click', function () {
        localStorage.removeItem('user');
        logoutButton.classList.add('hidden');
        loginButton.classList.remove('hidden');
        profileButton.classList.add('hidden');

        goTo('/');
    });
};
