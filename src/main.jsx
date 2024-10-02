/** @jsx createVNode */
import { createElement, createRouter, createVNode, renderElement } from "./lib";
import { HomePage, LoginPage, ProfilePage, NotFoundPage } from "./pages";
import { globalStore } from "./stores";
import { ForbiddenError, UnauthorizedError } from "./errors";
import { userStorage } from "./storages";
import { addEvent, registerGlobalEvents } from "./utils";
import { App } from "./App";

const router = createRouter({
  "/": () => <HomePage />,
  "/login": () => {
    const { loggedIn } = globalStore.getState();
    if (loggedIn) {
      throw new ForbiddenError();
    }
    return <LoginPage />;
  },
  "/profile": () => {
    const { loggedIn } = globalStore.getState();
    if (!loggedIn) {
      throw new UnauthorizedError();
    }
    return <ProfilePage />;
  },
  "*": () => <NotFoundPage />,
});

function logout() {
  globalStore.setState({ currentUser: null, loggedIn: false });
  router.push("/login");
  userStorage.reset();
}

function login() {
  const username = document.getElementById("username").value;

  const user = { username, email: "", bio: "" };

  globalStore.setState({ currentUser: user, loggedIn: true });
  userStorage.set(user);
}

function updateProfile() {
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const bio = document.getElementById("bio").value;

  const { currentUser } = globalStore.getState();
  const newProfile = { username, email, bio };

  globalStore.setState({
    currentUser: { ...currentUser, ...newProfile },
  });
  userStorage.set({ ...currentUser, ...newProfile });
}

function handleError(error) {
  globalStore.setState({ error: error.message });
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
    if (error instanceof ForbiddenError) {
      router.push("/");
      return;
    }
    if (error instanceof UnauthorizedError) {
      router.push("/login");
      return;
    }
    if (!router.getTarget()) {
      return <NotFoundPage />;
    }

    console.error(error);

    // globalStore.setState({ error });
  }
  registerGlobalEvents();
}

function main() {
  router.subscribe(render);
  globalStore.subscribe(render);
  window.addEventListener("error", handleError);
  window.addEventListener("unhandledrejection", handleError);

  addEvent("click", "[data-link]", (e) => {
    e.preventDefault();
    router.push(e.target.href.replace(window.location.origin, ""));
  });

  addEvent("submit", "#login-form", (e) => {
    e.preventDefault();
    login();
  });

  addEvent("click", "#logout", (e) => {
    e.preventDefault();
    logout();
  });

  addEvent("submit", "#profile-form", (e) => {
    e.preventDefault();
    updateProfile();
  });

  addEvent("click", "#error-boundary", (e) => {
    e.preventDefault();
    globalStore.setState({ error: null });
  });

  render();
}

main();
