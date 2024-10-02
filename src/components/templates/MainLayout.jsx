/** @jsx createVNode */
import { createVNode } from '@lib'

import { Header, Footer, Navigation } from '@components'
import { globalStore } from '@stores'

export const MainLayout = ({ children }) => {
  const { loggedIn } = globalStore.getState()
  return (
    <div class="bg-gray-100 min-h-screen flex justify-center">
      <div class="max-w-md w-full">
        <Header />
        <Navigation loggedIn={loggedIn} />
        {children}
        <Footer />
      </div>
    </div>
  )
}
