import { router } from "./router/router.js";
import User from "./store/user.js";

export const user = new User();

// 현재 url 기준으로 페이지 라우팅
const curPath = window.location.pathname;
router.handleRoute(curPath);
