import { bodyLayout, footer, header } from "../router/html";
import { router } from "../router/router";

export default function Home() {
  const templateName = "HOME";

  const initHTML = () => {
    // html 페이지 주입
    router.metadataInit("홈");
    const html = router.templates[templateName];
    document.body.innerHTML = bodyLayout;
    document.querySelector("#content").innerHTML = `
      ${header}
      ${html}
      ${footer}
    `;
  };

  const hydratePage = () => {
    // header 가변 CSS 적용
    document.querySelector("#home").classList.add("text-blue-600");
    document.querySelector("#profile").classList.add("text-gray-600");

    // 링크 활성화
    router.activateLink("home", "/");
    router.activateLink("profile", "/profile");
    router.activateLink("logout", "/login");
  };

  initHTML();
  hydratePage();
}
