import { loginStore, NAVIGATION_PAGE } from '../main';
import Store, { Observer } from '../Store';

class NavBar extends Observer {
  constructor() {
    super();
    this.isLoggedIn = loginStore.getState().isLoggedIn;

    this.selectedStore = new Store({ selected: 'home' });
    loginStore.addObserver(this);
  }

  update(data) {
    this.isLoggedIn = data.isLoggedIn;
  }

  template() {
    const navItems = Object.values(NAVIGATION_PAGE).map((route) => {
      if (!route.navTitle) return '';

      const selectClass = window.location.pathname === route.path ? 'text-blue-600 font-bold' : 'text-gray-600';
      const navEl = `<li><a href="${route.path}" class="${selectClass}">${route.navTitle}</a></li>`;

      if (!this.isLoggedIn && route.path === NAVIGATION_PAGE.profile.path) {
        return '';
      }

      return navEl;
    });

    return `
      <nav class="bg-white shadow-md p-2 sticky top-14">
        <ul class="flex justify-around">
        ${navItems.join('\n')}
        ${this.isLoggedIn ? '<li><a id="logout" href="/login" class="text-gray-600}">로그아웃</a></li>' : ''}
        </ul>
        </nav>
`;
  }
}

export default NavBar;
