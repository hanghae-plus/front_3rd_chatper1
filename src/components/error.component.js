import { router } from "../router/router";

export default function Error() {
  const templateName = "ERROR";

  const initHTML = () => {
    // html 페이지 주입
    router.metadataInit("오류");
    const html = router.templates[templateName];
    document.querySelector("#root").innerHTML = html;
  };

  const hydratePage = () => {
    // 링크 활성화
    router.activateLink("home", "/");
  };

  initHTML();
  hydratePage();
}
