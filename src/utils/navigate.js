import Header from '../components/Header';
import Footer from '../components/Footer';

export const useNavigate = (routes) => {
  const protectedRoutes = ['/', '/profile'];

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

      document.getElementById('logout').addEventListener('click', () => {
        localStorage.removeItem('user');
        navigate('/login');
      });
    } else {
      rootElement.innerHTML = '<main id="main"></main>';
    }

    document.querySelectorAll('a').forEach((anchor) => {
      anchor.addEventListener('click', (event) => {
        event.preventDefault();
        navigate(event.target.href);
      });
    });

    const targetComponent = routes[currentPath] || routes['/404'];
    targetComponent();

    if (!JSON.parse(localStorage.getItem('user')) && protectedRoutes.includes(currentPath)) {
      navigate('/login');
      return;
    }
  };

  return { updateHTML, navigate };
};
