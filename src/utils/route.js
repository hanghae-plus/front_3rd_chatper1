import { useAuth } from './auth.js';
import { useProfile } from './profile.js';

export const useNavigate = (routes) => {
  const { isLoggedIn } = useAuth();
  const { getProfile } = useProfile();

  const protectedRoutes = ['/', '/profile'];

  const navigate = (path) => {
    window.history.pushState({}, '', path);
    updateHTML();
  };

  const updateHTML = async () => {
    const currentPath = window.location.pathname;
    const targetHTML = routes[currentPath] || routes['/404'];

    if (!isLoggedIn() && protectedRoutes.includes(currentPath)) {
      navigate('/login');
      return;
    }

    document.querySelector('#root').innerHTML = targetHTML;
    document.querySelectorAll('a').forEach((anchor) => {
      anchor.addEventListener('click', (event) => {
        event.preventDefault();
        navigate(event.target.href);
      });
    });

    if (window.location.pathname === '/profile') {
      getProfile();
    }
  };

  window.addEventListener('popstate', updateHTML);
  updateHTML();

  return navigate;
};
