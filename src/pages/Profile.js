import ProfilePage from '../../templates/ProfilePage';
import { routes } from '../routes';
import { useNavigate } from '../utils/navigate';

export const Profile = () => {
  const { navigate } = useNavigate(routes);

  const render = () => {
    const rootElement = document.getElementById('root');
    rootElement.innerHTML = ProfilePage;

    addEvent();
    getProfile();
  };

  const addEvent = () => {
    document.querySelectorAll('a').forEach((anchor) => {
      anchor.addEventListener('click', (event) => {
        event.preventDefault();
        navigate(event.target.href);
      });
    });
    document.getElementById('profile-form').addEventListener('submit', (event) => {
      updateProfile(event);
    });
    document.getElementById('logout').addEventListener('click', () => {
      logout();
      navigate('/login');
    });
  };

  const getProfile = () => {
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const bioInput = document.getElementById('bio');

    const savedUser = JSON.parse(localStorage.getItem('user'));

    usernameInput.value = savedUser?.username || '';
    emailInput.value = savedUser?.email || '';
    bioInput.value = savedUser?.bio || '';
  };

  const updateProfile = (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const bio = document.getElementById('bio').value;

    localStorage.setItem('user', JSON.stringify({ username, email, bio }));
  };

  const logout = () => {
    localStorage.removeItem('user');
  };

  render();

  return { getProfile, updateProfile };
};
