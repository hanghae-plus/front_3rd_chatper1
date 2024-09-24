import Component from '../src/component/component.js';
import { html } from 'code-tag';
import Header from '../src/component/header.js';
import Footer from '../src/component/footer.js';

export default class ProfilePage extends Component {
  #children = {
    header: new Header(),
    footer: new Footer()
  };

  constructor() {
    super();
  }

  render() {
    return html`
      <div class="bg-gray-100 min-h-screen flex justify-center">
        <div class="max-w-md w-full">
          ${this.#children.header.render()}

          <main class="p-4">
            <div class="bg-white p-8 rounded-lg shadow-md">
              <h2 class="text-2xl font-bold text-center text-blue-600 mb-8">
                내 프로필
              </h2>
              <form>
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
                  >
              </textarea>
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

          ${this.#children.footer.render()}
        </div>
      </div>`;
  }

  #addEventListeners() {
  }

  mount() {
    for (const child of Object.values(this.#children)) {
      child.mount();
    }
    this.#addEventListeners();
  }
}