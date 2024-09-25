import Header from './header.component.js';
import Footer from './footer.component.js';
import { updateContent } from '../router.js';

function LayoutApp() {
  updateContent();
  return `
    <div class="bg-gray-100 min-h-screen flex justify-center">
      <div class="max-w-md w-full">
        ${Header()}
        ${Footer()}
      </div>
    </div>
  `;
}

export default LayoutApp;
