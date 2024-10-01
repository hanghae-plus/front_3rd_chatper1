/** @jsx createVNode */
import { createVNode } from "./lib"
import { NotFoundPage } from "./pages"
import { globalStore } from "./stores"

export const App = ({ targetPage }) => {
  return <div>{targetPage()}</div>
}
