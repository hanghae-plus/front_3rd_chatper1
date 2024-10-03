/** @jsx createVNode */
import { createRouter, createVNode, renderElement } from "./lib";
import { HomePage, LoginPage, NotFoundPage, ProfilePage } from "./pages";
import { globalStore } from "./stores";
import { ForbiddenError, UnauthorizedError, NotFoundError } from "./errors";
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
});

function logout() {
  globalStore.setState({ currentUser: null, loggedIn: false });
  router.push("/login");
  userStorage.reset();
}

function handleError(error) {
  globalStore.setState({ error });
  console.log("error", error);
}

// 초기화 함수
function render() {
  const $root = document.querySelector("#root");
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

    console.error(error);
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

  // 로그인 처리 함수
  const login = (username) => {
    const user = { username, email: "", bio: "" };
    globalStore.setState({
      currentUser: user,
      loggedIn: true,
    });
    userStorage.set(user);
  };

  // 프로필 업데이트 함수
  const updateProfile = (profile) => {
    const user = { ...globalStore.getState().currentUser, ...profile };
    globalStore.setState({ currentUser: user });
    userStorage.set(user);
    alert("프로필이 업데이트되었습니다.");
  };

  // 통합된 이벤트 핸들러
  const handleSubmit = (e) => {
    e.preventDefault(); // 기본 동작 방지
    const form = e.target;
    const formData = new FormData(form);

    // data-submit 속성에 따라 분기 처리
    if (form.getAttribute("data-submit") === "login-form") {
      const username = formData.get("username");
      if (username) {
        login(username);
        router.push("/profile"); // 로그인 후 프로필 페이지로 이동
      }
    } else if (form.getAttribute("data-submit") === "profile-form") {
      const updatedProfile = Object.fromEntries(formData);
      updateProfile(updatedProfile);
    }
  };

  // 이벤트 리스너 등록
  addEvent("submit", "[data-submit]", handleSubmit);

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
