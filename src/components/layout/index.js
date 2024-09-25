// Layout 페이지
export function Layout({ header, main, footer }) {
  return `
    <div class="bg-gray-100 min-h-screen flex justify-center">
      <div class="max-w-md w-full">
        ${header?.().template() || ''}  
        ${main}
        ${footer?.().template() || ''}
      </div>
    </div>
    `;
}
