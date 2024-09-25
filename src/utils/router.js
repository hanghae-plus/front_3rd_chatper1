import { isLoggedIn, logout, login, updateUser } from "./auth";

class Router {
  constructor(routes) {
    this.routes = routes;
    this.init();
  }

  init() {
    document.addEventListener("DOMContentLoaded", () => {
      document.body.addEventListener("click", (e) => {
        const target = e.target.closest("a");
        if (!(target instanceof HTMLAnchorElement)) return;
        e.preventDefault();
        this.navigate(target.getAttribute("href"));
      });
      this.navigate(window.location.pathname);
    });

    // URL이 변경될 때마다 navigate를 호출
    window.addEventListener("popstate", () => {
      this.navigate(window.location.pathname);
    });

    this.setEvent(); // 이벤트 핸들러를 초기화 시 한 번만 설정
  }

  render(view) {
    document.querySelector("#root").innerHTML = view();
    // this.setEvent(); // 뷰를 렌더링한 후 이벤트 핸들러를 설정
  }

  navigate(path) {
    const route =
      this.routes.find((route) => route.path === path) ||
      this.routes.find((route) => route.path === "*");
    if (route) {
      if (!isLoggedIn() && route.path === "/profile") {
        this.navigateTo("/login");
      } else if (isLoggedIn() && route.path === "/login") {
        this.navigateTo("/");
      } else {
        this.render(route.view);
      }
    }
  }

  navigateTo(path) {
    window.history.pushState(null, null, path);
    this.navigate(path);
  }

  setEvent() {
    const rootElement = document.querySelector("#root");

    // 클릭 이벤트 핸들러 등록
    rootElement.addEventListener("click", (event) => {
      const target = event.target;

      if (target.matches("#logout")) {
        event.preventDefault();
        logout();
      }
    });

    // 폼 제출 처리 이벤트 핸들러 등록
    rootElement.addEventListener("submit", (event) => {
      event.preventDefault();
      if (event.target.matches("#login-form")) {
        const loginForm = event.target;
        const username = loginForm.querySelector("#username").value; // 사용자 이름 가져오기
        login(username);
        this.navigateTo("/profile");
      }
      if (event.target.matches("#profile-form")) {
        const profileForm = event.target;
        const username = profileForm.querySelector("#username").value;
        const email = profileForm.querySelector("#email").value;
        const bio = profileForm.querySelector("#bio").value;

        updateUser({ username, email, bio });
      }
    });

    // 입력 이벤트 처리 : 에러 바운더리 구현
    rootElement.addEventListener("input", (event) => {
      if (event.target.matches("#username")) {
        try {
          throw new Error("의도적인 오류입니다.");
        } catch (error) {
          this.handleError(error);
        }
      }
    });
  }

  handleError(error) {
    // 에러 메시지를 DOM에 추가
    const errorMessage = `
      <div class="error">
        <p>오류 발생!</p>
        <p>${error.message}</p>
      </div>
    `;
    document.body.insertAdjacentHTML("beforeend", errorMessage);
  }
}

export default Router;
