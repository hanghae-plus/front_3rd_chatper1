import { createHeader } from '../components/Header';
import { createFooter } from '../components/Footer';

/**
 * Header와 Footer를 사용하는 페이지인 경우 레이아웃을 렌더링하는 함수
 * @param {HTMLElement} pageContent - 현재 페이지의 콘텐츠를 나타내는 HTML 요소
 */
export function renderLayout(pageContent) {
  const container = document.createElement('div');
  container.className = 'bg-gray-100 min-h-screen flex justify-center';

  const subContainer = document.createElement('div');
  subContainer.className = 'max-w-md w-full';

  const root = document.getElementById('root');
  root.innerHTML = ''; // 이전 콘텐츠 제거
  root.prepend(container);
  container.appendChild(subContainer);

  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  // Header를 만들고 DOM에 추가
  createHeader(isLoggedIn);

  // 현재 페이지의 콘텐츠 추가
  subContainer.appendChild(pageContent);

  // Footer를 만들고 DOM에 추가
  createFooter();
}
