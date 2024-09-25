import Header from '../components/Header';
import Footer from '../components/Footer';

/**
 * 페이지 레이아웃을 렌더링합니다.
 * 
 * 이 함수는 Header와 Footer 컴포넌트를 포함하여,
 * 주어진 콘텐츠를 중앙에 배치합니다.
 *
 * @param {Function} pageContent - 현재 페이지의 콘텐츠를 반환하는 함수
 * @returns {string} - 완성된 HTML 레이아웃
 */
export function renderLayout(pageContent) {
  return `
    <div class='bg-gray-100 min-h-screen flex justify-center'>
      <div class='max-w-md w-full'>
        ${Header()}
        ${pageContent()}
        ${Footer()}
      </div>
    </div>
  `;
}
