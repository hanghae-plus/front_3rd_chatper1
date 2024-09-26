import mainPage from "./pages/mainPage";
import loginPage from "./pages/loginPage";
import errorPage from "./pages/errorPage";
import profilePage from "./pages/profilePage";
// 모듈 선택해서 가져오기
import { createRouter } from "./router";
import { userStatus } from "./login";

const root = document.querySelector("#root");

// 유저정보 삭제용
localStorage.removeItem('user');



// 유저 
const loginState = userStatus()

// Router 
const router = createRouter(loginState)


// 유저 정보 받아오기
const userInfo = () => {
  const username = document.querySelector("#username")?.value || ""
  const email = document.querySelector("#email")?.value || ""
  const bio = document.querySelector("#bio")?.value || ""
  return { username, email, bio }
}

let isError = true

// 컴포넌트를 함수실행이 아닌 함수 자체를 가져와서 오류가 나는데 원인 파악에 시간 너무 소요됨..
router.addRoute('/', mainPage(loginState))
router.addRoute('/login', loginPage())
router.addRoute('/profile', profilePage(loginState))
router.addRoute('/404', errorPage())



// 첫화면 렌더링
window.addEventListener("load", router.render)

// 뒤로가기, 앞으로가기 시 렌더링
window.addEventListener("popstate", router.render)

// 전역 에러 처리
window.addEventListener("error", () => {

  router.navigateTo("/404")
  
})






// 클릭 이벤트 위임
root.addEventListener("click", handleClick)

// 클릭 이벤트 
function handleClick(event) {
  const tagName = event.target.tagName

  // a 태그 클릭 시
  if (tagName === "A") {
    // 기본 동작 방지
    event.preventDefault()

    const id = event.target.id
    // 로그아웃 버튼 클릭 시
    if (id === "logout") {
      // 로그아웃 함수 호출
      loginState.logout()
    }

    const href = event.target.getAttribute("href")
    // 링크 클릭 시 이동 함수 호출
    router.navigateTo(href)
  }
}

//테스트용 
// function error () {
//   throw new Error('의도적인 오류입니다.')
// }

// submit 이벤트 위임
root.addEventListener("submit", handleSubmit)

// submit 이벤트 
function handleSubmit(event) {
  // submit 이벤트 막기
  event.preventDefault()

  const id = event.target.id
  const user = userInfo() // userInfo() - 폼에서 받아온 유저정보 객체

  // submit 로그인 폼일 때, test에 id 값을 지정해두셨음. 테스트코드 꼭 미리 볼 것..
  if (id === "login-form") {

    // 유저아이디가 빈값이면 알림창
    if (user.username === "") {
      alert("아이디를 입력하세요")
      return
    }
    // 아이디 입력 값을 전달
    loginState.login(user)

    
    window.addEventListener("error", () => {
      const errorMasage = `<div>오류 발생!</div><div>의도적인 오류입니다.</div>`
      root.innerHTML = errorMasage
        // router.addRoute('/login', loginPage(isError))
        // alert("오류 발생! >의도적인 오류입니다.")
    } )
    


  } else {
    loginState.update(user)
    alert("프로필이 업데이트 되었습니다.")
  }
  // 로그인 함수 호출
  router.navigateTo("/profile")
}

