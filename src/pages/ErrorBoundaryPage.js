import router from "../router";

import BasePage from "../base/BasePage";

export default class ErrorBoundaryPage extends BasePage {
  constructor({ props }) {
    super({ props });
  }

  template() {
    const { errorMessage } = this.props;
    return `
      <div class="bg-gray-100 flex items-center justify-center min-h-screen">
        <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md"> 
          <div class="flex flex-col items-center">
            <span id="error" class="mb-4 text-red-600">오류 발생! - ${errorMessage}</span>
            <button id="refresh" class="bg-blue-500 text-white px-4 py-2 rounded font-bold">새로 고침</button>
          </div>
        </div>
      </div>
    `;
  }

  attachEventListeners() {
    const $refreshBtn = document.getElementById("refresh");

    $refreshBtn.addEventListener("click", (e) => {
      router.push(router.currentPath());
    });
  }
}
