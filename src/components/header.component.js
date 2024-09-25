import { bodyLayout } from "../router/html";
import { router } from "../router/router";

export default function Header(curPage) {
  const templateName = "HEADER";

  const initHTML = () => {
    // html 페이지 주입
    router.bodyLayoutInit();
    const html = router.templates[templateName];
    document.querySelector("header").innerHTML = html;
  };

  const hydratePage = () => {
    // header 가변 CSS 적용
    if (curPage === "HOME") {
      document.querySelector("#home").classList.add("text-blue-600");
      document.querySelector("#profile").classList.add("text-gray-600");
    } else if (curPage === "PROFILE") {
      document.querySelector("#home").classList.add("text-gray-600");
      document.querySelector("#profile").classList.add("text-blue-600");
    }

    // 링크 활성화
    router.activateLink("home", "/");
    router.activateLink("profile", "/profile");
    router.activateLink("logout", "/login");
  };

  initHTML();
  hydratePage();
}
