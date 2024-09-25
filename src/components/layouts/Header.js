import authStore from "../../store/authStore.js";
import UserPreferences from "../../utils/UserStorage.js";

export default class Header {
  constructor({ $element, router }) {
    this.$element = $element;
    $element.classList.add("sibal");
    this.isVisible = false;
    this.router = router;
    this.userPreferences = new UserPreferences();
    authStore.subscribe(() => {
      this.render();
    });
    authStore.setState({ isLoggedIn: !!this.userPreferences.get("name") });
  }

  show() {
    this.isVisible = true;
    this.render();
  }

  hide() {
    this.isVisible = false;
    this.render();
  }

  render() {
    const existingHeader = document.querySelector("#header");

    if (existingHeader) {
      existingHeader.remove();
    }

    if (!this.isVisible) return;

    const isLoggedIn = authStore.getState("isLoggedIn");
    console.log("isLoggedIn", isLoggedIn);

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

    document.querySelector(".sibal").prepend(headerContainer);

    this.setEvent();
  }

  setEvent() {
    const nav = this.$element.querySelector("nav");

    nav.addEventListener("click", (e) => {
      if (e.target.tagName === "A") {
        e.preventDefault();
        this.router.navigateTo(e.target.getAttribute("href"));
      } else if (e.target.id === "logout") {
        this.userPreferences.reset();
        this.router.navigateTo("/login");
        authStore.setState({ isLoggedIn: false });
      }
    });
  }
}
