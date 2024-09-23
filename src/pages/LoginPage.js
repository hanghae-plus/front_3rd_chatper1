import LoginTemplate from '../../templates/login';
import { routes } from '../routes';
import { useNavigate } from '../utils/navigate';

const LoginPage = () => {
  const { navigate } = useNavigate(routes);

  const render = () => {
    const rootElement = document.getElementById('main');
    rootElement.innerHTML = LoginTemplate;
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

export default LoginPage;
