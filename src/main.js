import { ErrorBoundary } from "./base";
import { Router } from "./routerSetup";

Router.initRouter();

// Router.navigateTo(window.location.pathname || "/");

// 전역 에러 핸들러
window.addEventListener("error", (e) => {
  const errorComponent = new ErrorBoundary(null, () => history.back());
  errorComponent.setState(ErrorBoundary.getDerivedStateFromError(e.message));
});

// Promise의 전역 에러 핸들러
window.addEventListener("unhandledrejection", (e) => {
  const errorComponent = new ErrorBoundary(null, () => history.back());
  errorComponent.setState(ErrorBoundary.getDerivedStateFromError(e.message));
});
