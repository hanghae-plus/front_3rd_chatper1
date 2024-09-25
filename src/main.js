import Router from "./router/router";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import ProfilePage from "./pages/Profile";
import NotFoundPage from "./pages/NotFound";
import Store from "./store/store";

// 1. 전역 상태 관리 (사용자 정보)
const userInfo = {
  username: "",
  email: "",
  bio: "",
};
export const { setState, getState, subscribe } = Store(userInfo);

// 2. 라우터 설정 및 초기화
const router = Router();
router.addRoute("/", HomePage); // 홈
router.addRoute("/login", LoginPage); // 로그인
router.addRoute("/profile", ProfilePage); // 프로필
router.addRoute("/404", NotFoundPage); // Not Found
router.init(); // 초기 화면 렌더링 및 이벤트 핸들러 실행

export const navigateTo = router.navigateTo;
