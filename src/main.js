import { router,navigateTo } from "./router.js";

/**
 * 	•	DOMContentLoaded 이벤트는 HTML 문서의 콘텐츠가 모두 로드된 직후 발생합니다. 즉, 페이지가 처음 로드되었을 때 DOM이 완전히 준비되면 router()가 호출됩니다.
 *  •	주요 목적: 브라우저가 처음 페이지를 로드할 때, 현재 URL에 맞는 페이지를 렌더링하기 위해 사용됩니다.
 */
document.addEventListener('DOMContentLoaded', router);
/**
 * •	popstate 이벤트는 브라우저의 뒤로 가기 또는 앞으로 가기 버튼을 눌렀을 때 발생합니다. 브라우저가 history.pushState() 또는 history.replaceState()로 상태를 변경한 후 사용자가 뒤로/앞으로 이동하면, popstate가 발생하게 됩니다.
 * •	주요 목적: 사용자가 브라우저의 뒤로 가기 또는 앞으로 가기를 통해 페이지를 탐색할 때, URL에 맞는 페이지를 다시 렌더링하기 위해 사용됩니다.
 */
window.addEventListener('popstate', router);
// 전역 에러이벤트
/**
 * 이 이벤트 리스너는 페이지 전체에서 발생하는 런타임 에러를 처리합니다.
 * 예를 들어, 페이지에 예상치 못한 자바스크립트 오류가 발생했을 때 이를 감지하고 처리합니다.
 * 전체적인 에러 처리를 중앙화할 수 있고, 예상치 못한 에러를 잡아내는 데 유용합니다.
 * 이 코드는 모든 페이지에서 공통적으로 동작하며, 해당 페이지 외의 다른 코드에서 발생한 오류도 잡아낼 수 있습니다.
 */
window.addEventListener('error', error=>{
  console.error(error.message);
  // document.querySelector('main').innerHTML = `<p class="text-red-600 text-sm">전역에러: ${error.message}</p>`;
})