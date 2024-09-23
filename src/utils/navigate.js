import Header from '../components/Header';
import Footer from '../components/Footer';
import { store } from '../store';

export const useNavigate = (routes) => {
  const navigate = (path) => {
    window.history.pushState({}, '', path);
    updateHTML();
  };

  const updateHTML = async () => {
    const currentPath = window.location.pathname;
    const rootElement = document.getElementById('root');

    if (currentPath === '/' || currentPath === '/profile') {
      rootElement.innerHTML = /* HTML */ `<div class="bg-gray-100 min-h-screen flex justify-center">
        <div class="max-w-md w-full">
          ${Header(currentPath)}
          <main id="main"></main>
          ${Footer}
        </div>
      </div>`;

      document.getElementById('logout')?.addEventListener('click', () => {
        store.removeState('user');
        navigate('/login');
      });
    } else {
      rootElement.innerHTML = '<main id="main"></main>';
    }

    document.querySelectorAll('li').forEach((anchor) => {
      anchor.addEventListener('click', (event) => {
        event.preventDefault();

        navigate(event.target.href);
      });
    });

    const targetComponent = routes[currentPath] || routes['/404'];
    targetComponent();

    const user = store.getState('user');
    if (!user && currentPath === '/profile') {
      navigate('/login');
      return;
    }
    if (user && currentPath === '/login') {
      navigate('/');
      return;
    }
  };

  return { updateHTML, navigate };
};
