import { PAGE_TITLE } from '@constants'

export default function header() {
  return `<header class="bg-blue-600 text-white p-4 sticky top-0">
    <h1 class="text-2xl font-bold">${PAGE_TITLE}</h1>
  </header>`
}
