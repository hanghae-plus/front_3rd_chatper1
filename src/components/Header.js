import localStorageInstace from '@/store/storage';

import getRouterInstance from '@/router';

export default function Header() {
	const router = getRouterInstance();

	function template() {
		return `
      <header class="bg-blue-600 text-white p-4 sticky top-0">
        <h1 class="text-2xl font-bold">항해플러스</h1>
      </header>
      
      <nav class="bg-white shadow-md p-2 sticky top-14">
        <ul class="flex justify-around">
          <li id="main"><a href="/" class="text-blue-600 font-bold">홈</a></li>
          <li id="login"><a href="/login" class="text-blue-600">로그인</a></li>
          <li id="profile"><a href="/profile" class="text-gray-600">프로필</a></li>
          <li id="logout"><a href="#" class="text-gray-600">로그아웃</a></li>
        </ul>
      </nav>
    `;
	}

	function bindEvents() {
		const user = localStorageInstace.get('user');

		if (user !== null) {
			document.getElementById('login').style.display = 'none';
		} else {
			document.getElementById('profile').style.display = 'none';
			document.getElementById('logout').style.display = 'none';
		}

		const logout = document.getElementById('logout');

		if (logout) {
			logout.addEventListener(
				'click',
				(event) => {
					event.preventDefault();
					event.stopPropagation();

					localStorageInstace.clear();

					router.navigate('/login');
				},
				{ once: true },
			);
		}
	}

	return {
		template,
		bindEvents,
	};
}
