import { router,navigateTo } from "./router.js";

document.addEventListener('DOMContentLoaded', router);
window.addEventListener('popstate', router);
window.addEventListener('error', error=>{
  console.log(error)
})