import User from "./js/user.js";
import { FormValidationError, validateForm } from "./js/validation.js";
import ErrorPage from "./pages/ErrorPage.js";
import router from "./router.js";

function showErrorBoundary(error) {
  const root = document.getElementById("root");
  root.innerHTML = `
    <div class="error-container">
      <h1>오류 발생!</h1>
      <p>${error.message || "알 수 없는 오류입니다."}</p>
    </div>
  `;
}

window.addEventListener("error", (event) => {
  event.preventDefault();
  showErrorBoundary(event.error);
});

window.addEventListener("unhandledrejection", (event) => {
  event.preventDefault();
  showErrorBoundary(event.reason);
});

export function bindLoginEvent() {
  const loginForm = document.getElementById("login-form");

  if (loginForm) {
    loginForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const formData = new FormData(loginForm);

      try {
        validateForm(formData);

        const username = formData.get("username").trim();
        const user = new User(username);
        user.login(username);

        router.navigateTo("/profile");
      } catch (errors) {
        errors.forEach((error) => {
          if (error instanceof FormValidationError) {
            document.getElementById(`${error.field}-error`).textContent =
              error.message;
          } else {
            throw error;
          }
        });
      }
    });
  }
}

export function bindLogoutEvent() {
  const logoutButton = document.getElementById("logout");
  if (logoutButton) {
    logoutButton.addEventListener("click", (event) => {
      event.preventDefault();

      const user = User.getUser();
      if (user) {
        user.logout();
        router.navigateTo("/login");
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  const path = await router.handleRoute(window.location.pathname);

  document.addEventListener("click", (event) => {
    if (event.target.matches("a")) {
      event.preventDefault();

      const path = event.target.getAttribute("href");
      if (path && path !== "javascript:void(0)") {
        router.navigateTo(path);
      }
    }
  });

  handleError();
});
