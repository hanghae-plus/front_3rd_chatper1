import Component from '../core/component';
import { useRouter } from '../module/route';

export default class NotFoundPage extends Component {
  attachEventListeners() {
    const btnList = this.container.querySelectorAll('[data-path]');
    if (btnList.length) {
      btnList.forEach((button: Element) => {
        button.addEventListener('click', (event: Event) => {
          event.preventDefault();
          const router = useRouter();
          const path = button.getAttribute('data-path');
          if (path) router.push(path);
        });
      });
    }

    const aList = this.container.querySelectorAll('a[href]');
    if (aList.length) {
      aList.forEach((a: Element) =>
        a.addEventListener('click', (event: Event) => event.preventDefault())
      );
    }
  }

  template() {
    return `
          <main class="bg-gray-100 flex items-center justify-center min-h-screen">
            <div class="bg-white p-8 rounded-lg shadow-md w-full text-center" style="max-width: 480px">
              <h1 class="text-2xl font-bold text-blue-600 mb-4">항해플러스</h1>
              <p class="text-4xl font-bold text-gray-800 mb-4">404</p>
              <p class="text-xl text-gray-600 mb-8">페이지를 찾을 수 없습니다</p>
              <p class="text-gray-600 mb-8"> 요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다. </p>
              <a href="/" class="bg-blue-600 text-white px-4 py-2 rounded font-bold"> 
                <button data-path="/">
                  홈으로 돌아가기
                </button>
              </a>
            </div>
          </main>
        `;
  }
}
