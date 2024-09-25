import { router } from "../router/router";

export default function Footer() {
  const templateName = "FOOTER";

  const initHTML = () => {
    // html 페이지 주입
    const html = router.templates[templateName];
    document.querySelector("footer").innerHTML = html;
  };

  initHTML();
}
