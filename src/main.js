import Router from "./router";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import ProfilePage from "./pages/Profile";
import NotFoundPage from "./pages/NotFound";

// 라우터 설정 및 초기화
const router = Router();
router.addRoute("/", HomePage); // 홈
router.addRoute("/login", LoginPage); // 로그인
router.addRoute("/profile", ProfilePage); // 프로필
router.addRoute("/404", NotFoundPage); // Not Found
router.init(); // 초기 화면 렌더링 및 이벤트 핸들러 실행
