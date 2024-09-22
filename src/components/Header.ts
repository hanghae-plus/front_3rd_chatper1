import { BaseComponent } from '../shared/BaseComponent';

interface IHeader {
  linkList: { text: string; link: string }[];
}

export class Header extends BaseComponent implements IHeader {
  linkList = [
    { text: '홈', link: '/' },
    { text: '프로필', link: '/profile' },
    { text: '로그아웃', link: '#' },
  ];

  constructor(selector: string) {
    super(selector);
    this.render();
  }

  private renderLinkList() {
    return this.linkList
      .map(
        ({ link, text }) =>
          `<li>
             <a href="${link}" class="${
            this.isActiveLink(link) ? 'text-blue-600' : 'text-gray-600'
          }">
              ${text}
            </a>
          </li>`
      )
      .join('');
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
