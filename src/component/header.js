import Component from './component.js';
import router from '../router.js';
import { html } from 'code-tag';

export default class Header extends Component {
  constructor() {
    super();
  }

  #navigate(path, menu) {
    window.history.pushState({}, '', path);
    this.unmount();
    router.router();
  }

  #logout() {
    localStorage.removeItem('user');
    this.unmount();
    router.router();
  }

  render() {
    return html`
      <header class="bg-blue-600 text-white p-4 sticky top-0">
        <h1 class="text-2xl font-bold">항해플러스</h1>
      </header>

      <nav class="bg-white shadow-md p-2 sticky top-14">
        <ul class="flex justify-around">
          <li><a class="${router.path() === '/' ? 'text-blue-600' : 'text-gray-600'}" href="#"
                 id="home">홈</a>
          </li>
          <li><a class="${router.path() === '/profile' ? 'text-blue-600' : 'text-gray-600'}" href="#"
                 id="profile">프로필</a></li>
          <li><a class="text-gray-600" href="#" id="logout">로그아웃</a></li>
        </ul>
      </nav>
    `;
  }

  #addEventListeners() {
    const home = document.getElementById('home');
    const profile = document.getElementById('profile');
    const logout = document.getElementById('logout');

    home.addEventListener('click', (e) => {
      e.preventDefault();
      this.#navigate('/');
    });

    profile.addEventListener('click', (e) => {
      e.preventDefault();
      this.#navigate('/profile');
    });

    logout.addEventListener('click', (e) => {
      e.preventDefault();
      this.#logout();
    });
  }

  #removeEventListeners() {
    const home = document.getElementById('home');
    const profile = document.getElementById('profile');
    const logout = document.getElementById('logout');

    home.removeEventListener('click', this.#navigate);
    profile.removeEventListener('click', this.#navigate);
    logout.removeEventListener('click', this.#logout);
  }

  mount() {
    this.#addEventListeners();
  }

  unmount() {
    this.#removeEventListeners();
  }
}