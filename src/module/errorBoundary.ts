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
                    <a href="/" class="bg-blue-600 text-white px-4 py-2 rounded font-bold"> 
                      <button data-path="/">
                        홈으로 돌아가기
                      </button>
                    </a>
                  </div>
                </main>
              `;
    root.appendChild(errorComponent);
    const btn = errorComponent.querySelector('[data-path]')!;
    btn.addEventListener('click', (event) => {
      event.preventDefault();
      const router = useRouter();
      const path = btn.getAttribute('data-path');
      if (path) router.push(path);
    });

    const aTag = errorComponent.querySelector('a[href]')!;
    aTag.addEventListener('click', (event) => event.preventDefault());
    return true;
  });
};

export default errorBoundary;
