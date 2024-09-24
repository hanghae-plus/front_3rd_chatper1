import {Store} from "../utils/store.js";

const Header = () => {
    const store = new Store()
    const state = store.getState()
    const activeClass = (path) => location.pathname === path ? 'text-blue-600 font-bold' : 'text-gray-600';

    setTimeout(() => {
        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('로그아웃 버튼 클릭됨');
                localStorage.removeItem('isLogin');
                store.setState({isLogin:false})
            });
        }
    }, 0);

    return  `
            <header class="bg-blue-600 text-white p-4 sticky top-0">
                <h1 class="text-2xl font-bold">항해플러스</h1>
            </header>
            <nav class="bg-white shadow-md p-2 sticky top-14">
                <ul class="flex justify-around">
                  ${state.isLogin ? `
                    <li><a href="/" class="${activeClass('/')}">홈</a></li>
                    <li><a href="/profile" class="${activeClass('/profile')}">프로필</a></li>
                    <li><a href="/login" class="text-gray-600" id="logout-btn">로그아웃</a></li>` :
                    `<li><a href="/" class="${activeClass('/')}">홈</a></li>
                    <li><a href="/login" class="text-gray-600">로그인</a></li>`}
                </ul>
            </nav>
        `
}

export default Header