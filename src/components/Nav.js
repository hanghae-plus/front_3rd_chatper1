import Component from '../../core/Component';
import { getUser } from '../helpers';

const isActiveRoute = (path) => {
  return window.location.pathname === path;
};

class Nav extends Component {
  setup() {
    this.$target.className = 'bg-white shadow-md p-2 sticky top-14';

    const isLogin = !!getUser();

    this.state = {
      isLogin,
      menus: [
        {
          title: '홈',
          path: '/',
        },
      ],
    };

    if (isLogin) {
      this.state.menus.push({
        title: '프로필',
        path: '/profile',
      });
    } else {
      this.state.menus.push({
        title: '로그인',
        path: '/login',
      });
    }
  }

  // TODO: 로그인 상태 관리 구현
  template() {
    const { menus, isLogin } = this.state;

    const menuListHtml = menus
      .map(({ title, path }) => {
        const classNames = isActiveRoute(path) ? 'link text-blue-600 font-bold' : 'link text-gray-600';

        return `
          <li><a href="${path}" class="${classNames}">${title}</a></li>
        `.trim();
      })
      .join('');

    return `
      <ul class="flex justify-around">
        ${menuListHtml}
        ${isLogin ? '<li><a href="#" id="logout" class="text-gray-600">로그아웃</a></li>' : ''}
      </ul>
    `;
  }
}

export default Nav;
