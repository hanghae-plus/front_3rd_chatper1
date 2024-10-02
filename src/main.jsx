/** @jsx createVNode */
import { createElement, createRouter, createVNode, renderElement } from "./lib"
import { HomePage, LoginPage, NotFoundPage, ProfilePage } from "./pages"
import { globalStore } from "./stores"
import { ForbiddenError, UnauthorizedError } from "./errors"
import { userStorage } from "./storages"
import { addEvent, registerGlobalEvents } from "./utils"
import { App } from "./App"

const router = createRouter({
  "/": () => <HomePage />,
  "/login": () => {
    const { loggedIn } = globalStore.getState()
    if (loggedIn) {
      throw new ForbiddenError()
    }
    return <LoginPage />
  },
  "/profile": () => {
    const { loggedIn } = globalStore.getState()
    if (!loggedIn) {
      throw new UnauthorizedError()
    }
    return <ProfilePage />
  },
  "/404": () => <NotFoundPage />,
})

function logout() {
  globalStore.setState({ currentUser: null, loggedIn: false })
  router.push("/login")
  userStorage.reset()
}

function handleError(error) {
  globalStore.setState({ error })
}

// 초기화 함수
function render() {
  const $root = document.querySelector("#root")

  try {
    // const $app = createElement(<App targetPage={router.getTarget()} />)
    const $app = renderElement(<App targetPage={router.getTarget()} />, $root)
    // if ($root.hasChildNodes()) { // 이미 root div 에 넣으므로 필요 없음
    //   $root.firstChild.replaceWith($app)
    // } else {
    //   $root.appendChild($app)
    // }
  } catch (error) {
    if (error instanceof ForbiddenError) {
      router.push("/")
      return
    }
    if (error instanceof UnauthorizedError) {
      router.push("/login")
      return
    }
    console.error(error)

    // globalStore.setState({ error })
  }
  registerGlobalEvents()
}

function main() {
  router.subscribe(render)
  globalStore.subscribe(render)
  window.addEventListener("error", handleError)
  window.addEventListener("unhandledrejection", handleError)

  addEvent("click", "[data-link]", (e) => {
    e.preventDefault()
    router.push(e.target.href.replace(window.location.origin, ""))
  })

  addEvent("submit", "#login-form , #profile-form", (e) => {
    e.preventDefault()

    const username = e.target.elements?.username?.value || ""
    const email = e.target.elements?.email?.value || ""
    const bio = e.target.elements?.bio?.value || ""

    if (e.target.id === "login-form") {
      if (username === "") {
        alert("사용자 이름을 입력해 주세요.")
        return
      }
    }

    globalStore.setState({
      currentUser: { username, email, bio },
      loggedIn: true,
    })
    userStorage.set({ username, email, bio })

    if (e.target.id === "profile-form") {
      alert("프로필이 수정되었습니다.")
    }
  })

  addEvent("click", "#logout", (e) => {
    e.preventDefault()
    logout()
  })

  addEvent("click", "#error-boundary", (e) => {
    e.preventDefault()
    globalStore.setState({ error: null })
  })

  render()
}

main()
