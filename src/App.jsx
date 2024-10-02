/** @jsx createVNode */
import { createVNode } from '@lib'
import { globalStore } from '@stores'
import { NotFoundPage } from '@pages'
import { ErrorBoundary } from '@components'

export function App({ targetPage }) {
  const PageComponent = targetPage ?? NotFoundPage
  const error = globalStore.getState().error

  return (
    <div>
      <PageComponent />
      {error && <ErrorBoundary message={error.message} />}
    </div>
  )
}
