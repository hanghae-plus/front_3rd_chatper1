import LoginPage from '../../templates/LoginPage';
import { routes } from '../routes';
import { useNavigate } from '../utils/navigate';

export const Login = () => {
  const { navigate } = useNavigate(routes);

  const render = () => {
    const rootElement = document.getElementById('main');
    rootElement.innerHTML = LoginPage;
  };

  const addEvent = () => {
    document.getElementById('login-form').addEventListener('submit', (event) => {
      login(event);
      navigate('/profile');
    });
  };

  const getUser = () => {
    return JSON.parse(localStorage.getItem('user'));
  };

  const login = (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    localStorage.setItem('user', JSON.stringify({ username, email: '', bio: '' }));
  };

  render();
  addEvent();

  return { getUser, login };
};
