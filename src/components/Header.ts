import { isLoggedIn, logout } from '../shared/auth';
import { BaseComponent } from '../shared/BaseComponent';

interface IHeader {
  linkList: { text: string; link: string }[];
}

export class Header extends BaseComponent implements IHeader {
  linkList: IHeader['linkList'] = [];

  constructor(selector: string) {
    super(selector);

    this.linkList = isLoggedIn()
      ? [
          { text: '홈', link: '/' },
          { text: '프로필', link: '/profile' },
          { text: '로그아웃', link: '#' },
        ]
      : [
          { text: '홈', link: '/' },
          { text: '로그인', link: '/login' },
        ];

    this.render();
  }

  afterRender(): void {
    this.bindEvents();
  }

  private renderLinkList() {
    return this.linkList
      .map(
        ({ link, text }) =>
          `<li>
             <a href="${link}" class="${
            this.isActiveLink(link) ? 'text-blue-600' : 'text-gray-600'
          }" data-text="${text}">
              ${text}
            </a>
          </li>`
      )
      .join('');
  }

  private bindEvents() {
    const $logoutLink = this.querySelector('a[data-text="로그아웃"]');
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
