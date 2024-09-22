import createRouter from "./router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

// 1. 라우터 설정 및 초기화
const router = createRouter();
router.addRoute("/", Home); // 홈
router.addRoute("/login", Login); // 로그인
router.addRoute("/profile", Profile); // 프로필
router.addRoute("/404", NotFound); // Not Found
router.render(window.location.pathname); // 현재 경로에 맞는 페이지 렌더링

// 2. 라우터 이벤트 추가
// 2.1. popstate(앞으로가기/뒤로가기) 라우터 처리
window.addEventListener("popstate", () => {
  router.render(window.location.pathname);
});
//  2.2 a 태그가 동적으로 생성되므로, 이벤트 위임(bubbling) 방법 사용
document.querySelector("#root").addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    e.preventDefault();
    router.navigateTo(e.target.pathname);
  }
});
