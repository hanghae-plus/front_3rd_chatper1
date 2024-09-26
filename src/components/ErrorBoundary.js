export default function createErrorBoundary() {
  let error = null;

  window.addEventListener('error', (event) => handleError(event.error));

  function handleError(newError) {
    error = newError;

    render();
  }

  function resetError() {
    error = null;

    render();
  }

  function render() {
    if (error) {
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
