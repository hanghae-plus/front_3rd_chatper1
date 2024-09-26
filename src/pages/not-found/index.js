import { PROJECT_NAME } from '@constants'
export default function notFoundPage({ title, buttonMessage, replacePath }) {
  const template = `<main class="bg-gray-100 flex items-center justify-center min-h-screen">
      <div class="bg-white p-8 rounded-lg shadow-md w-full text-center" style="max-width: 480px">
        <h1 class="text-2xl font-bold text-blue-600 mb-4">${PROJECT_NAME}</h1>
        <p class="text-4xl font-bold text-gray-800 mb-4">404</p>
        <p class="text-xl text-gray-600 mb-8">페이지를 찾을 수 없습니다</p>
        <p class="text-gray-600 mb-8">
          ${title}
        </p>
        <a href="${replacePath}" class="bg-blue-600 text-white px-4 py-2 rounded font-bold">
          ${buttonMessage}
        </a>
      </div>
  </main>`

  function render() {
    document.getElementById('root').innerHTML = template
  }

  return {
    render,
  }
}
