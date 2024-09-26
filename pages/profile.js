import Component from '../src/component/component.js';
import { html } from 'code-tag';
import Header from '../src/component/header.js';
import Footer from '../src/component/footer.js';
import router from '../src/router.js';
import UserStore from '../src/store/userStore.js';

export default class ProfilePage extends Component {
  #children = {
    header: new Header(),
    footer: new Footer()
  };

  #userStore = null;

  #handleEvents = {
    handleSubmitBound: null
  };

  constructor() {
    super();

    this.#userStore = new UserStore();

    this.#handleEvents.handleSubmitBound = this.#handleSubmit.bind(this);
  }

  #saveProfile() {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const bio = document.getElementById('bio').value;

    const user = { username, email, bio };
    this.#userStore.updateUser(user, this);

    alert('프로필이 업데이트 되었습니다.');
  }

  #handleSubmit(event) {
    event.preventDefault();

    this.#saveProfile();

    router.router();
  }

  template() {
    const user = this.#userStore.getUser();

    return html`
      <div class="bg-gray-100 min-h-screen flex justify-center">
        <div class="max-w-md w-full">
          ${this.#children.header.template()}
          <main class="p-4">
            <div class="bg-white p-8 rounded-lg shadow-md">
              <h2 class="text-2xl font-bold text-center text-blue-600 mb-8">
                내 프로필
              </h2>
              <form id="profile-form">
                <div class="mb-4">
                  <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="username"
                  >사용자 이름</label
                  >
                  <input
                    class="w-full p-2 border rounded"
                    id="username"
                    name="username"
                    type="text"
                    value="${user.username ?? ''}"
                  />
                </div>
                <div class="mb-4">
                  <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="email"
                  >이메일</label
                  >
                  <input
                    class="w-full p-2 border rounded"
                    id="email"
                    name="email"
                    type="email"
                    value="${user.email ?? ''}"
                  />
                </div>
                <div class="mb-6">
                  <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="bio"
                  >자기소개</label
                  >
                  <textarea
                    class="w-full p-2 border rounded"
                    id="bio"
                    name="bio"
                    rows="4"
                  >${user.bio ?? ''}</textarea>
                </div>
                <button
                  class="w-full bg-blue-600 text-white p-2 rounded font-bold"
                  type="submit"
                >
                  프로필 업데이트
                </button>
              </form>
            </div>
          </main>

          ${this.#children.footer.template()}
        </div>
      </div>`;
  }

  #addEventListeners() {
    const form = document.querySelector('#profile-form');

    form.addEventListener('submit', this.#handleEvents.handleSubmitBound);
  }

  hydrate() {
    for (const child of Object.values(this.#children)) {
      child.hydrate();
    }
    this.#addEventListeners();
  }

  #removeEventListeners() {
    const form = document.querySelector('#profile-form');

    form.removeEventListener('submit', this.#handleEvents.handleSubmitBound);
  }

  dehydrate() {
    for (const child of Object.values(this.#children)) {
      child.dehydrate();
    }
    this.#removeEventListeners();
  }
}