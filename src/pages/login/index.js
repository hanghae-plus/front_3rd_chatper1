import Router from '@routers'
import { UserStore } from '@stores'
import { ROUTES, MESSAGE, PAGE_TITLE } from '@constants'

const userStore = UserStore()

export default function LoginPage() {
  function handleSaveUser(username) {
    const payload = { username, email: '', bio: '' }
    userStore.setState('user', payload)
    userStore.setState('isLogin', true)
  }

  function handleLogin(e) {
    e.preventDefault()
    const username = e.target.querySelector('#username').value
    if (!username) {
      alert(MESSAGE.LOGIN_REQUIRED_FIELD)
      return
    }
    handleSaveUser(username)
    Router.navigate(ROUTES.PROFILE)
  }

  function displayError(message) {
    let errorDiv = document.getElementById('error-message')
    if (!errorDiv) {
      errorDiv = document.createElement('div')
      errorDiv.id = 'error-message'
      document.getElementById('error-message-wrap').appendChild(errorDiv)
    }
    errorDiv.textContent = `${MESSAGE.ERROR} ${message}`
  }

  function handleErrorCatch(e) {
    try {
      if (e.target.value === '1') {
        throw new Error(MESSAGE.INTENTIONAL_ERROR)
      }
    } catch (error) {
      displayError(error.message)
    }
  }

  const template = `
    <main class="bg-gray-100 flex items-center justify-center min-h-screen">
      <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 class="text-2xl font-bold text-center text-blue-600 mb-8">${PAGE_TITLE}</h1>
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
    const loginForm = document.getElementById('login-form')
    const username = document.getElementById('username')
    loginForm.addEventListener('submit', handleLogin)
    username.addEventListener('input', handleErrorCatch, { once: true })
  }

  function cleanup() {
    const loginForm = document.getElementById('login-form')
    const username = document.getElementById('username')
    loginForm.removeEventListener('submit', handleLogin)
    username.removeEventListener('input', handleErrorCatch)
  }

  return { render, cleanup }
}
