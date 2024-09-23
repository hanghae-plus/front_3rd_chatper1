import LoginTemplate from '../../templates/login';
import { routes } from '../routes';
import { store } from '../store';
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

  const login = (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    store.setState('user', { username, email: '', bio: '' });
  };

  render();
  addEvent();

  return { login };
};

export default LoginPage;
