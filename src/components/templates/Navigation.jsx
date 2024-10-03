/** @jsx createVNode */
import { createVNode } from "../../lib";

const getNavItemClass = (path) => {
    const currentPath = window.location.pathname;
    return currentPath === path ? "text-blue-600 font-bold" : "text-gray-600";
};

export const Navigation = ({ loggedIn }) => {
    return (
        <nav className="bg-white shadow-md p-2 sticky top-14">
            <ul className="flex justify-around">
                <li>
                    <a href="/" className={getNavItemClass("/")} data-link="true">
                        홈
                    </a>
                </li>

                {loggedIn && (
                    <li>
                        <a href="/profile" className={getNavItemClass("/profile")} data-link="true">
                            프로필
                        </a>
                    </li>
                )}

                {!loggedIn && (
                    <li>
                        <a href="/login" className={getNavItemClass("/login")} data-link="true">
                            로그인
                        </a>
                    </li>
                )}

                {loggedIn && (
                    <li>
                        <a href="#" id="logout" className={getNavItemClass("/login")}>
                            로그아웃
                        </a>
                    </li>
                )}
            </ul>
        </nav>
    );
};
