import Component from '../core/component';
import { useRouter } from '../module/route';
import { getStoreState, subscribe } from '../module/store';
import { UserDataType } from '../type';

export default class ProfilePage extends Component {
  state: UserDataType;

  init() {
    const { username, email, bio } = getStoreState('userData');
    this.state = { username, email, bio };
  }

  update(data: { [key: string]: string }) {
    const { username, email, bio } = data;
    this.state = { username, email, bio };
  }

  mounted() {
    if (this.state['username']) this.container.className = 'p-4';
    else this.router.push('/login');
  }

  template() {
    return `
              <div class="bg-white p-8 rounded-lg shadow-md">
                <h2 class="text-2xl font-bold text-center text-blue-600 mb-8">내 프로필</h2>
                <form id="profile-form" data-form="profile">
                  <div class="mb-4">
                    <label for="username" class="block text-gray-700 text-sm font-bold mb-2">사용자 이름</label>
                    <input type="text" id="username" name="username" value="${this.state.username}" class="w-full p-2 border rounded">
                  </div>
                  <div class="mb-4">
                    <label for="email" class="block text-gray-700 text-sm font-bold mb-2">이메일</label>
                    <input type="email" id="email" name="email" value="${this.state.email}" pattern="[a-zA-Z0-9]+[@][a-zA-Z0-9]+[.]+[a-zA-Z]+[.]*[a-zA-Z]*" class="w-full p-2 border rounded">
                  </div>
                  <div class="mb-6">
                    <label for="bio" class="block text-gray-700 text-sm font-bold mb-2">자기소개</label>
                    <textarea id="bio" name="bio" rows="4" class="w-full p-2 border rounded">${this.state.bio}</textarea>
                  </div>
                  <button type="submit" class="w-full bg-blue-600 text-white p-2 rounded font-bold">프로필 업데이트</button>
                </form>
              </div>
      `;
  }
}
