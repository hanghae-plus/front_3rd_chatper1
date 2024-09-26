export default class ErrorBoundary {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
  }

  render(error) {
    if (this.container) {
      this.container.innerHTML = "";

      const errorDiv = document.createElement("div");
      errorDiv.className = "error";

      const errorTitle = document.createElement("h1");
      errorTitle.textContent = "오류 발생!";

      const errorMessage = document.createElement("p");
      errorMessage.textContent = error.message;
      errorDiv.appendChild(errorTitle);
      errorDiv.appendChild(errorMessage);
      this.container.appendChild(errorDiv);
    } else {
      console.error("ContainerId 없음!: " + this.containerId);
    }
  }
}
