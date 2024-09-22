import NotFoundPage from '../../templates/NotFoundPage';
import { routes } from '../routes';
import { useNavigate } from '../utils/navigate';

export const NotFound = () => {
  const { navigate } = useNavigate(routes);

  const render = () => {
    const rootElement = document.getElementById('root');
    rootElement.innerHTML = NotFoundPage;

    addEvent();
  };

  const addEvent = () => {
    document.querySelectorAll('a').forEach((anchor) => {
      anchor.addEventListener('click', (event) => {
        event.preventDefault();
        navigate(event.target.href);
      });
    });
  };

  render();
};
