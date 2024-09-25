import authStore from "../../store/authStore.js";
import UserStorage from "../../utils/UserStorage.js";

export default class Header {
  constructor({ $element, router }) {
    this.$element = $element;
    this.router = router;
    this.userStorage = new UserStorage();
    // authoSotre의 상태값을 구독하고 상태값이 변경될 때마다 render 메서드를 호출
    authStore.subscribe(() => {
      this.render();
    });
    // 초기값 설정
    authStore.setState({ isLoggedIn: !!this.userStorage.get("name") });
  }

  render() {
    const existingHeader = document.querySelector("#header");

    if (existingHeader) {
      existingHeader.remove();
    }

    const isLoggedIn = authStore.getState("isLoggedIn");

    const headerContainer = document.createElement("div");
    headerContainer.id = "header";

    headerContainer.innerHTML = ` 
      <header class="bg-blue-600 text-white p-4 sticky top-0">
        <h1 class="text-2xl font-bold">항해플러스</h1>
      </header>
      <nav class="bg-white shadow-md p-2 sticky top-14">
        <ul class="flex justify-around">
          <li><a href="/" class="text-blue-600">홈</a></li>
          <li><a href="/profile" class="text-gray-600">프로필</a></li>
          ${
            isLoggedIn
              ? `<button id="logout">로그아웃</button>`
              : `<a href="/login" class="text-blue-600">로그인</a>`
          }
        </ul>
      </nav>
    `;

    document.querySelector("#container").prepend(headerContainer);

    this.setEvent();
  }

  setEvent() {
    const nav = this.$element.querySelector("nav");

    nav.addEventListener("click", (e) => {
      if (e.target.tagName === "A") {
        e.preventDefault();
        this.router.navigateTo(e.target.getAttribute("href"));
      } else if (e.target.id === "logout") {
        this.userStorage.reset();
        this.router.navigateTo("/login");
        authStore.setState({ isLoggedIn: false });
      }
    });
  }
}
