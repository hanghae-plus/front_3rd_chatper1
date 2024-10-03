/** @jsx createVNode */
import {createVNode} from "../../lib/index.js";
import {userStorage} from "../../storages/index.js";
import {globalStore} from "../../stores/index.js";

const getNavItemClass = (path) => {
    const currentPath = window.location.pathname;
    return currentPath === path ? 'text-blue-600 font-bold' : 'text-gray-600';
}

export const Navigation = ({ loggedIn }) => {

    const logout = () => {
        userStorage.reset();
        globalStore.setState({
            ...globalStore.getState(),
            loggedIn: false,
        })

    }

    return <nav className="bg-white shadow-md p-2 sticky top-14">
        <ul className="flex justify-around">
            <li>
                <a href="/" className={getNavItemClass('/')} data-link={true}>홈</a>
            </li>
            {!loggedIn ? <li><a href="/login" className={getNavItemClass('/login')} data-link={true}>로그인</a></li> : ''}
            {loggedIn ? <li><a href="/profile" className={getNavItemClass('/profile')} data-link={true}>프로필</a></li> : ''}
            {loggedIn ? <li><a href="#" id="logout" onClick={logout} className="text-gray-600">로그아웃</a></li> : ''}
        </ul>
    </nav>
};
