import Component from '../core/component';
import { useRouter } from '../module/route';
import store, { destroyStore, useStore } from '../module/store';

export default class Header extends Component {
  state: { username: string; pathname: string };
  constructor(id: string) {
    super(id);
  }
  init() {
    useStore('userData', this);
    useStore('pathname', this);
    this.state.username = store.getState('userData').username;
    this.state.pathname = store.getState('pathname').pathname;
    if (!this.container) return;
    if (this.state.username) this.container.className = 'sticky top-0';
    else this.container.className = 'none';
  }

  update(data: { username?: string; pathname?: string }): void {
    if (data?.username) this.state.username = data.username;
    if (data?.pathname) this.state.pathname = data.pathname;
    this.render();
  }

  attachEventListeners() {
    const btnList = this.container.querySelectorAll('[data-path]');
    if (btnList.length) {
      btnList.forEach((button: Element) => {
        button.addEventListener('click', (event) => {
          event.preventDefault();
          const { currentTarget } = event;
          const path = (currentTarget as Element).getAttribute('data-path');
          if (location.pathname == path) return;

          const router = useRouter();
          if (path) router.push(path);
        });
      });
    }

    const aList = this.container.querySelectorAll('a[href]');
    if (aList.length) {
      aList.forEach((a: Element) =>
        a.addEventListener('click', (event: Event) => {
          event.preventDefault();
        })
      );
    }
  }

  destroy() {
    if (this.container) {
      this.container.className = 'none';
      this.container.innerHTML = '';
    }
    destroyStore('userData', this);
    destroyStore('pathname', this);
  }

  template() {
    return `
            <header class="bg-blue-600 text-white p-4">
                <h1 class="text-2xl font-bold">항해플러스</h1>
            </header>
            <nav class="bg-white shadow-md p-2">
                <ul class="flex justify-around">
                <li class="w-full">
                  <a href="/" class="block w-full text-center ${
                    this.state.pathname == '/'
                      ? 'text-blue-600 font-bold'
                      : 'text-gray-600'
                  }">
                    <button data-path="/" class="w-full">
                      홈
                    </button>
                  </a>
                </li>

                ${
                  this.state.username
                    ? `
                      <li class="w-full">
                        <a href="/profile" class="block w-full text-center ${
                          this.state.pathname == '/profile'
                            ? 'text-blue-600 font-bold'
                            : 'text-gray-600'
                        }">
                          <button data-path="/profile" class="w-full">
                            프로필
                          </button>
                        </a>
                      </li>
                      <li class="w-full">
                        <button id="logout" data-path="/logout" class="w-full text-center text-gray-600">
                          로그아웃
                        </button>
                      </li>
                    `
                    : `
                      <li class="w-full">
                        <a href="/login" class="block w-full text-center text-gray-600">
                          <button data-path="/login" class="w-full">
                            로그인
                          </button>
                        </a>
                      </li>
                    `
                }
                </ul>
            </nav>
        `;
  }
}
