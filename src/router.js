export const createRouter = () => {
  const routes = {}

  const addRoute = (path, component) => {
    routes[path] = component
  }

  const render = () => {
    const path = window.location.pathname

    // 로그인 정보 체크
    const isUser = JSON.parse(localStorage.getItem("user"))

    if (isUser && path === "/login") {
      return goTo("/")
    }
    if (!isUser && path === "/profile") {
      return goTo("/login")
    } else {
      const route = routes[path] || routes["/404"]
      document.querySelector("#root").innerHTML = route()
    }
  }

  const goTo = (path) => {
    window.history.pushState({}, path, window.location.origin + path)
    render()
  }

  return { addRoute, render, goTo }
}
