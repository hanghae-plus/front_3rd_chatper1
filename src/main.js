import { createRouter } from "./router.js"
import MainPage from "./pages/MainPage.js"
import LoginPage from "./pages/LoginPage.js"
import ProfilePage from "./pages/ProfilePage.js"
import NotFoundPage from "./pages/NotFoundPage.js"

// 라우터 생성
const router = createRouter()
// 라우터에 라우트 추가
router.addRoute("/", MainPage)
router.addRoute("/login", LoginPage)
router.addRoute("/profile", ProfilePage)
router.addRoute("/404", NotFoundPage)
router.addRoute(
  "/error",
  () => "<div>오류 발생! <br> 의도적인 오류입니다.</div>"
)

// 초기 렌더링
router.render()

// 뒤로가기, 앞으로가기 시 렌더링
window.addEventListener("popstate", router.render)

// 전역 에러 처리
window.addEventListener("error", () => router.goTo("/error"))

const root = document.querySelector("#root")

// 유저 정보 가져오기
const userInfo = () => {
  const username = document.querySelector("#username")?.value || ""
  const email = document.querySelector("#email")?.value || ""
  const bio = document.querySelector("#bio")?.value || ""
  return { username, email, bio }
}

// 클릭 이벤트 위임
root.addEventListener("click", handleClick)

// 클릭 이벤트 핸들러
function handleClick(e) {
  const { tagName, id } = e.target
  // a 태그 클릭 시
  if (tagName === "A") {
    // 기본 동작 방지
    e.preventDefault()
    // 로그아웃 버튼 클릭 시
    if (id === "logout") {
      ///localStorage 유저정보 삭제
      localStorage.removeItem("user")
    }
    // 링크 클릭 시 goTo 함수 호출
    router.goTo(e.target.getAttribute("href"))
  }
}

// submit 이벤트 위임
root.addEventListener("submit", handleSubmit)

// submit 이벤트 핸들러
function handleSubmit(e) {
  e.preventDefault()

  const id = e.target.id
  const user = userInfo()

  if (id === "login-form") {
    if (!user.username) {
      alert("이메일 또는 전화번호 을(를) 입력해주세요.")
      return
    }
  } else {
    alert("프로필이 업데이트 되었습니다.")
  }

  localStorage.setItem("user", JSON.stringify(user))
  router.goTo("/profile")
}
