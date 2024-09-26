import Component from "../component.js";
import Router from "../router.js";

export default class Header extends Component {
  constructor(target, store) {
    super(target, store);
    this.router = new Router();
    this.store = store;
  }

  mounted() {
    const $login = this.target.querySelector("#login");
    const $profile = this.target.querySelector("#profile");
    const user = this.store.getState("user");

    if (user) {
      $profile.innerHTML = `<a href="/profile" class="text-blue-600">프로필</a>`;
      $login.innerHTML = `<button id='logout' class="text-blue-600">로그아웃</a>`;
    } else {
      $login.innerHTML = `<a href="/login" class="text-blue-600">로그인</a>`;
    }
  }

  template() {
    return `
    <header class="bg-blue-600 text-white p-4 sticky top-0">
        <h1 class="text-2xl font-bold">항해플러스</h1>
      </header>

      <nav class="bg-white shadow-md p-2 sticky top-14">
        <ul class="flex justify-around">
          <li><a href="/" class="text-blue-600 font-bold">홈</a></li>
          <li id='profile'></li>
          <li id='login'></li>
        </ul>
      </nav>
    `;
  }

  addEvent() {
    const $nav = this.target.querySelector("nav");
    $nav.addEventListener("click", (e) => {
      if (e.target.tagName === "A") {
        e.preventDefault();
        this.router.push(e.target.href);
      }
      if (e.target.tagName === "BUTTON") {
        e.preventDefault();
        this.store.clearState();
        console.log("로그아웃 성공!");
        this.render();
      }
    });
  }
}

//로그인을 했으면 프로필 보여주고 아니면 안보여주게 설정
//로그인 안했으면 로그인 버튼 보여주게 설정
