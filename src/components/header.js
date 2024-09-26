import { store } from '../main';
import { navigate } from '../utils/routes';
import { deleteStorage } from '../utils/storage';
import Component from './common/component';

export default class Header extends Component {
  constructor(target) {
    super(target);
  }

  anchorClass(targetPath) {
    const isPathMatched = targetPath === window.location.pathname;
    return isPathMatched ? 'text-blue-600 font-bold' : 'text-gray-600';
  }

  handleLogout() {
    deleteStorage('user');
    store.setState({ isLogin: false, user: null });
  }

  bindEvents() {
    document.querySelector('nav ul').addEventListener('click', (event) => {
      event.preventDefault();

      if (!event.target.pathname) return;

      const { pathname } = event.target;
      if (pathname === '/logout') {
        this.handleLogout();
        return;
      }

      navigate(pathname);
    });
  }

  template() {
    const { isLogin } = store.getState();

    return `
      <header class="bg-blue-600 text-white p-4 sticky top-0">
        <h1 class="text-2xl font-bold">항해플러스</h1>
      </header>

      <nav class="bg-white shadow-md p-2 sticky top-14">
        <ul class="flex justify-around">
          <li><a href="/" class="${this.anchorClass('/')}">홈</a></li>
          ${
            isLogin
              ? `<li><a href="/profile" class="${this.anchorClass('/profile')}">프로필</a></li>`
              : ''
          }
          <li>
          ${
            isLogin
              ? `<a href="/logout" id="logout" class="text-gray-600">
                로그아웃
              </a>`
              : `<a href="/login" class="text-gray-600">
                로그인
              </a>`
          }
          </li>
        </ul>
      </nav>
    `;
  }
}
