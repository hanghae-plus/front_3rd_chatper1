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
  "/404": () => <NotFoundPage />,
});

// 로그인 함수
function login(userInfo) {
  userStorage.set(userInfo);
  globalStore.setState({ currentUser: userInfo, loggedIn: true });
  router.push("/profile");
}

// 로그아웃 함수
function logout() {
  globalStore.setState({ currentUser: null, loggedIn: false });
  userStorage.reset("user");
  router.push("/login");
}

// 에러 처리 함수
function handleError(error) {
  globalStore.setState({ error });
}

// 프로필 업데이트 함수
function updateProfile(userInfo) {
  userStorage.set(userInfo);
  globalStore.setState({ currentUser: userInfo });
  router.push("/profile");
}

// 초기화 함수
function render() {
  const $root = document.querySelector("#root");

  try {
    const targetPage = router.getTarget() || router.push("/404");
    const $app = createElement(<App targetPage={targetPage} />);
    if ($root.hasChildNodes()) {
      $root.firstChild.replaceWith($app);
    } else {
      $root.appendChild($app);
    }

    const currentPath = window.location.pathname;
    handleMenuActive(currentPath); // 현재 경로로 메뉴 활성화 처리
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
  });

  // 로그인 처리
  addEvent("submit", "#login-form", (e) => {
    e.preventDefault();

    const userInfo = {
      username: "testuser",
      email: "",
      bio: "",
    };

    login(userInfo);
  });

  // 프로필 업데이트 처리
  addEvent("submit", "#profile-form", (e) => {
    e.preventDefault();

    const userInfo = {
      username: document.getElementById("username").value,
      email: document.getElementById("email").value,
      bio: document.getElementById("bio").value,
    };

    updateProfile(userInfo);
  });

  // 에러 처리
  addEvent("click", "#error-boundary", (e) => {
    e.preventDefault();
    globalStore.setState({ error: null });
  });

  // 네비게이션 링크 클릭 처리
  addEvent("click", "nav a", (e) => {
    e.preventDefault();
    const path = e.target.pathname;
    navigateToLink(path);
  });

  render();
}

// 현재 활성화된 메뉴 강조 처리
const handleMenuActive = (currentPath) => {
  const navLinks = document.querySelectorAll("nav a");

  navLinks.forEach((link) => {
    const isActive = link.getAttribute("href").replace(".", "") === currentPath;
    link.classList.toggle("text-blue-600", isActive);
    link.classList.toggle("font-bold", isActive);
    link.classList.toggle("text-gray-600", !isActive);
  });
};

// 링크 클릭 시 페이지 전환 및 메뉴 활성화
const navigateToLink = (path) => {
  router.push(path);
  handleMenuActive(path);
};

main();
