import Router from "./core/router";
import useLocalStorage from "./utils/useLocalStorage";
import MainView from "./page/mainView";
import LoginView from "./page/loginView";
import ProfileView from "./page/profileView";
import loginTemplate from "../templates/loginTemplate";
import profileTemplate from "../templates/profileTemplate";
import errorTemplate from "../templates/errorTemplate";
import mainTemplate from "../templates/mainTemplate";
import headerTemplate from "../templates/headerTemplate";
import ErrorBoundary from "./page/errorBoundary";
import ErrorView from "./page/errorView";

const initialValue = {
  username: "",
  email: "",
  bio: "",
};

const { getStoredValue, setValue, removeValue } = useLocalStorage(
  "user",
  initialValue
);

const router = new Router();
const errorBoundary = new ErrorBoundary("root");

function createProfileView() {
  const value = getStoredValue();
  const isUserLoggedIn = value.username !== "";
  return new ProfileView("root", profileTemplate(isUserLoggedIn, value));
}

function updateHeader() {
  const value = getStoredValue();
  const isUserLoggedIn = value && value.username !== "";

  const headerElement = document.getElementById("header");
  if (headerElement) {
    headerElement.innerHTML = headerTemplate(isUserLoggedIn);
  }
}

function setupRoutes() {
  const value = getStoredValue();
  const isUserLoggedIn = value.username !== "";
  const mainView = new MainView("root", mainTemplate(isUserLoggedIn));
  const loginView = new LoginView("root", loginTemplate);
  const errorView = new ErrorView("root", errorTemplate);

  router.setDefaultPage("/", mainView);
  router.addRoutePath("/main", mainView);
  router.addRoutePath("/profile", createProfileView);
  router.addRoutePath("/login", loginView);
  router.setErrorPage(errorView);

  router.addAuthGuard("/profile", () => {
    if (isUserLoggedIn) {
      return true;
    } else {
      router.navigate("/login");
      return false;
    }
  });

  router.addAuthGuard("/login", () => {
    const value = getStoredValue();
    const isUserLoggedIn = value && value.username !== "";

    if (isUserLoggedIn) {
      router.navigate("/");
      updateHeader();
      return false;
    }
    return true;
  });
}

async function initializeApp() {
  setupRoutes();
  updateHeader();
  try {
    await router.route();
  } catch (error) {
    errorBoundary.render(error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initializeApp();
});

document.addEventListener("click", async (e) => {
  const target = e.target.closest("a");

  if (target) {
    e.preventDefault();
    try {
      await router.navigate(target.pathname);
      updateHeader();
    } catch (error) {
      console.error(error);
    }
  }
});

document.addEventListener("click", async (e) => {
  const loginElement = e.target.closest("#login");
  const logoutElement = e.target.closest("#logout");

  if (loginElement) {
    e.preventDefault();
    try {
      await router.navigate("/login");
    } catch (error) {
      errorBoundary.render(error);
    }
  } else if (logoutElement) {
    e.preventDefault();
    removeValue();
    try {
      setupRoutes();
      await router.navigate("/");
    } catch (error) {
      errorBoundary.render(error);
    }
  }
});

document.addEventListener("submit", async (e) => {
  try {
    if (e.target.id === "login-form") {
      e.preventDefault();

      const usernameInput = document.getElementById("username");
      const passwordInput = document.getElementById("password");
      if (usernameInput && passwordInput) {
        try {
          const username = usernameInput.value;
          setValue({ username, email: "", bio: "" });
          setupRoutes();
          await router.navigate("/");
        } catch (error) {
          errorBoundary.render(error);
        }
      } else {
        errorBoundary.render(new Error("오류 발생!"));
      }
    } else if (e.target.id === "profile-form") {
      const username = document.getElementById("username");
      const email = document.getElementById("email");
      const bio = document.getElementById("bio");

      if (username && email && bio) {
        e.preventDefault();
        setValue({
          username: username.value,
          email: email.value,
          bio: bio.value,
        });
        try {
          setupRoutes();
          await router.navigate("/profile");
        } catch (error) {
          errorBoundary.render(error);
        }
      }
    }
  } catch (error) {
    errorBoundary.render(error);
  }
});

window.addEventListener("error", (error) => {});

setupRoutes();
router.route();
