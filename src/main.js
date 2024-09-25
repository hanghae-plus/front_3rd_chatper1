import { createRouter } from "./router";
import loginStatus from "./login";

import mainPage from "./pages/mainPage";
import errorPage from "./pages/errorPage";
import profilePage from "./pages/profilePage";
import loginPage from "./pages/loginPage";




//초기화
localStorage.removeItem("user")

const root = document.querySelector("#root");

// 로그인 객체 생성
const logininfo = loginStatus()


// 1. 라우팅 구현
// Router 객체 생성
const router = createRouter()

// 컴포넌트를 불러오는데 자꾸 함수 실행으로 가져와서 한참 씨름함.
// console.log("here:" + mainPage);
router.addRoute('/', mainPage(logininfo))
router.addRoute('/profile', profilePage(logininfo))
router.addRoute('/login', loginPage())
router.addRoute('/404', errorPage())

// 초기 렌더링
router.render()

// 뒤로가기, 앞으로가기 시 렌더링
window.addEventListener("popstate", router.render)


// 2. 로그인
// 로그인 상태 loginStatus 만들기 
// 로그인 상태를 main.js에서 설정해주고. 
// 헤더.js 에서 isLogin 을 인자로 받아서 참 거짓에 따라 삼항연산자로 메뉴 변겨애주기
// 유저 정보 저장

// 클릭 이벤트 위임
root.addEventListener("click", handleClick)

// submit 이벤트 위임
root.addEventListener("submit", handleSubmit)

// 전역 에러 처리
window.addEventListener("error", () => router.navigateTo("/404"))


const userInfo = () => {
  const username = document.querySelector("#username")?.value || ""
  const email = document.querySelector("#email")?.value || ""
  const bio = document.querySelector("#bio")?.value || ""
  const islog = true || ""
  return { username, email, bio, islog }
}


// 클릭 이벤트 핸들러
function handleClick(e) {
  const { tagName, id } = e.target

  // a 태그 클릭 시
  if (tagName === "A") {
    // 기본 동작 방지
    e.preventDefault()

    // 로그아웃 버튼 클릭 시
    if (id === "logout") {
      // 로그아웃 함수 호출
      logininfo.logout()
    }

    // 링크 클릭 시 이동 함수 호출
    router.navigateTo(e.target.getAttribute("href"))
  }
}

// submit 이벤트 핸들러
function handleSubmit(e) {
  e.preventDefault()

  const id = e.target.id
  const user = userInfo()

  if (id === "loginform") {
    // 유효성 검사
    if (!user.username) {
      alert("아이디를 입력하세요")
      return
    }
    logininfo.login(user)
    

  } else {
    logininfo.setUserInfo(user)
    alert("프로필이 업데이트 되었습니다.")
  }
  // 로그인 함수 호출
  router.navigateTo("/profile")
}