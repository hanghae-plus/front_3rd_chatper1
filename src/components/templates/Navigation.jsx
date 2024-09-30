/** @jsx createVNode */
import { createVNode } from "../../lib";

export const Navigation = () => {
    return (
        <nav className="bg-white shadow-md p-2 sticky top-14">
            <ul className="flex justify-around">
                <li>
                    <a href="/" className="text-blue-600 font-bold" data-link="true">
                        홈
                    </a>
                </li>
                <li>
                    <a href="/login" className="text-gray-600" data-link="true">
                        로그인
                    </a>
                    {/* ${!loggedIn ? `<li><a href="/login" class="${getNavItemClass("/login")}" data-link>로그인</a></li>` : ""}${loggedIn ? `<li><a href="/profile" class="${getNavItemClass("/profile")}" data-link>프로필</a></li>` : ""}${loggedIn ? `<li><a href="#" id="logout" class="text-gray-600">로그아웃</a></li>` : ""} */}
                </li>
            </ul>
        </nav>
    );
};
