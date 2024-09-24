import authStore from "../../store/authStore.js";
import UserPreferences from "../../utils/UserPreferences.js";

export default class Header {
  constructor({ $element, router }) {
    this.$element = $element;

    this.router = router;
    this.userPreferences = new UserPreferences();
    authStore.subscribe(() => {
      this.render();
    });
    authStore.setState({ isLoggedIn: !!this.userPreferences.get("name") });
    this.render();
    this.setEvent();
  }

  render() {
    const isLoggedIn = authStore.getState("isLoggedIn");

    this.$element.innerHTML = ` 
    <div>
      <div class="bg-blue-600 text-white p-4 sticky top-0">
        <h1 class="text-2xl font-bold">항해플러스</h1>
      </div>

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
    </div> 
    `;
    this.setEvent();
  }

  setEvent() {
    this.$element.querySelector("nav").addEventListener("click", (e) => {
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
