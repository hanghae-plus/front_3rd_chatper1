import router from "../router";
import userStore from "../store/userStore";
import AbstractComponent from "../abstract/AbstractComponent";

import {
  GENERAL_NAV_STYLE,
  HOME_PAGE,
  LOGIN_PAGE,
  PROFILE_PAGE,
  SELECT_NAV_STYLE,
  USERNAME,
} from "../constants";

export default class Header extends AbstractComponent {
  constructor($root) {
    super($root);
  }

  beforeMount() {
    this.userStore = userStore;
    this.userStore.subscribe(this);
  }

  template() {
    if (this.userStore.getState()[USERNAME]) {
      return `
        <header class="bg-blue-600 text-white p-4">
          <h1 class="text-2xl font-bold">항해플러스</h1>
        </header>

        <nav class="bg-white shadow-md p-2">
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
      <header class="bg-blue-600 text-white p-4">
        <h1 class="text-2xl font-bold">항해플러스</h1>
      </header>

      <nav class="bg-white shadow-md p-2">
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
    this.$root.className = "sticky top-0";

    const $homeNav = document.getElementById("home");
    const $profileNav = document.getElementById("profile");
    const $nav = document.querySelector("nav");

    if (!($homeNav && $profileNav && $nav)) {
      return;
    }

    if (this.userStore.getState()[USERNAME]) {
      if (router.currentPath() === HOME_PAGE) {
        $homeNav.className = SELECT_NAV_STYLE;
        $profileNav.className = GENERAL_NAV_STYLE;
      } else {
        $homeNav.className = GENERAL_NAV_STYLE;
        $profileNav.className = SELECT_NAV_STYLE;
      }
    } else {
      $homeNav.className = SELECT_NAV_STYLE;
    }

    $nav.addEventListener("click", (e) => {
      e.preventDefault();

      const hrefname = e.target?.attributes?.href?.value;

      switch (hrefname) {
        case "logout":
          this.userStore.clear();

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
