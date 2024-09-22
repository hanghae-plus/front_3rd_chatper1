import LoginPage from '../templates/LoginPage';
import HomePage from '../templates/HomePage';
import NotFoundPage from '../templates/NotFoundPage';
import ProfilePage from '../templates/ProfilePage';

import { useNavigate } from './utils/route';
import { useAuth } from './utils/auth';
import { useProfile } from './utils/profile';

const routes = {
  '/': HomePage,
  '/login': LoginPage,
  '/profile': ProfilePage,
  '/404': NotFoundPage,
};

const navigate = useNavigate(routes);
const { login, logout } = useAuth();
const { getProfile, updateProfile } = useProfile();

// TODO: getElementById로 대체할 수 있는 지 확인
window.addEventListener('submit', (event) => {
  if (event.target.id === 'login-form') {
    login(event);
    navigate('/profile');
  }

  if (event.target.id === 'profile-form') {
    updateProfile(event);
  }
});
window.addEventListener('click', (event) => {
  if (event.target.id === 'logout') {
    logout();
    navigate('/login');
  }
});

if (window.location.pathname === '/profile') {
  getProfile();
}
