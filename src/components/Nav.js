import Component from '../../core/Component';

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
      ],
    };
  }

  template() {
    const menuListHtml = this.state.menus
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
        <li><a href="#" id="logout" class="text-gray-600">로그아웃</a></li>
      </ul>
    `;
  }
}

export default Nav;
