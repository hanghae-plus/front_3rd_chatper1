import { isLoggedIn, logout } from '../util/auth';
import { BaseComponent } from './BaseComponent';

const LOGOUT_ID = 'logout';

type Link = { id?: string; text: string; link: string };

export class Header extends BaseComponent {
  private linkList: Link[] = [];

  constructor(selector: string) {
    super(selector);
  }

  beforeRender() {
    this.linkList = this.getLinkList();
  }

  afterRender() {
    this.bindLogoutEvents();
  }

  private getLinkList(): Link[] {
    const commonLinks = [{ text: '홈', link: '/' }];
    const authLinks = isLoggedIn()
      ? [
          { text: '프로필', link: '/profile' },
          { text: '로그아웃', link: '#', id: LOGOUT_ID },
        ]
      : [{ text: '로그인', link: '/login' }];

    return [...commonLinks, ...authLinks];
  }

  private renderLinkList() {
    return this.linkList
      .map(({ id, link, text }) => {
        const activeClass = this.isActiveLink(link)
          ? 'text-blue-600'
          : 'text-gray-600';
        const linkId = id ? `id=${id}` : '';

        return `<li>
                  <a href="${link}" class="${activeClass}" ${linkId}>
                    ${text}
                  </a>
                </li>`;
      })
      .join('');
  }

  private bindLogoutEvents() {
    const $logoutLink = this.$root?.querySelector(`#${LOGOUT_ID}`);
    if ($logoutLink) {
      $logoutLink.addEventListener('click', this.handleLogout);
    }
  }

  private handleLogout(e: Event) {
    e.preventDefault();
    logout();
  }

  private isActiveLink(link: string): boolean {
    return window.location.pathname === link;
  }

  template() {
    return `
      <header class="bg-blue-600 text-white p-4 sticky top-0">
        <h1 class="text-2xl font-bold">항해플러스</h1>
      </header>
  
      <nav class="bg-white shadow-md p-2 sticky top-14">
        <ul class="flex justify-around">
          ${this.renderLinkList()}
        </ul>
      </nav>
    `;
  }
}
