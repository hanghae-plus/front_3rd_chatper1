import Home from "./components/Home";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Error from "./components/Error";
import Header from "./components/Header";
import Footer from "./components/Footer";

const $root = document.querySelector("#root");

// routes 객체: 각 경로와 해당 컴포넌트 및 헤더/푸터 표시 여부를 정의
// isOnlyComponent - true: 헤더/푸터를 미노출 / false: 헤더/푸터 노출
const routes = {
  "/": { component: Home, isOnlyComponent: false },
  "/login": { component: Login, isOnlyComponent: true },
  "/profile": { component: Profile, isOnlyComponent: false },
  "/error": { component: Error, isOnlyComponent: true },
};

// 페이지 렌더링 함수
function renderPage(path) {
  const { component, isOnlyComponent } = routes[path] || routes["/error"];

  // isOnlyComponent 속성이 true면 Header와 Footer 미노출 처리함
  const headerContent = !isOnlyComponent ? Header.template() : "";
  const footerContent = !isOnlyComponent ? Footer.template() : "";

  // root 요소에 헤더, 컴포넌트, 푸터의 템플릿을 삽입하여 페이지 렌더링
  $root.innerHTML = `
    ${headerContent}  
    ${component.template()} 
    ${footerContent}
  `;

  // 해당 컴포넌트에 이벤트 바인딩이 필요한 경우 컴포넌트별 이벤트 바인딩 수행
  if (component.bindEvents) {
    component.bindEvents(renderPage);
  }

  // 헤더 이벤트 바인딩
  Header.bindEvents(renderPage);
}

// 헤더 네비게이션 클릭 이벤트 처리
function handleNavigation(event) {
  if (event.target.classList.contains("menu")) {
    console.log("kyj event.target", event.target);
    event.preventDefault();
    const path = event.target.getAttribute("href");

    console.log(
      "kyj window.location.origin",
      window.location.origin,
      "path::",
      path
    );
    renderPage(path);
  }
}

// 페이지가 처음 로드될 때 초기 경로에 맞는 페이지 렌더링
document.addEventListener("DOMContentLoaded", () => {
  const initialPath = window.location.pathname;
  renderPage(initialPath);

  // 네비게이션 클릭 이벤트 바인딩
  document.addEventListener("click", handleNavigation);
});

// 브라우저의 뒤로가기/앞으로가기 버튼 클릭 시 페이지를 로드
window.addEventListener("popstate", () => {
  renderPage(window.location.pathname);
});
