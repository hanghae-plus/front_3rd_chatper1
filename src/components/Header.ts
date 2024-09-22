import { isLoggedIn, logout } from '../shared/auth';
import { BaseComponent } from '../shared/BaseComponent';

const LOGOUT_ID = 'logout';

interface IHeader {
  linkList: { id: string; text: string; link: string }[];
}

export class Header extends BaseComponent implements IHeader {
  linkList: IHeader['linkList'] = [];

  constructor(selector: string) {
    super(selector);

    this.linkList = isLoggedIn()
      ? [
          { id: 'home-link', text: '홈', link: '/' },
          { id: 'profile-link', text: '프로필', link: '/profile' },
          { id: LOGOUT_ID, text: '로그아웃', link: '#' },
        ]
      : [
          { id: 'home-link', text: '홈', link: '/' },
          { id: 'login-link', text: '로그인', link: '/login' },
        ];

    this.render();
  }

  afterRender(): void {
    this.bindEvents();
  }

  private renderLinkList() {
    return this.linkList
      .map(
        ({ id, link, text }) =>
          `<li>
             <a href="${link}" class="${
            this.isActiveLink(link) ? 'text-blue-600' : 'text-gray-600'
          }" id=${id}>
              ${text}
            </a>
          </li>`
      )
      .join('');
  }

  private bindEvents() {
    const $logoutLink = this.querySelector(`#${LOGOUT_ID}`);
    if ($logoutLink) {
      $logoutLink.addEventListener('click', (e) => {
        e.preventDefault();
        logout();
      });
    }
  }

  private isActiveLink(link: string): boolean {
    return window.location.pathname === link;
  }

  template() {
    return `<header class="bg-blue-600 text-white p-4 sticky top-0">
          <h1 class="text-2xl font-bold">항해플러스</h1>
        </header>
  
        <nav class="bg-white shadow-md p-2 sticky top-14">
          <ul class="flex justify-around">
  ${this.renderLinkList()}            
          </ul>
        </nav>`;
  }
}
