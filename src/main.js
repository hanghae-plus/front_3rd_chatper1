import { router } from "./router";

window.addEventListener("popstate", router);
// DOM이 로드되면 router 실행.
document.addEventListener("DOMContentLoaded", router);
