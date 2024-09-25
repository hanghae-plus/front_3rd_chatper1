import { LoginView } from './pages/LoginView';
import { MainView } from './pages/MainView';
import { NotFound } from './pages/NotFound';
import { ProfileView } from './pages/ProfileView';
import { Router } from './router';
import UserInfo from './userInfo';

const routes = [
  { path: '/', view: MainView },
  { path: '/login', view: LoginView },
  { path: '/profile', view: ProfileView },
  { path: '/404', view: NotFound },
];

Router.initialize(routes);
