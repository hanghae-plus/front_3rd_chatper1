/** @jsx createVNode */
import { createElement, createRouter, createVNode, renderElement } from "./lib";
import { HomePage, LoginPage, NotFoundPage, ProfilePage } from "./pages";
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
  "/*": () => <NotFoundPage />,
});

function logout() {
  globalStore.setState({ currentUser: null, loggedIn: false });
  router.push("/login");
  userStorage.reset();
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
    if (error instanceof ForbiddenError) {
      router.push("/");
      return;
    }
    if (error instanceof UnauthorizedError) {
      router.push("/login");
      return;
    }

    console.error(error);

    globalStore.setState({ error });
  }
  registerGlobalEvents();
}

function main() {
  router.subscribe(render);
  globalStore.subscribe(render);
  window.addEventListener("error", handleError);
  window.addEventListener("unhandledrejection", handleError);

  addEvent("submit", "[data-submit]", (e) => {
    e.preventDefault();

    const submitType = e.target.getAttribute("data-submit");

    switch (submitType) {
      case "login-submit":
        const $loginUsername = document.getElementById("username");

        userStorage.set({
          username: $loginUsername.value,
          email: "",
          bio: "",
        });

        globalStore.setState({
          currentUser: userStorage.get(),
          loggedIn: true,
        });

        router.push("/profile");
        break;
      case "post-submit":
        const prevPosts = globalStore.getState()["posts"];
        const newId = prevPosts[prevPosts.length - 1].id + 1;
        const username = globalStore.getState()["currentUser"].username;
        const newTime = Math.round(Math.random() * 5);
        const content = document.getElementById("post-content");

        globalStore.setState({
          ...globalStore.getState(),
          posts: [
            {
              id: newId,
              author: username,
              time: `${newTime}분전`,
              content: content.value,
            },
            ...prevPosts,
          ],
        });
        break;
      case "profile-submit":
        const $profileUsername = document.getElementById("username");
        const $profileEmail = document.getElementById("email");
        const $profileBio = document.getElementById("bio");

        userStorage.set({
          username: $profileUsername.value,
          email: $profileEmail.value,
          bio: $profileBio.value,
        });

        globalStore.setState({
          currentUser: userStorage.get(),
        });

        alert("프로필 업데이트 완료!");

        break;
      default:
        break;
    }
  });

  addEvent("click", "[data-link]", (e) => {
    e.preventDefault();
    router.push(e.target.href.replace(window.location.origin, ""));
  });

  addEvent("click", "#logout", (e) => {
    e.preventDefault();
    logout();
  });

  addEvent("click", "#error-boundary", (e) => {
    e.preventDefault();
    globalStore.setState({ error: null });
  });

  render();
}

main();
