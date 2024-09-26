import Component from '../core/component';
import { getStoreState } from '../module/store';

export default class Header extends Component {
  state: { username: string };
  constructor(id: string) {
    super(id);
  }
  init() {
    const { username } = getStoreState('userData');
    this.state = { username };
    if (!this.container) return;
    if (username) this.container.className = 'sticky top-0';
  }

  template() {
    return `
            <header class="bg-blue-600 text-white p-4">
                <h1 class="text-2xl font-bold">항해플러스</h1>
            </header>
            <nav class="bg-white shadow-md p-2">
                <ul class="flex justify-around">
                <li class="w-full">
                  <a href="/" data-path="/" class="block w-full text-center ${
                    location.pathname == '/'
                      ? 'text-blue-600 font-bold'
                      : 'text-gray-600'
                  }">
                    
                      홈
                      </a>
                </li>

                ${
                  this.state.username
                    ? `
                      <li class="w-full">
                        <a href="/profile" data-path="/profile" class="block w-full text-center ${
                          location.pathname == '/profile'
                            ? 'text-blue-600 font-bold'
                            : 'text-gray-600'
                        }">
                          
                            프로필
                            </a>
                      </li>
                      <li class="w-full">
                        <button id="logout" data-button="logout" class="w-full text-center text-gray-600">
                          로그아웃
                        </button>
                      </li>
                    `
                    : `
                      <li class="w-full">
                        <a href="/login" data-path="/login" class="block w-full text-center text-gray-600">
                            로그인
                        </a>
                      </li>
                    `
                }
                </ul>
            </nav>
        `;
  }
}
