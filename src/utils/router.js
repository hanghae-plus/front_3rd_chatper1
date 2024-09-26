import { isLoggedIn, updateUser, authLogout, authLogin } from "./auth";

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
    this.setEvent(); // 뷰를 렌더링한 후 이벤트 핸들러를 설정
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

    if (!rootElement) return;

    // 클릭 이벤트 핸들러 등록
    rootElement.addEventListener("click", (e) => {
      const target = e.target;
      e.preventDefault();
      if (target.matches("#logout")) {
        authLogout();
      }
    });

    // 폼 제출 처리 이벤트 핸들러 등록
    rootElement.addEventListener("submit", (e) => {
      e.preventDefault();
      if (e.target.matches("#login-form")) {
        const loginForm = e.target;
        const username = loginForm.querySelector("#username").value; // 사용자 이름 가져오기
        authLogin(username);
        this.navigateTo("/profile");
      }
      if (e.target.matches("#profile-form")) {
        const profileForm = e.target;
        const username = profileForm.querySelector("#username").value;
        const email = profileForm.querySelector("#email").value;
        const bio = profileForm.querySelector("#bio").value;

        updateUser({ username, email, bio });
      }
    });

    this.handleErrorMsg();
  }

  handleErrorMsg() {
    // 입력 이벤트 처리 : 에러 바운더리 구현
    const username = document.getElementById("username");

    if (!username) return; // username 요소가 없으면 함수 종료

    username.addEventListener("input", () => {
      try {
        throw new Error("의도적인 오류입니다.");
      } catch (error) {
        this.handleError(error);
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

// 전역 에러 핸들러 추가
window.addEventListener("error", (error) => {
  this.handleError(error);
});

export default Router;
