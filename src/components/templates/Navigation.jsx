/** @jsx createVNode */
import { createVNode } from "../../lib";
import { userStorage } from "../../storages/userStorage";
import { globalStore } from "../../stores/globalStore";

export const Navigation = ({ loggedIn }) => {
  function handleLogout() {
    userStorage.reset(); // 사용자 정보 제거
    globalStore.setState({
      currentUser: null,
      loggedIn: false,
    }); // 로그아웃 상태로 업데이트
  }

  console.log(localStorage.getItem("user"));

  const getNavItemClass = (path) => {
    const currentPath = window.location.pathname;
    return currentPath === path ? "text-blue-600 font-bold" : "text-gray-600";
  };

  return (
    <nav className="bg-white shadow-md p-2 sticky top-14">
      <ul className="flex justify-around">
        <li>
          <a href="/" className={getNavItemClass("/")} data-link>
            홈
          </a>
        </li>
        {!loggedIn && (
          <li>
            <a href="/login" className={getNavItemClass("/login")} data-link>
              로그인
            </a>
          </li>
        )}
        {loggedIn && (
          <li>
            <a
              href="/profile"
              className={getNavItemClass("/profile")}
              data-link
            >
              프로필
            </a>
          </li>
        )}
        {loggedIn && (
          <li onClick={handleLogout}>
            <a href="#" id="logout" className="text-gray-600">
              로그아웃
            </a>
          </li>
        )}
      </ul>
    </nav>
  );
};
