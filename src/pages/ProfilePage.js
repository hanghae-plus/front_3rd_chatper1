import ProfileTemplate from '../../templates/profile';
import { store } from '../store';

const ProfilePage = () => {
  const render = () => {
    const rootElement = document.getElementById('main');
    rootElement.innerHTML = ProfileTemplate;
    document.title = '항해플러스 - 프로필';
  };

  const addEvent = () => {
    document.getElementById('profile-form').addEventListener('submit', (event) => {
      updateProfile(event);
    });
  };

  const getProfile = () => {
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const bioInput = document.getElementById('bio');

    const savedUser = store.getState('user');

    usernameInput.value = savedUser?.username || '';
    emailInput.value = savedUser?.email || '';
    bioInput.value = savedUser?.bio || '';
  };

  const updateProfile = (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const bio = document.getElementById('bio').value;

    store.setState('user', { username, email, bio });
  };

  render();
  addEvent();
  getProfile();

  return { getProfile, updateProfile };
};
export default ProfilePage;
