import { router } from "../router/router";

export default function ErrorBoundary(targetId, error) {
  const templateName = "ERROR_BOUNDARY";

  const initHTML = () => {
    // html 페이지 주입
    router.metadataInit("에러 바운더리");
    const html = router.templates[templateName];
    document.querySelector(`#${targetId}`).innerHTML = html;
    document.querySelector(
      `#message`
    ).innerHTML = `<div>${error.message}</div>`;
  };

  const hydratePage = () => {
    // 링크 활성화
    router.activateLink("home", "/");
  };

  initHTML();
  hydratePage();
}
