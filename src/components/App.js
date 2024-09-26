import ErrorOverlay from './ErrorOverlay';

class App {
  constructor({ $target, router }) {
    this.$target = $target;
    this.router = router;
  }

  mount() {
    this.render();

    this.initEvent();

    this.router.init(this.$target.querySelector('#container'));
  }

  template() {
    return `
			<div id="container"></div>
			<div id="error-overlay"></div>
		`;
  }

  render() {
    this.$target.innerHTML = this.template();

    this.mounted();
  }

  mounted() {
    this.errorOverlay = new ErrorOverlay(this.$target.querySelector('#error-overlay'));

    window.addEventListener('error', (e) => {
      // preventDefault()를 실행하지 않을 경우 Uncaught 에러 메시지가 출력
      e.preventDefault();

      this.errorOverlay.sendError(e.error);
    });
  }

  initEvent() {
    this.$target.addEventListener('click', (e) => {
      if (e.target.closest('a.link')) {
        e.preventDefault();

        const url = new URL(e.target.href);
        if (url.pathname !== window.location.pathname) {
          this.router.push(url.pathname);
        }
      }
    });
  }
}

export default App;
