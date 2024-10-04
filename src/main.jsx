/** @jsx createVNode */
import { createRouter, createVNode, renderElement } from "./lib";
import { HomePage, LoginPage, NotFoundPage, ProfilePage } from "./pages";
import { globalStore } from "./stores";
import { ForbiddenError, UnauthorizedError } from "./errors";
import { userStorage } from "./storages";
import { App } from "./App";
import { addEvent } from "./lib/eventManager";

export const router = createRouter({
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
  "/404": () => <NotFoundPage />,
});

function handleError(error) {
  globalStore.setState({ error });
}

function logout() {
  userStorage.reset("user");
  globalStore.setState({ currentUser: null, loggedIn: false });
  router.push("/login");
}

// 초기화 함수
function render() {
  const $root = document.getElementById("root");

  try {
    renderElement(<App targetPage={router.getTarget()} />, $root);
  } catch (error) {
    if (error instanceof ForbiddenError) {
      router.push("/");
      return;
    }
    if (error instanceof UnauthorizedError) {
      router.push("/login");
      return;
    }
    globalStore.setState({ error });
  }

  addEvent("click", "#logout", logout);
  addEvent("click", "#error-boundary", () => {
    globalStore.setState({ error: null });
  });
}

function main() {
  const currentUser = userStorage.get("user");
  if (currentUser) {
    globalStore.setState({ currentUser, loggedIn: true });
  } else {
    globalStore.setState({
      currentUser: { username: "", email: "", bio: "" },
      loggedIn: false,
    });
  }

  addEvent("submit", "#profile-form", (e) => {
    const currentUser = {
      username: e.target.querySelector("#username").value,
      email: e.target.querySelector("#email").value,
      bio: e.target.querySelector("#bio").value,
    };

    userStorage.set("user", currentUser);
    globalStore.setState({ currentUser, loggedIn: true });
    alert("완성");
  });

  router.subscribe(render);
  globalStore.subscribe(render);
  window.addEventListener("error", handleError);
  window.addEventListener("unhandledrejection", handleError);

  render();
}

main();
