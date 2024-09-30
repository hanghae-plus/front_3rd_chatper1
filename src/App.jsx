/** @jsx createVNode */
import { NotFoundError } from "./errors"
import { createVNode } from "./lib"
import { NotFoundPage } from "./pages"
import { globalStore } from "./stores"

export const App = ({ targetPage }) => {
  const { error } = globalStore.getState()

  return <div>{!!error ? <NotFoundPage /> : targetPage()}</div>
}
