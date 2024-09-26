import Component from '../../core/Component';

class ErrorOverlay extends Component {
  setup() {
    this.state = {
      errorData: null,
    };
  }

  sendError(error) {
    if (error instanceof Error) {
      this.setState({
        errorData: {
          name: error.name,
          message: error.message,
          stack: error.stack,
        },
      });
    }
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
