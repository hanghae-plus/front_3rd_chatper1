import Footer from "../components/Footer";
import Header from "../components/Header";
import ThinkCard from "../components/ThinkCard";

import AbstractComponent from "../abstract/AbstractComponent";
import thinkStore from "../store/thinkStore";
import userStore from "../store/userStore";
import { LOGIN_PAGE, USERNAME } from "../constants";
import router from "../router";

export default class HomePage extends AbstractComponent {
  constructor(elementId) {
    super(elementId);
  }

  beforeMount() {
    this.userStore = userStore;

    this.thinkStore = thinkStore;
    thinkStore.subscribe(this);

    this.thinkCardTemplate = this.thinkStore.getState().map((think) => {
      return `<div id=think-${think.id}></div>`;
    });
  }

  mount() {
    const $header = document.getElementById("header");
    new Header($header);

    this.thinkStore.getState().forEach((think) => {
      const $thinkCard = document.getElementById(`think-${think.id}`);
      new ThinkCard($thinkCard, think);
    });

    const $footer = document.getElementById("footer");
    new Footer($footer);
  }

  template() {
    const isLogin = !!this.userStore.getState()[USERNAME];
    const textareaPlaceholder = isLogin
      ? "무슨 생각을 하고 계신가요?"
      : "로그인을 먼저 해주세요";
    const submitBtnColor = isLogin ? "bg-blue-600" : "bg-green-600";

    return `
      <div class="bg-gray-100 min-h-screen flex justify-center">
        <div class="max-w-md w-full">
        <div id="header"></div>

        <main class="p-4">
          <div class="mb-4 bg-white rounded-lg shadow p-4">
            <form id="think-form">
              <textarea 
                id="think" class="w-full p-2 border rounded" 
                placeholder="${textareaPlaceholder}"
                ${isLogin ? null : "disabled"}></textarea>
              <button 
                type="submit"
                class="mt-2 ${submitBtnColor} text-white px-4 py-2 rounded" 
              >${isLogin ? "게시" : "로그인하러 가기"}</button>
            </form>
          </div>

          <div class="space-y-4">
            ${this.thinkCardTemplate.map((template) => template).join("")}
          </div>
        </main>

        <footer id="footer"></footer>
      </div>
    `;
  }

  attachEventListeners() {
    const $thinkTextarea = document.getElementById("think");
    const $thinkForm = document.getElementById("think-form");

    $thinkForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const isLogin = !!this.userStore.getState()[USERNAME];

      if (isLogin) {
        this.thinkStore.setState($thinkTextarea.value);
      } else {
        router.push(LOGIN_PAGE);
      }
    });
  }
}
