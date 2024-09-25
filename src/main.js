import { FallbackView } from './pages/FallbackView';
import { LoginView } from './pages/LoginView';
import { MainView } from './pages/MainView';
import { NotFound } from './pages/NotFound';
import { ProfileView } from './pages/ProfileView';
import { Router } from './router';

const routes = [
  { path: '/', view: MainView },
  { path: '/login', view: LoginView },
  { path: '/profile', view: ProfileView },
  { path: '/404', view: NotFound },
];

Router.initialize(routes);

window.addEventListener('error', function (event) {
  const { message } = event.error;

  const fallbackView = new FallbackView(message);

  fallbackView.render();
});
