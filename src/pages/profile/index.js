import { MainLayout } from '@components/layouts'
import { MESSAGE, DELAY_TIME } from '@constants'
import { throttle } from '@utils'
import { UserStore } from '@stores'

const userStore = UserStore()

export default function profilePage() {
  const user = userStore.getState('user')

  function getProfileFormData() {
    const username = document.getElementById('username').value
    const email = document.getElementById('email').value
    const bio = document.getElementById('bio').value
    return { username, email, bio }
  }

  const template = MainLayout(`
    <main class="p-4">
      <div class="bg-white p-8 rounded-lg shadow-md">
        <h2 class="text-2xl font-bold text-center text-blue-600 mb-8">내 프로필</h2>
        <form id="profile-form">
          <div class="mb-4">
            <label for="username" class="block text-gray-700 text-sm font-bold mb-2">사용자 이름</label>
            <input type="text" id="username" name="username" value="${
              user.username ?? user?.name
            }" class="w-full p-2 border rounded">
          </div>
          <div class="mb-4">
            <label for="email" class="block text-gray-700 text-sm font-bold mb-2">이메일</label>
            <input type="email" id="email" name="email" value="${user?.email}" class="w-full p-2 border rounded">
          </div>
          <div class="mb-6">
            <label for="bio" class="block text-gray-700 text-sm font-bold mb-2">자기소개</label>
            <textarea id="bio" name="bio" rows="4" class="w-full p-2 border rounded">${user?.bio}</textarea>
          </div>
          <button type="submit" class="w-full bg-blue-600 text-white p-2 rounded font-bold">프로필 업데이트</button>
        </form>
      </div>
    </main>
  `)

  let throttledUpdate = throttle(() => {
    const userInfo = getProfileFormData()
    userStore.setState('user', userInfo)
    alert(MESSAGE.PROFILE_UPDATED)
  }, DELAY_TIME.LONG)

  function render() {
    document.getElementById('root').innerHTML = template
    const profileForm = document.getElementById('profile-form')

    profileForm?.addEventListener('submit', (e) => {
      e.preventDefault()
      throttledUpdate()
    })
  }

  function cleanup() {
    const profileForm = document.getElementById('profile-form')
    profileForm?.removeEventListener('submit', throttledUpdate)
  }

  return {
    render,
    cleanup,
  }
}
