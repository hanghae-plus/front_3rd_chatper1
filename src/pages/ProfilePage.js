import Component from '../components/common/component';
import Footer from '../components/footer';
import Header from '../components/header';
import { store } from '../main';
import { updateStorage } from '../utils/storage';

export default class ProfilePage extends Component {
  constructor(target) {
    super(target);
  }

  handleSubmit(event) {
    event.preventDefault();
    event.stopPropagation();

    const username = document.querySelector('#username').value;
    const email = document.querySelector('#email').value;
    const bio = document.querySelector('#bio').value;

    const newUser = { username, email, bio };

    store.setState({ ...store.getState(), user: newUser });
    updateStorage('user', newUser);
  }

  bindEvents() {
    const { user } = store.getState();
    const { username, email, bio } = user;

    document.querySelector('#username').value = username;
    document.querySelector('#email').value = email;
    document.querySelector('#bio').value = bio;

    document
      .querySelector('#profile-form')
      .addEventListener('submit', this.handleSubmit);
  }

  children() {
    new Header(this.target.querySelector('#header-container'));
    new Footer(this.target.querySelector('#footer-container'));
  }

  template() {
    return `
      <div class="bg-gray-100 min-h-screen flex justify-center">
        <div class="max-w-md w-full">
          <div id="header-container"></div>

          <main class="p-4">
            <div class="bg-white p-8 rounded-lg shadow-md">
              <h2 class="text-2xl font-bold text-center text-blue-600 mb-8">
                내 프로필
              </h2>
              <form id="profile-form">
                <div class="mb-4">
                  <label
                    for="username"
                    class="block text-gray-700 text-sm font-bold mb-2"
                    >사용자 이름</label
                  >
                  <input
                    type="text"
                    id="username"
                    name="username"
                    class="w-full p-2 border rounded"
                  />
                </div>
                <div class="mb-4">
                  <label
                    for="email"
                    class="block text-gray-700 text-sm font-bold mb-2"
                    >이메일</label
                  >
                  <input
                    type="email"
                    id="email"
                    name="email"
                    class="w-full p-2 border rounded"
                  />
                </div>
                <div class="mb-6">
                  <label
                    for="bio"
                    class="block text-gray-700 text-sm font-bold mb-2"
                    >자기소개</label
                  >
                  <textarea
                    id="bio"
                    name="bio"
                    rows="4"
                    class="w-full p-2 border rounded"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  class="w-full bg-blue-600 text-white p-2 rounded font-bold"
                >
                  프로필 업데이트
                </button>
              </form>
            </div>
          </main>

          <div id="footer-container"></div>
        </div>
      </div>
    `;
  }
}
