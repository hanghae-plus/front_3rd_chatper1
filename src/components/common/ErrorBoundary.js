export default class ErrorBoundary {
  constructor(target) {
    this.target = target || document.querySelector('#root');
  }

  template(message) {
    return `
        <div>오류 발생!</div>
        <div>${message}</div>
    `;
  }

  init() {
    window.addEventListener('error', (error) => {
      this.target.innerHTML = this.template(error.message);
    });
  }
}
