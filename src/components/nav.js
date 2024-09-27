import { html } from "lit-html";
import { userStore } from "../store/userStore";

const NavLink = (href, text, isActive, id = "") => html`
  <li>
    <a
      href="${href}"
      class="${isActive ? "text-blue-600 font-bold" : "text-gray-600"}"
      id="${id}"
    >
      ${text}
    </a>
  </li>
`;

const Nav = () => {
  const isLoggedIn = userStore.getState();
  const path = window.location.pathname;

  return html`
    <nav class="bg-white shadow-md p-2 sticky top-14">
      <ul class="flex justify-around">
        ${NavLink("/", "홈", path === "/")}
        ${NavLink("/profile", "프로필", path === "/profile")}
        ${isLoggedIn
          ? NavLink("#", "로그아웃", false, "logout")
          : NavLink("/login", "로그인", false)}
      </ul>
    </nav>
  `;
};

export default Nav;
