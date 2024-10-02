/** @jsx createVNode */
import { createVNode } from '@lib'
import { globalStore } from '@stores'
import { MainLayout } from '@components/templates'
import { userStorage } from '@storages'

function updateUserInfo(userPayload) {
  globalStore.setState({
    currentUser: userPayload,
  })
  userStorage.set(userPayload)
  alert('프로필이 업데이트되었습니다.')
}

export const ProfilePage = () => {
  const handleSubmit = (e) => {
    e.preventDefault()
    const { username, email, bio } = e.target.elements
    const userPayload = {
      username: username.value,
      email: email.value,
      bio: bio.value,
    }
    updateUserInfo(userPayload)
  }
  const { currentUser } = globalStore.getState()
  const { username = '', email = '', bio = '' } = currentUser ?? {}
  return (
    <MainLayout>
      <main class="p-4">
        <div class="bg-white p-8 rounded-lg shadow-md">
          <h2 class="text-2xl font-bold text-center text-blue-600 mb-8">내 프로필</h2>
          <form id="profile-form" onSubmit={handleSubmit}>
            <div class="mb-4">
              <label for="username" class="block text-gray-700 text-sm font-bold mb-2">
                사용자 이름
              </label>
              <input
                type="text"
                id="username"
                name="username"
                class="w-full p-2 border rounded"
                value={username}
                required
              />
            </div>
            <div class="mb-4">
              <label for="email" class="block text-gray-700 text-sm font-bold mb-2">
                이메일
              </label>
              <input type="email" id="email" name="email" class="w-full p-2 border rounded" value={email} required />
            </div>
            <div class="mb-6">
              <label for="bio" class="block text-gray-700 text-sm font-bold mb-2">
                자기소개
              </label>
              <textarea id="bio" name="bio" rows="4" class="w-full p-2 border rounded">
                {bio}
              </textarea>
            </div>
            <button type="submit" class="w-full bg-blue-600 text-white p-2 rounded font-bold">
              프로필 업데이트
            </button>
          </form>
        </div>
      </main>
    </MainLayout>
  )
}
