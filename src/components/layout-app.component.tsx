import { h } from '../virtual-dom.js';
import Header from './header.component.js';
import Footer from './footer.component.js';
import { router } from '../router.js';

export default function LayoutApp() {
  const isNeedHeader = ['/', '/profile'].includes(location.pathname);
  return (
    <div class="bg-gray-100 min-h-screen flex justify-center">
      <div class="max-w-md w-full">
        {isNeedHeader ? Header() : ''}
        {router().getRoute()}
        {isNeedHeader ? Footer() : ''}
      </div>
    </div>
  );
}
