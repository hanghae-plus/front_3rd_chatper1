import Component from '../../core/Component';

class ErrorOverlay extends Component {
  setup() {
    this.state = {
      errorData: null,
      // errorData: {
      //     name: ex.name, // e.g. ReferenceError
      //     message: ex.line, // e.g. x is undefined
      //     url: document.location.href,
      //     stack: ex.stack, // stacktrace string; remember, different per-browser!
      // },
    };
  }

  template() {
    const { errorData } = this.state;
    if (!errorData) {
      return '';
    }

    return `
			<div class="fixed top-0 left-0 right-0 bottom-0 bg-black/70 text-white font-bold p-10">
				<div class="flex items-center justify-between">
					<h2>오류 발생!</h2>
					<button type="button">
						<span class="sr-only">오버레이 닫기</span>
						&times;
					</button>
				</div>

				<p>
					${errorData.message}
				</p>
			</div>
		`;
  }
}

export default ErrorOverlay;
