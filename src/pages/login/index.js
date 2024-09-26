import Router from '@routers'
import { UserStore } from '@stores'
import { ROUTES, PROJECT_NAME } from '@constants'

const userStore = UserStore()
const LOGIN_REQUIRED_FIELD = '이름과 비밀번호를 입력해주세요.'
const ERROR_MESSAGE = '오류 발생!'

export default function LoginPage() {
  function handleSaveUser(username) {
    const userPayload = { username, email: '', bio: '' }
    userStore.setState('user', userPayload)
    userStore.setState('isLogin', true)
  }

  function handleLogin(e) {
    e.preventDefault()
    const { username } = e.target.elements
    if (!username.value) return alert(LOGIN_REQUIRED_FIELD)
    handleSaveUser(username.value)
    Router.navigate(ROUTES.PROFILE)
  }

  function renderErrorBoundary(event) {
    document.getElementById('error-message-wrap').innerHTML = `<p>${ERROR_MESSAGE} ${event.message}</p>`
  }

  const template = `
    <main class="bg-gray-100 flex items-center justify-center min-h-screen">
      <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 class="text-2xl font-bold text-center text-blue-600 mb-8">${PROJECT_NAME}</h1>
        <form id="login-form">
          <div class="mb-4">
            <input type="text" id="username" placeholder="사용자 이름" class="w-full p-2 border rounded">
            <p id="error-message-wrap" class="text-xs text-red-500"></p>
          </div>
          <div class="mb-6">
            <input type="password" id="password" placeholder="비밀번호" class="w-full p-2 border rounded">
          </div>
          <button type="submit" class="w-full bg-blue-600 text-white p-2 rounded font-bold">로그인</button>
        </form>
        <div class="mt-4 text-center">
          <a href="#" class="text-blue-600 text-sm">비밀번호를 잊으셨나요?</a>
        </div>
        <hr class="my-6">
        <div class="text-center">
          <button class="bg-green-500 text-white px-4 py-2 rounded font-bold">새 계정 만들기</button>
        </div>
      </div>
    </main>
  `

  function render() {
    document.getElementById('root').innerHTML = template
    document.getElementById('login-form').addEventListener('submit', handleLogin)
    window.addEventListener('error', renderErrorBoundary)
  }

  function cleanup() {
    document.getElementById('login-form').removeEventListener('submit', handleLogin)
    window.removeEventListener('error', renderErrorBoundary)
  }

  return { render, cleanup }
}
