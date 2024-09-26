/**
 * @class RouterManager
 * 경로 관리 클래스. 경로 추가, 탐색 및 처리 담당.
 * @property {Object} routes - 경로와 해당 경로의 핸들러를 저장하는 객체
 * @example this.routes = { "/home": homeHandler, "/login": loginHandler };
 * @property {Function} fallbackHandler - 정의되지 않은 경로를 처리하는 기본 핸들러
 * @example this.fallbackHandler = () => console.warn("No route found.");
 * @property {Function[]} middlewares - 모든 경로 처리 전에 실행될 미들웨어 함수들의 배열
 * @example this.middlewares = [(path) => console.log(`Navigating to: ${path}`)];
*/
export default class RouterManager {
  constructor() {
    this.routes = {};
    this.fallbackHandler = () => console.warn("No route found.");
    this.globalMiddlewares = [];  // 전역 미들웨어 배열
  }

  /**
   * 전역 미들웨어 추가 메서드
   * @param {Function} middleware - 모든 경로 처리 전에 실행할 미들웨어 함수
   */
  addGlobalMiddleware(middleware) {
    this.globalMiddlewares.push(middleware);
  }

  /**
   * 경로와 해당 경로에 대한 처리기 및 미들웨어를 등록합니다.
   * @param {string} path - 경로 문자열
   * @param {Function} handler - 경로가 호출될 때 실행될 함수
   * @param {Function[]} [middlewares=[]] - 경로 처리 전에 실행할 미들웨어 함수들의 배열
   */
  registerPath(path, handler, middlewares = []) {
    this.routes[path] = { handler, middlewares };
  }

  /**
   * 정의되지 않은 경로에 대한 기본 핸들러 설정
   * @param {Function} handler - 기본 핸들러 함수
   */
  defineFallback(handler) {
    this.fallbackHandler = handler;
  }

  /**
   * 주어진 경로로 이동합니다.
   * @param {string} path - 이동할 경로
   */
  navigateTo(path) {
    window.history.pushState(null, null, path);
    this.handleRouteChange(path);
  }

  /**
   * 미들웨어 실행 메서드 (전역 및 경로별 미들웨어를 순차적으로 실행)
   * @param {string} path - 현재 경로
   * @param {Function[]} middlewares - 실행할 미들웨어 배열
   * @returns {boolean} - 모든 미들웨어가 true를 반환했는지 여부
   */
  runMiddlewares(path, middlewares) {
    for (const middleware of middlewares) {
      const shouldContinue = middleware(path);
      if (shouldContinue === false) {
        return false; // 경로 처리를 중단
      }
    }
    return true;
  }

  /**
   * 현재 경로를 처리하여 해당 핸들러를 호출합니다.
   * 전역 미들웨어 -> 경로별 미들웨어 -> 핸들러 순으로 실행합니다.
   * @param {string} path - 현재 경로
   */
  handleRouteChange(path) {
    const route = this.routes[path] || { handler: this.fallbackHandler, middlewares: [] };

    const allMiddlewares = [...this.globalMiddlewares, ...route.middlewares];
    const shouldContinue = this.runMiddlewares(path, allMiddlewares);

    if (!shouldContinue) {
      return; // 경로 처리를 중단
    }

    // 경로에 등록된 핸들러 실행
    route.handler(path);
  }
}
