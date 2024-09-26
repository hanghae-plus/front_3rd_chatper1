import { selectIsLoggedIn } from "../store";
import { Component, ErrorBoundary } from "../base";
import { navigateTo } from "../router";

class Header extends Component {
  constructor(targetElement) {
    super(targetElement, {});
  }

  render() {
    const isLoggedIn = selectIsLoggedIn();
    const path = window.location.pathname;

    this.targetElement.innerHTML = `
      <header class="bg-blue-600 text-white p-4 sticky top-0">
        <h1 class="text-2xl font-bold">항해플러스</h1>
      </header>
      <nav class="bg-white shadow-md p-2 sticky top-14">
        <ul class="flex justify-around">
          <li><a href="/" class="${path === "/" ? "text-blue-600 font-bold" : "text-gray-600"}">홈</a></li>
          ${
            isLoggedIn
              ? `<li><a href="/profile" class="${
                  path === "/profile" ? "text-blue-600 font-bold" : "text-gray-600"
                }">프로필</a></li>` + `<li><a id="logout" href="/logout" class="text-gray-600">로그아웃</a></li>`
              : `<li><a href="/login" class="text-gray-600">로그인</a></li>`
          }
        </ul>
      </nav>
    `;

    this.targetElement.querySelector("nav").addEventListener("click", (e) => {
      if (e.target.tagName === "A") {
        e.preventDefault();
        navigateTo(e.target.pathname);
      }
    });
  }
}

function handleHeaderComponent(targetElement) {
  const component = new Header(targetElement);
  const renderComponent = new ErrorBoundary(targetElement, component.render.bind(component));
  const handleComponent = renderComponent.render.bind(renderComponent);
  return handleComponent;
}
export default handleHeaderComponent;
