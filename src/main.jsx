/** @jsx createVNode */
import {
  createElement,
  createRouter,
  createStorage,
  createVNode,
  renderElement,
} from "./lib";
import { HomePage, LoginPage, ProfilePage } from "./pages";
import { globalStore } from "./stores";
import { ForbiddenError, UnauthorizedError } from "./errors";
import { userStorage } from "./storages";
import { addEvent, registerGlobalEvents } from "./utils";
import { App } from "./App";

const router = createRouter({
  "/": renderHomePage,
  "/login": renderLoginPage,
  "/profile": renderProfilePage,
});

function renderHomePage() {
  return <HomePage />;
}

function renderLoginPage() {
  const { loggedIn } = globalStore.getState();
  if (loggedIn) {
    throw new ForbiddenError();
  }
  return <LoginPage />;
}

function renderProfilePage() {
  const { loggedIn } = globalStore.getState();
  if (!loggedIn) {
    throw new UnauthorizedError();
  }
  return <ProfilePage />;
}

function updateUserInfo(userInfo) {
  const { set } = createStorage("user");
  set(userInfo);
  globalStore.setState({ currentUser: userInfo });
}

function login({ username }) {
  updateUserInfo({ username, email: "", bio: "" });
  globalStore.setState({ loggedIn: true });
}

function logout() {
  createStorage("user").reset();
  userStorage.reset();
  globalStore.setState({ currentUser: null, loggedIn: false });
}

function handleError(error) {
  globalStore.setState({ error });
}

// 초기화 함수
function render() {
  const $root = document.querySelector("#root");

  try {
    const $app = createElement(<App targetPage={router.getTarget()} />);
    if ($root.hasChildNodes()) {
      $root.firstChild.replaceWith($app);
    } else {
      $root.appendChild($app);
    }
  } catch (error) {
    routeOnError(error);
    console.error(error);
  }

  registerGlobalEvents();
}

function routeOnError(error) {
  if (error instanceof ForbiddenError) {
    router.push("/");
  } else if (error instanceof UnauthorizedError) {
    router.push("/login");
  }
}

function initEventListeners() {
  addEvent("click", "[data-link]", handleLinkClick);
  addEvent("submit", "#login-form", handleLoginFormSubmit);
  addEvent("submit", "#profile-form", handleProfileFormSubmit);
  addEvent("click", "#logout", handleLogoutClick);
  addEvent("click", "#error-boundary", handleErrorBoundaryClick);
}

function handleLinkClick(e) {
  e.preventDefault();
  navigateTo(e.target.href);
}

function navigateTo(url) {
  const path = url.replace(window.location.origin, "");
  router.push(path);
}

function handleLoginFormSubmit(e) {
  e.preventDefault();
  const username = document.querySelector("#username").value;
  login({ username });
  router.push("/");
  globalStore.setState({ error: null });
}

function handleProfileFormSubmit(e) {
  e.preventDefault();
  const userInfo = {
    username: document.querySelector("#username").value,
    email: document.querySelector("#email").value,
    bio: document.querySelector("#bio").value,
  };
  updateUserInfo(userInfo);
}

function handleLogoutClick(e) {
  e.preventDefault();
  logout();
  router.push("/");
}

function handleErrorBoundaryClick(e) {
  e.preventDefault();
  globalStore.setState({ error: null });
}

function initializeApp() {
  router.subscribe(render);
  globalStore.subscribe(render);
  window.addEventListener("error", handleError);
  window.addEventListener("unhandledrejection", handleError);

  initEventListeners();
  render();
}

function main() {
  try {
    initializeApp();
  } catch (error) {
    handleError(error);
  }
}

main();
