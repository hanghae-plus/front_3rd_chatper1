import ProfilePage from '../../templates/ProfilePage';

export const Profile = () => {
  const render = () => {
    const rootElement = document.getElementById('main');
    rootElement.innerHTML = ProfilePage;
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

  render();
  addEvent();
  getProfile();

  return { getProfile, updateProfile };
};
