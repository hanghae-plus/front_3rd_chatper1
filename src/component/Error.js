export const Error = {
  showError(message) {
    const errorElement = document.createElement('div');
    errorElement.className = 'error-boundary';
    errorElement.innerHTML = `
      <strong>오류 발생!</strong>
      <span>${message}</span>
    `;
    document.body.insertBefore(errorElement, document.body.firstChild);
  },
  
  removeError() {
    const errorElement = document.querySelector('.error-boundary');
    if (errorElement) {
      errorElement.remove();
    }
  }
};