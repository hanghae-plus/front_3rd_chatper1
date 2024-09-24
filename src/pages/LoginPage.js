import { routes } from '../routes';
import { store } from '../store';
import { useNavigate } from '../utils/useNavigate';
import LoginTemplate from '../../templates/login';

const LoginPage = () => {
  const { navigate } = useNavigate(routes);

  const render = () => {
    const rootElement = document.getElementById('main');
    rootElement.innerHTML = LoginTemplate;
    document.title = '항해플러스 - 로그인';
  };

  const addEvent = () => {
    document.getElementById('login-form').addEventListener('submit', (event) => {
      login(event);
    });
  };

  const login = (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;

    if (username.trim() === '') {
      throw new Error('사용자 이름을 입력해주세요.');
    }

    store.setState('user', { username, email: '', bio: '' });
    store.setState('isLoggedIn', true);

    navigate('/profile');
  };

  render();
  addEvent();

  return { login };
};

export default LoginPage;
