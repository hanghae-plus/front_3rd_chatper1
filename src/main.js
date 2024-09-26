import Header from './components/Header';
import Footer from './components/Footer';
import UserManager from './store/UserManager';
import routes from './route';

const $root = document.getElementById('root');

function checkAuthentication(path) {
  if (!UserManager.isLoggedIn() && path === '/profile') {
    goTo('/login');
    return false;
  }
  if (UserManager.isLoggedIn() && path === '/login') {
    goTo('/');
    return false;
  }
  return true;
}

function renderPage(path) {
  const { component, defaultLayout } = routes[path] || routes['/error'];

  if (!checkAuthentication(path)) {
    return;
  }

  const headerContent = defaultLayout ? Header.render(path) : '';
  const footerContent = defaultLayout ? Footer.render() : '';
  const componentContent = component
    ? component.render(path)
    : '<p>컴포넌트를 찾을 수 없습니다.</p>';

  $root.innerHTML = `
   ${headerContent}
   ${componentContent} 
   ${footerContent}
 `;

  if (defaultLayout) {
    Header.registerEvents(renderPage);
  }

  if (component && component.registerEvents && path !== '/error') {
    component.registerEvents(renderPage);
  }
}

function goTo(path) {
  history.pushState(null, '', path);
  renderPage(path);
}

document.addEventListener('DOMContentLoaded', () => {
  const initialPath = window.location.pathname;
  renderPage(initialPath);
});

document.addEventListener('click', (event) => {
  if (event.target.matches('a')) {
    event.preventDefault();
    const path = event.target.getAttribute('href');
    goTo(path);
  }
});

window.addEventListener('popstate', () => {
  renderPage(window.location.pathname);
});

window.addEventListener('error', (error) => {
  document.querySelector('#root').innerHTML = `
    <main class="bg-gray-100 flex items-center justify-center min-h-screen">
      <div class="bg-white p-8 rounded-lg shadow-md w-full text-center" style="max-width: 480px">
        <h1 class="text-2xl font-bold text-blue-600 mb-4">오류 발생!</h1>
        <p class="text-xl text-gray-600 mb-8">의도적인 오류입니다.</p>
      </div>
    </main>
  `;
});
