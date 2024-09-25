import { h } from '../virtual-dom.js';
import Header from './header.component.js';
import nav from './nav.component.jsx';
import Footer from './footer.component.js';

export default function LayoutApp() {
  return (
    <div class="bg-gray-100 min-h-screen flex justify-center">
      <div class="max-w-md w-full">
        {Header()}
        {nav()}
        {Footer()}
      </div>
    </div>
  );
}
