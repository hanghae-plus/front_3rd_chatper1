import { useRouter } from './route';

const errorBoundary = () => {
  window.addEventListener('error', (error) => {
    // 에러 UI 표시
    const root = document.getElementById('root')!;
    const errorComponent = document.createElement('div');

    root.innerHTML = '';
    errorComponent.innerHTML = `
                <main class="bg-gray-100 flex items-center justify-center min-h-screen">
                  <div class="bg-white p-8 rounded-lg shadow-md w-full text-center" style="max-width: 480px">
                    <h1 class="text-2xl font-bold text-blue-600 mb-4">항해플러스</h1>
                    <p class="text-xl text-gray-600 mb-8">오류 발생! ${error.message}</p>
                  </div>
                </main>
              `;
    root.appendChild(errorComponent);
  });
};

export default errorBoundary;
