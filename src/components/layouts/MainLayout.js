import { Header, Footer } from '@components/layouts'

export default function MainLayout(children) {
  return `<div class="bg-gray-100 min-h-screen flex justify-center">
    <div class="max-w-md w-full">
      ${Header()}
      ${children}
      ${Footer()}
    </div>
  </div>`
}
