import LayoutApp from './components/layout-app.component.js';

export function renderApp() {
  const root = document.getElementById('root') as HTMLElement;
  root.innerHTML = '';
  root.appendChild(LayoutApp());
}

renderApp();
