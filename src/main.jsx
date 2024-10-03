/** @jsx createVNode */
import { createElement, createRouter, createVNode, renderElement } from "./lib";
import { HomePage, LoginPage, NotFoundPage, ProfilePage } from "./pages";
import { globalStore } from "./stores";
import { ForbiddenError, UnauthorizedError } from "./errors";
import { userStorage } from "./storages";
import { addEvent, registerGlobalEvents } from "./utils";
import { App } from "./App";

/**
 * @constant {Object} router - 라우터 객체를 생성하고 경로에 따라 렌더링할 페이지를 반환
 * @desc 각 경로에 대응하는 컴포넌트를 설정, 인증 및 권한 검사를 수행하는 함수형 컴포넌트 포함
 */

const router = createRouter({
  "/": () => {
    return <HomePage />;
  },
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

/**
 * @function logout
 * @desc 현재 사용자의 세션을 종료하고 로그인 페이지로 이동
 * globalStore의 상태 초기화, 사용자 정보를 리셋
 */

function logout() {
  globalStore.setState({ currentUser: null, loggedIn: false });
  router.push("/login");
  userStorage.reset();
}

/**
 * @function handleError
 * @desc 애플리케이션에서 발생하는 오류 처리, 상태를 업데이트
 * 오류를 globalStore에 설정하여 화면에 표시
 *
 * @param {Error} error - 발생한 오류 객체
 */

function handleError(error) {
  globalStore.setState({ error });
}

/**
 * @function render
 * @desc 애플리케이션을 렌더링하는 함수,
 * 현재의 라우팅 상태에 따라 적절한 페이지를 렌더링
 *
 */

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
    // globalStore.setState({ error });
  }
  registerGlobalEvents();
}

/**
 * @function main
 * @desc 애플리케이션의 초기화를 담당하는 함수
 * 함수 이벤트 리스너와 글로벌 상태 변경 구독을 설정하고 렌더링을 시작
 * `router`와 `globalStore`의 상태 변경을 구독하여 상태가 변경될 때마다 `render`를 호출
 * 전역 오류 처리 이벤트 리스너를 설정
 */

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

  addEvent("click", "#error-boundary", (e) => {
    e.preventDefault();
    globalStore.setState({ error: null });
  });

  render();
}

main();
