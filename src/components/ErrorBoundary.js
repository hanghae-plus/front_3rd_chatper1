export default function createErrorBoundary() {
	let hasError = false;
	let error = null;

	window.addEventListener('error', (event) => handleError(event.error));
	window.addEventListener('unhandledrejection', (event) => handleError(event.reason));

	function handleError(newError) {
		hasError = true;
		error = newError;

		render();
	}

	function resetError() {
		hasError = false;
		error = null;

		render();
	}

	function render() {
		if (hasError) {
			document.querySelector('#root').innerHTML = `
        <div class="text-red"">
          <h2>오류 발생!</h2>
          <p>${error.message}</p>
          <button id="resetButton">다시 시도</button>
        </div>
      `;
			document.getElementById('resetButton').addEventListener('click', () => resetError());
		} else {
			document.querySelector('#root').innerHTML = '';
		}
	}

	return {
		resetError,
		handleError,
		render,
	};
}
