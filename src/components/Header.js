import router from "../router";
import UserInfo from "../UserInfo";

import BaseComponent from "../base/BaseComponent";
import { HOME_PAGE, LOGIN_PAGE, PROFILE_PAGE, USERNAME } from "../constants";

export default class Header extends BaseComponent {
  constructor({ props, onLogout }) {
    super({ props, onLogout });
  }

  template() {
    if (this.props[USERNAME]) {
      return `
      <header class="bg-blue-600 text-white p-4 sticky top-0">
        <h1 class="text-2xl font-bold">항해플러스</h1>
      </header>

      <nav class="bg-white shadow-md p-2 sticky top-14">
        <ul class="flex justify-around">
          <li>
            <a id="home" href=${HOME_PAGE} class="text-gray-600">홈</a>
          </li>
          <li>
            <a id='profile' href=${PROFILE_PAGE} class="text-gray-600">프로필</a>
          </li>
          <li>
            <a id="logout" href="logout" class="text-gray-600">로그아웃</a>
          </li>
        </ul> 
      </nav>
      `;
    }
    return `
      <header class="bg-blue-600 text-white p-4 sticky top-0">
        <h1 class="text-2xl font-bold">항해플러스</h1>
      </header>

      <nav class="bg-white shadow-md p-2 sticky top-14">
        <ul class="flex justify-around">
          <li>
            <a id="home" href=${HOME_PAGE} class="text-blue-600">홈</a>
          </li>
          <li>
            <a href=${LOGIN_PAGE} class="text-gray-600">로그인</a>
          </li>
          </ul>
      </nav>
    `;
  }

  attachEventListeners() {
    const $home = document.getElementById("home");
    const $profile = document.getElementById("profile");

    if (this.props[USERNAME]) {
      if (router.currentPath() === HOME_PAGE) {
        $home.className = "text-blue-600 font-bold";
        $profile.className = "text-gray-600";
      } else {
        $home.className = "text-gray-600";
        $profile.className = "text-blue-600 font-bold";
      }
    } else {
      $home.className = "text-blue-600 font-bold";
    }

    // 메뉴 이동
    const nav = document.querySelector("nav");

    nav.addEventListener("click", (e) => {
      e.preventDefault();

      const hrefname = e.target?.attributes?.href?.value;

      switch (hrefname) {
        // logout
        case "logout":
          const userInfo = new UserInfo();

          userInfo.clear();

          this.onLogout();

          router.push(HOME_PAGE);
          return;
        case HOME_PAGE:
        case PROFILE_PAGE:
        case LOGIN_PAGE:
          router.push(hrefname);
          break;
        default:
          break;
      }
    });
  }
}
