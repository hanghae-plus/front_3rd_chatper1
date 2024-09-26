import { PATH_INFO } from './constant';
import { FallbackView } from './pages/FallbackView';
import { LoginView } from './pages/LoginView';
import { MainView } from './pages/MainView';
import { NotFound } from './pages/NotFound';
import { ProfileView } from './pages/ProfileView';
import { Router } from './router';

const routes = [
  { path: PATH_INFO.main, view: MainView },
  { path: PATH_INFO.login, view: LoginView },
  { path: PATH_INFO.profile, view: ProfileView },
  { path: '/404', view: NotFound }, //todo:  error boundary 와 충돌 이슈 해결 필요
];

Router.initialize(routes);

window.addEventListener('error', function (event) {
  const { message } = event.error;

  const fallbackView = new FallbackView(message);

  fallbackView.render();
});
