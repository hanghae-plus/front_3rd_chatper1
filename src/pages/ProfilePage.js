import Footer from '../components/Footer'
import Header from '../components/Header'
import UserInfo from '../userInfo'
import Layout from './Layout'

export class ProfilePage extends Layout {
  createElement() {
    const userName = UserInfo.get('username') ?? ''
    const userEmail = UserInfo.get('email') ?? ''
    const userBio = UserInfo.get('bio') ?? ''

    const div = super.createElement()
    div.innerHTML = ` <div
      class="bg-gray-100 min-h-screen flex justify-center">
      <div class="max-w-md w-full">
        ${Header()}

        <main class="p-4">
          <div class="bg-white p-8 rounded-lg shadow-md">
            <h2 class="text-2xl font-bold text-center text-blue-600 mb-8">
              내 프로필
            </h2>
            <form id="profile-form">
              <div class="mb-4">
                <label
                  for="username"
                  class="block text-gray-700 text-sm font-bold mb-2"
                  >사용자 이름</label
                >
                <input
                  type="text"
                  id="username"
                  name="username"
                  value="${userName}"
                  class="w-full p-2 border rounded" />
              </div>
              <div class="mb-4">
                <label
                  for="email"
                  class="block text-gray-700 text-sm font-bold mb-2"
                  >이메일</label
                >
                <input
                  type="email"
                  id="email"
                  name="email"
                  value="${userEmail}"
                  class="w-full p-2 border rounded" />
              </div>
              <div class="mb-6">
                <label
                  for="bio"
                  class="block text-gray-700 text-sm font-bold mb-2"
                  >자기소개</label
                >
                <textarea
                  id="bio"
                  name="bio"
                  rows="4"
                  class="w-full p-2 border rounded">
${userBio}</textarea
                >
              </div>
              <button
                type="submit"
                class="w-full bg-blue-600 text-white p-2 rounded font-bold">
                프로필 업데이트
              </button>
            </form>
          </div>
        </main>

        ${Footer()}
      </div>
    </div>`

    this.addEventListeners(div)
    return div
  }

  addEventListeners(container) {
    const form = container.querySelector('#profile-form')
    if (!form) {
      return
    }

    form.addEventListener('submit', (event) => {
      event.preventDefault()
      this.handleModify(container)
    })
  }

  handleModify(container) {
    const updatedName = container.querySelector('#username').value
    const updatedEmail = container.querySelector('#email').value
    const updatedBio = container.querySelector('#bio').value

    UserInfo.set('username', updatedName)
    UserInfo.set('email', updatedEmail)
    UserInfo.set('bio', updatedBio)

    alert('업데이트 되었어요')
  }
}
