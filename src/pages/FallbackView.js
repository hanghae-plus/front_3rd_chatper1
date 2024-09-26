import { paths } from '../constant'
import { Router } from '../router'
import Layout from './Layout'

export class FallbackView extends Layout {
  constructor(message) {
    super()
    this.message = message
    this.element = this.createElement()
  }

  createElement() {
    const div = super.createElement()

    div.innerHTML = `
      <div
        class="flex flex-col items-center justify-center h-screen bg-gray-50">
        <div
          class="bg-gray-100 border border-gray-300 text-gray-800 px-8 py-6 rounded-lg shadow-xl text-center">
          <h1 class="text-3xl font-bold mb-4 text-red-600">⚠️ 오류 발생!</h1>
          <p class="text-lg mb-4">${this.message ?? '의도적인 오류입니다.'}</p>
          <button
            id="rollback-button"
            class="mt-4 bg-indigo-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-indigo-700 transition duration-200">
            홈으로 돌아가기
          </button>
        </div>
      </div>
    `

    this.addEventListeners(div)
    return div
  }

  addEventListeners(container) {
    const btn = container.querySelector('#rollback-button')
    if (!btn) {
      return
    }

    btn.addEventListener('click', (event) => {
      event.preventDefault()
      this.handleRollback()
    })
  }

  handleRollback() {
    Router.redirect(paths.main)
  }
}
