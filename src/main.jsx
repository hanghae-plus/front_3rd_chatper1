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
  "/": () => <HomePage />,
  "/login": () => {
    const { loggedIn } = globalStore.getState();

    if (loggedIn) {
      throw new ForbiddenError();
    }
    return <LoginPage />;
  },
  "/profile": () => {
    const { currentUser, loggedIn } = globalStore.getState();
    if (!loggedIn) {
      throw new UnauthorizedError();
    }
    return <ProfilePage currentUser={currentUser} loggedIn={loggedIn} />;
  },
});

function login({ username, email, bio }) {
  const { set } = createStorage("user");
  set({ username, email, bio });
  globalStore.setState({
    currentUser: { username, email, bio },
    loggedIn: true,
  });
  render();
}

function logout() {
  const { reset } = createStorage("user");
  reset();
  userStorage.reset();
  globalStore.setState({ currentUser: null, loggedIn: false });
  render();
}

function handleError(error) {
  globalStore.setState({ error });
}

function updateProfile({ username, email, bio }) {
  const { set } = createStorage("user");
  set({ username, email, bio });
  globalStore.setState({
    currentUser: { username, email, bio },
  });
  router.push("/profile");
  render();
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

  addEvent("click", "#logout", (e) => {
    e.preventDefault();
    logout();
    router.push("/");
  });

  addEvent("submit", "#login-form", (e) => {
    e.preventDefault();
    const username = document.querySelector("#username").value;
    try {
      login({
        username,
        email: "",
        bio: "",
      });
      router.push("/profile");
    } catch (error) {
      globalStore.setState({ error });
    }
  });

  addEvent("submit", "#profile-form", (e) => {
    e.preventDefault();
    const username = document.querySelector("#username").value;
    const email = document.querySelector("#email").value;
    const bio = document.querySelector("#bio").value;
    updateProfile({ username, email, bio });
  });

  addEvent("click", "#error-boundary", (e) => {
    e.preventDefault();
    globalStore.setState({ error: null });
  });

  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    const userData = JSON.parse(storedUser);
    globalStore.setState({
      currentUser: userData,
      loggedIn: true,
    });
  }
  render();
}

main();
