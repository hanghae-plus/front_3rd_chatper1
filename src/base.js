export class Component {
  constructor(targetElement, state) {
    if (!targetElement || typeof targetElement !== "object" || targetElement.nodeType !== 1) {
      targetElement = document.getElementById("root");
    }
    this.targetElement = targetElement; // 렌더링할 DOM 요소
    this.state = state; // 초기 상태
    this.init();
  }

  init() {
    // 필요시 추가 구현
    this.render();
  }

  setState(newState) {
    this.state = { ...this.state, ...newState }; // 상태 업데이트
    this.render(); // 상태가 변경되면 업데이트
  }

  render() {
    // 기본 렌더링 메서드 (서브클래스에서 오버라이드해야 함)
    throw new Error("render() 메서드는 서브클래스에서 구현해야 합니다.");
  }
}

export class ErrorBoundary extends Component {
  constructor(targetElement, renderFunc) {
    super(targetElement, { hasError: false, errorMessage: "" });
    this.renderFunc = renderFunc;
  }

  static getDerivedStateFromError(message) {
    // 에러가 발생했을 때 상태를 업데이트
    return { hasError: true, errorMessage: message };
  }

  resetError() {
    this.setState({ hasError: false, errorMessage: "" });
  }

  render() {
    if (this.state.hasError) {
      this.renderError();
    } else {
      if (this.renderFunc) this.renderFunc();
    }
  }

  renderError() {
    const message = this.state.errorMessage;
    this.targetElement.innerHTML = `<div class="flex items-center justify-center min-h-screen bg-gray-100">
      <div class="bg-red-500 text-white p-4 rounded-lg shadow-md max-w-md w-full">
          <h2 class="font-bold text-lg">오류 발생!</h2>
          ${message ? `<p class="mt-2"><span id="error-message">${message}</span></p>` : ""}
          <p class="mt-4"><button type="button" id="reset-button" class="inline-block bg-red-700 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded">
              돌아가기
          </button></p>
      </div>
    </div>`;
    document.getElementById("reset-button").addEventListener("click", () => this.resetError());
  }
}
