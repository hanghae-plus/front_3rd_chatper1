import { Navigation, Header, Footer } from '@components'

export default function Layout(children) {
  return `<div class="bg-gray-100 min-h-screen flex justify-center">
    <div class="max-w-md w-full">
      ${Header()}
      ${Navigation()}
      ${children}
      ${Footer()}
    </div>
  </div>`
}
