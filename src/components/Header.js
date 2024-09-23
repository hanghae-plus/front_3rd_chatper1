import { navigate } from '../main';

/**
 *
 * @param {Boolean} isLogin 로그인 여부
 * 로그인 여부에 따라 네비게이션이 다르게 표출
 */
export function createHeader(isLogin = false) {
  const header = document.createElement('header');
  header.className = 'bg-blue-600 text-white p-4 sticky top-0';
  header.innerHTML = '<h1 class="text-2xl font-bold">항해플러스</h1>';

  const nav = document.createElement('nav');
  nav.className = 'bg-white shadow-md p-2 sticky top-14';
  nav.innerHTML = `
      <ul class="flex justify-around">
        <li><a href='/' class="text-blue-600 font-bold">홈</a></li>
       ${
         isLogin
           ? `<li><a href='/profile' class="text-gray-600">프로필</a></li>
                <li><a href='/login' id="logout" class="text-gray-600">로그아웃</a></li>`
           : `<li><a href='/login' class="text-gray-600">로그인</a></li>`
       }
      </ul>
    `;

  // 로그아웃 버튼 클릭 이벤트 핸들러
  const logoutBtn = nav.querySelector('#logout');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      // 로컬 스토리지에 저장된 로그인 상태 및 사용자 정보 모두 삭제 홈 페이지로 이동
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('user');
    });
  }

  const container = document.querySelector('.bg-gray-100 .max-w-md');
  container.prepend(header);
  container.appendChild(nav);
}
