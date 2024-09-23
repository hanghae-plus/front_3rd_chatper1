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
const root = document.getElementById("root");
root.addEventListener("click", (e) => {
  // 로그아웃 시 사용자 정보 제거
  if (e.target.id === "logout") {
    localStorage.removeItem("user");
  }
  if (e.target.tagName === "A") {
    e.preventDefault();
    router.navigateTo(e.target.pathname);
  }
});

// 3. 로그인/프로필 수정 시 사용자 정보 저장
const setUserInfo = () => {
  const loginForm = {
    username: document.getElementById("username")?.value || "", // 이메일 또는 전화번호(사용자 이름)
    email: document.getElementById("email")?.value || "", // 이메일
    bio: document.getElementById("bio")?.value || "", // 자기소개
  };

  localStorage.setItem("user", JSON.stringify(loginForm));
};
root.addEventListener("submit", (e) => {
  if (e.target?.id === "login-form") {
    e.preventDefault();
    setUserInfo();
    router.navigateTo("/profile");
  } else if (e.target?.id === "profile-form") {
    e.preventDefault();
    setUserInfo();
    alert("프로필 수정이 완료되었습니다 :)");
  }
});
