import { Error } from "./pages/Error";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Profile } from "./pages/Profile";
import RouterManager from "./routes/router-manager";
import state from "./state/state-manager";
import ErrorHandler from "./handlers/error-handler";
import EventHandler from "./handlers/event-handler";

/**
 * @class HangHaeApp
 * 애플리케이션의 초기화 및 전역 상태, 이벤트, 에러 관리를 담당하는 클래스.
 */
class HangHaeApp {
  constructor() {
    this.router = new RouterManager();
    this.state = state;
    this.eventHandler = new EventHandler(this.router, this.state);
    this.errorHandler = new ErrorHandler();

    // 애플리케이션 초기화
    this.initialize();
  }

  /**
   * 애플리케이션 초기화 메서드.
   * 상태 로드, 라우터, 이벤트 및 에러 핸들러 설정을 담당.
   */
  initialize() {
    this.state.loadFromStorage();
    this.setupRouter();
    this.eventHandler.setupEventListeners();
    this.setupErrorHandling();
    this.renderInitialRoute();
  }

  /**
   * 라우터 설정 메서드
   * 각 경로에 대한 처리기 등록 및 미들웨어 설정.
   */
  setupRouter() {
    // 홈, 로그인, 프로필, 에러 페이지 등록
    this.router.registerPath('/', () => this.renderComponent(Home));
    this.router.registerPath('/login', () => {
      if (this.state.isLoggedIn()) {
        this.router.navigateTo('/');
      } else {
        this.renderComponent(Login);
      }
    });
    this.router.registerPath('/profile', () => {
      this.renderComponent(Profile);
    }, [
      (path) => {
        if (!this.state.isLoggedIn()) {
          this.router.navigateTo('/login');
          return false; // 경로 처리를 중단
        }
        return true; // 계속 처리
      }
    ]);

    this.router.defineFallback(() => this.renderComponent(Error));

    // 전역 미들웨어 설정: 모든 경로 접근 시 로그 남기기
    this.router.addGlobalMiddleware((path) => {
      console.log(`Navigated to: ${path}`);
    });

    // popstate 이벤트 처리
    window.addEventListener('popstate', () => {
      this.router.handleRouteChange(window.location.pathname);
    });
  }

  /**
   * 전역 에러 처리 설정 메서드
   */
  setupErrorHandling() {
    window.addEventListener('error', (error) => this.errorHandler.handleError(error));
  }

  /**
   * 컴포넌트를 렌더링하는 메서드
   * @param {Function} component - 렌더링할 컴포넌트 함수
   */
  renderComponent(component) {
    document.getElementById('root').innerHTML = component();
  }

  /**
   * 애플리케이션 시작 시 현재 경로를 렌더링.
   */
  renderInitialRoute() {
    this.router.handleRouteChange(window.location.pathname);
  }
}

// 애플리케이션 실행
new HangHaeApp();
