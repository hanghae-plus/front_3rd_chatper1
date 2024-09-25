import Component from './component.js';
import router from '../router.js';
import { html } from 'code-tag';
import UserStore from '../store/userStore.js';

export default class Header extends Component {
  #handleEvents = {
    handleHomeClickBound: null,
    handleProfileClickBound: null,
    handlerLogoutClickBound: null
  };

  constructor() {
    super();

    this.#handleEvents.handleHomeClickBound = this.#handleHomeClick.bind(this);
    this.#handleEvents.handleProfileClickBound = this.#handleProfileClick.bind(this);
    this.#handleEvents.handlerLogoutClickBound = this.#handleLogoutClick.bind(this);
  }

  #navigate(path) {
    window.history.pushState({}, '', path);
    router.router();
  }

  #logout() {
    localStorage.removeItem('user');
    new UserStore().clear();
    router.router();
  }

  #handleHomeClick(e) {
    e.preventDefault();
    this.#navigate('/');
  }

  #handleProfileClick(e) {
    e.preventDefault();
    this.#navigate('/profile');
  }

  #handleLogoutClick(e) {
    e.preventDefault();
    this.#logout();
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

    home.addEventListener('click', this.#handleEvents.handleHomeClickBound);
    profile.addEventListener('click', this.#handleEvents.handleProfileClickBound);
    logout.addEventListener('click', this.#handleEvents.handlerLogoutClickBound);
  }

  mount() {
    this.#addEventListeners();
  }

  #removeEventListeners() {
    const home = document.getElementById('home');
    const profile = document.getElementById('profile');
    const logout = document.getElementById('logout');

    home.removeEventListener('click', this.#handleEvents.handleHomeClickBound);
    profile.removeEventListener('click', this.#handleEvents.handleProfileClickBound);
    logout.removeEventListener('click', this.#handleEvents.handlerLogoutClickBound);
  }

  unmount() {
    this.#removeEventListeners();
  }
}