import Router from "./router";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import ProfilePage from "./pages/Profile";
import NotFoundPage from "./pages/NotFound";
import { logout, setUserInfo } from "./auth";

// 1. 라우터 설정 및 초기화
const router = Router();
router.addRoute("/", HomePage); // 홈
router.addRoute("/login", LoginPage); // 로그인
router.addRoute("/profile", ProfilePage); // 프로필
router.addRoute("/404", NotFoundPage); // Not Found
router.init(); // 초기 화면 렌더링 및 이벤트 핸들러 실행

// 2. 전역 이벤트 리스너 등록 (동적 생성 요소에 이벤트 위임(bubbling) 방법 사용)
const root = document.getElementById("root");
root.addEventListener("click", (e) => {
  const nav = document.querySelector("nav");
  if (nav) {
    if (e.target.id === "logout") {
      // 로그아웃 시 사용자 정보 제거
      logout();
    }
    if (e.target.tagName === "A") {
      // 클릭 시 페이지 이동
      e.preventDefault();
      router.navigateTo(e.target.pathname);
    }
  }
});

// 로그인/프로필 수정 시 사용자 정보 저장
root.addEventListener("submit", (e) => {
  e.preventDefault();
  setUserInfo({
    username: document.getElementById("username")?.value || "", // 이메일 또는 전화번호(사용자 이름)
    email: document.getElementById("email")?.value || "", // 이메일
    bio: document.getElementById("bio")?.value || "", // 자기소개
  });

  if (e.target.id === "login-form") {
    router.navigateTo("/profile");
  } else if (e.target.id === "profile-form") {
    alert("프로필 수정이 완료되었습니다 :)");
  }
});
