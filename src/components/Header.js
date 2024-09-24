import {Store} from "../utils/store.js";

const Header = () => {
    const store = new Store()
    const {isLogin} = store.getState()
    const activeClass = (path) => location.pathname === path ? 'text-blue-600 font-bold' : 'text-gray-600';

    return  `
            <header class="bg-blue-600 text-white p-4 sticky top-0">
                <h1 class="text-2xl font-bold">항해플러스</h1>
            </header>
            <nav id="header-nav" class="bg-white shadow-md p-2 sticky top-14">
                <ul class="flex justify-around">
                  ${isLogin ? `
                    <li><a href="/" class="${activeClass('/')}">홈</a></li>
                    <li><a href="/profile" class="${activeClass('/profile')}">프로필</a></li>
                    <li><a href="/login" id="logout" class="text-gray-600" id="logout">로그아웃</a></li>` :
                    `<li><a href="/" class="${activeClass('/')}">홈</a></li>
                    <li><a href="/login" class="text-gray-600">로그인</a></li>`}
                </ul>
            </nav>
        `
}

export default Header

