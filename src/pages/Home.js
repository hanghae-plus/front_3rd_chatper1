import { useNavigate } from '../utils/navigate';
import HomePage from '../../templates/HomePage';
import { routes } from '../routes';

export const Home = () => {
  const { navigate } = useNavigate(routes);

  const render = () => {
    const rootElement = document.getElementById('root');
    rootElement.innerHTML = HomePage;

    document.querySelectorAll('a').forEach((anchor) => {
      anchor.addEventListener('click', (event) => {
        event.preventDefault();
        navigate(event.target.href);
      });
    });

    addEvent();
  };

  const addEvent = () => {
    document.getElementById('logout').addEventListener('click', () => {
      logout();
      navigate('/login');
    });
  };

  const logout = () => {
    localStorage.removeItem('user');
  };

  render();
};
