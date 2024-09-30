/** @jsx createVNode */
import { createVNode } from "../../lib"
import { globalStore } from "../../stores"

export const Navigation = () => {
  const { loggedIn } = globalStore.getState()
  const currentStyle = (href) => {
    return location.pathname === href
      ? "text-blue-600 font-bold"
      : "text-gray-600"
  }

  const createLi = (href, text) => {
    return (
      <li>
        <a href={href} class={currentStyle(href)} data-link="true">
          {text}
        </a>
      </li>
    )
  }

  return (
    <nav class="bg-white shadow-md p-2 sticky top-14">
      <ul class="flex justify-around">
        {createLi("/", "홈")}
        {loggedIn
          ? createLi("/profile", "프로필")
          : createLi("/login", "로그인")}
        {loggedIn && (
          <li>
            <a href="/login" id="logout" class={currentStyle("/login")}>
              로그아웃
            </a>
          </li>
        )}
      </ul>
    </nav>
  )
}
