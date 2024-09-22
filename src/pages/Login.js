import LoginPage from '../../templates/LoginPage';
import { routes } from '../routes';
import { useNavigate } from '../utils/navigate';

export const Login = () => {
  const { navigate } = useNavigate(routes);

  const render = () => {
    const rootElement = document.getElementById('root');
    rootElement.innerHTML = LoginPage;
    document.querySelectorAll('a').forEach((anchor) => {
      anchor.addEventListener('click', (event) => {
        event.preventDefault();
        navigate(event.target.href);
      });
    });

    addEvent();
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

  const logout = () => {
    localStorage.removeItem('user');
  };

  render();

  return { getUser, login, logout };
};
