import Component from './component.js';
import router from '../router.js';
import { html } from 'code-tag';
import UserStore from '../store/userStore.js';

export default class Header extends Component {
  #handleEvents = {
    handleHomeClickBound: null,
    handleProfileClickBound: null,
    handleLoginClickBound: null,
    handleLogoutClickBound: null
  };

  #userStore = null;

  constructor() {
    super();

    this.#userStore = new UserStore();

    this.#handleEvents.handleHomeClickBound = this.#handleHomeClick.bind(this);
    this.#handleEvents.handleProfileClickBound = this.#handleProfileClick.bind(this);
    this.#handleEvents.handleLoginClickBound = this.#handleLoginClick.bind(this);
    this.#handleEvents.handleLogoutClickBound = this.#handleLogoutClick.bind(this);
  }

  #navigate(path) {
    window.history.pushState({}, '', path);
    router.router();
  }

  #logout() {
    this.#userStore.clearState();
    localStorage.removeItem('user');
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

  #handleLoginClick(e) {
    e.preventDefault();
    this.#navigate('/login');
  }

  #handleLogoutClick(e) {
    e.preventDefault();
    this.#logout();
  }

  template() {
    const user = this.#userStore.getUser();

    return html`
      <header class="bg-blue-600 text-white p-4 sticky top-0">
        <h1 class="text-2xl font-bold">항해플러스</h1>
      </header>

      <nav class="bg-white shadow-md p-2 sticky top-14">
        <ul class="flex justify-around">
          <li id="home"><a class="${router.path() === '/' ? 'text-blue-600 font-bold' : 'text-gray-600'}" href="#">홈</a>
          </li>
          <li id="profile"><a class="${router.path() === '/profile' ? 'text-blue-600 font-bold' : 'text-gray-600'}"
                              href="#">프로필</a>
          </li>
          ${user?.username ? html`
              <li id="logout"><a class="text-gray-600" href="#">로그아웃</a></li>` :
            html`
              <li id="login"><a class="text-gray-600" href="/login">로그인</a></li>`}
        </ul>
      </nav>
    `;
  }

  #addEventListeners() {
    const home = document.getElementById('home');
    const profile = document.getElementById('profile');
    const login = document.getElementById('login');
    const logout = document.getElementById('logout');

    home.addEventListener('click', this.#handleEvents.handleHomeClickBound);
    profile.addEventListener('click', this.#handleEvents.handleProfileClickBound);
    login?.addEventListener('click', this.#handleEvents.handleLoginClickBound);
    logout?.addEventListener('click', this.#handleEvents.handleLogoutClickBound);
  }

  hydrate() {
    this.#addEventListeners();
  }

  #removeEventListeners() {
    const home = document.getElementById('home');
    const profile = document.getElementById('profile');
    const login = document.getElementById('login');
    const logout = document.getElementById('logout');

    home.removeEventListener('click', this.#handleEvents.handleHomeClickBound);
    profile.removeEventListener('click', this.#handleEvents.handleProfileClickBound);
    login?.removeEventListener('click', this.#handleEvents.handleLogoutClickBound);
    logout?.removeEventListener('click', this.#handleEvents.handleLogoutClickBound);
  }

  dehydrate() {
    this.#removeEventListeners();
  }
}