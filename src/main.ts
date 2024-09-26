import LayoutApp from './components/layout-app.component.js';

export function renderApp() {
  const root = document.getElementById('root') as HTMLElement;
  root.innerHTML = '';
  root.appendChild(LayoutApp());
}

localStorage.setItem(
  'userInfo',
  JSON.stringify([
    { username: 'testuser', email: '', bio: '' },
    { username: '윤계상', email: '', bio: '' },
    { username: '손석구', email: '', bio: '' },
    { username: '이준혁', email: '', bio: '' },
    { username: '김무열', email: '', bio: '' },
  ]),
);

renderApp();
