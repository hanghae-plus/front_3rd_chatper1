export default class ErrorHandler {
  static showErrorMessage(message) {
    const root = document.getElementById('root');

    if (!root) return;

    root.innerHTML = `
      <div class="bg-gray-100 min-h-screen flex items-center justify-center">
        <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
          <h1 class="text-2xl font-bold text-blue-600 mb-4">오류 발생!</h1>
          <p class="text-4xl font-bold text-gray-800 mb-4">😢</p>
          <p class="text-xl text-gray-600 mb-8">${message}</p>
        </div>
      </div>
    `;
  }
}
