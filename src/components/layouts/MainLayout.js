import { Navigation, Header, Footer } from '@components/layouts'

export default function MainLayout(children) {
  return `<div class="bg-gray-100 min-h-screen flex justify-center">
    <div class="max-w-md w-full">
      ${Header()}
      ${Navigation()}
      ${children}
      ${Footer()}
    </div>
  </div>`
}
