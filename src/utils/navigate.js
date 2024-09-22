export const useNavigate = (routes) => {
  const protectedRoutes = ['/', '/profile'];

  const navigate = (path) => {
    window.history.pushState({}, '', path);
    updateHTML();
  };

  const updateHTML = async () => {
    const currentPath = window.location.pathname;

    const targetComponent = routes[currentPath] || routes['/404'];
    targetComponent();

    if (!JSON.parse(localStorage.getItem('user')) && protectedRoutes.includes(currentPath)) {
      navigate('/login');
      return;
    }
  };

  return { updateHTML, navigate };
};
