import Component from '../../core/Component';
import userStore from '../stores/userStore';

const isActiveRoute = (path) => {
  return window.location.pathname === path;
};

class Nav extends Component {
  setup() {
    this.$target.className = 'bg-white shadow-md p-2 sticky top-14';

    this.state = {
      menus: [
        {
          title: '홈',
          path: '/',
        },
        {
          title: '프로필',
          path: '/profile',
        },
        {
          title: '로그인',
          path: '/login',
        },
      ],
    };
  }

  template() {
    const isLogin = userStore.isLogin;
    const { menus } = this.state;
    const filteredMenus = menus.filter((menu) => {
      if (isLogin && menu.path === '/login') {
        return false;
      }

      if (!isLogin && menu.path === '/profile') {
        return false;
      }

      return true;
    });

    const menuListHtml = filteredMenus
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
