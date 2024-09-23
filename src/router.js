export const createRouter = () => {
  const routes = {}

  // 라우트 추가
  const addRoute = (path, component) => {
    routes[path] = component
  }

  // 렌더링
  const render = () => {
    const path = window.location.pathname

    // 로그인 정보 체크
    const isUser = JSON.parse(localStorage.getItem("user"))

    // 로그인 상태에서 로그인 페이지로 이동시
    if (isUser && path === "/login") {
      return goTo("/")
    }
    // 비로그인 상태에서 프로필 페이지로 이동시
    if (!isUser && path === "/profile") {
      return goTo("/login")
    }

    const route = routes[path] || routes["/404"] // 라우트가 없을 시 404 페이지로 이동
    document.querySelector("#root").innerHTML = route()
  }

  const goTo = (path) => {
    window.history.pushState({}, path, window.location.origin + path)
    render()
  }

  return { addRoute, render, goTo }
}
