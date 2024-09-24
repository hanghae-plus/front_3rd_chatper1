import { createRouter } from "./router";
import mainPage from "./pages/mainPage";
import errorPage from "./pages/errorPage";
import profilePage from "./pages/profilePage";
import loginPage from "./pages/loginPage";


// 로그인 상태 loginStatus 만들기 
// 로그인 상태를 main.js에서 설정해주고. 
// 헤더.js 에서 isLogin 을 인자로 받아서 참 거짓에 따라 삼항연산자로 메뉴 변겨애주기
// 유저 정보 저장




const root = document.querySelector("#root");



// Router 인스턴스 생성
const router = createRouter()
// 컴포넌트를 불러오는데 자꾸 함수 실행으로 가져와서 한참 씨름함.
// console.log("here:" + mainPage);
router.addRoute('/', mainPage);
router.addRoute('/profile', profilePage);
router.addRoute('/login', loginPage);
router.addRoute('/404', errorPage);

// 로드시 랜더
// console.log(window.location.pathname);
router.render(window.location.pathname);

// 네비게이션 링크 클릭 이벤트 처리
document.querySelector('nav').addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
        e.preventDefault();
        router.navigateTo(e.target.pathname);

    }
});



// 뒤로가기/앞으로가기 버튼 처리
window.addEventListener('popstate', () => {
  router.render(window.location.pathname);
});



