import Header from './header.component.js';
import Footer from './footer.component.js';

function LayoutApp() {
  return `<div class="bg-gray-100 min-h-screen flex justify-center">
      <div class="max-w-md w-full">
        ${Header()}
        ${Footer()}
      </div>
    </div>`;
}

export default LayoutApp;
