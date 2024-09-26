import LayoutApp from './components/layout-app.component.js';
import { router } from './router.js';
import { userInfoStore } from './store.js';

export function render() {
  const root = document.getElementById('root') as HTMLElement;
  root.innerHTML = '';
  root.appendChild(LayoutApp());
}

export const userInfoState = userInfoStore();

window.addEventListener('error', () => {
  router().push('/error');
});

render();
