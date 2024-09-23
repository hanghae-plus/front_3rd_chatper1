import Router from "../router";

export default function ErrorBoundary({ $root, errorMessage }) {
  const router = new Router();

  this.errorMessage = errorMessage;

  this.$target = document.createElement("div");
  this.$target.className =
    "bg-gray-100 flex items-center justify-center min-h-screen";

  this.template = () => {
    return `
      <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md"> 
        <div class="flex flex-col items-center">
          <span id="error" class="mb-4 text-red-600">오류 발생! - ${this.errorMessage}</span>
          <button id="refresh" class="bg-blue-500 text-white px-4 py-2 rounded font-bold">새로 고침</button>
        </div>
      </div>
    `;
  };

  this.render = () => {
    $root.innerHTML = "";
    this.$target.innerHTML = this.template();
    $root.appendChild(this.$target);

    const $refreshBtn = document.getElementById("refresh");
    $refreshBtn.addEventListener("click", (e) => {
      router.push(router.currentPath());
    });
  };

  this.render();
}
