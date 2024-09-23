import ErrorPage from './pages/error';
import HomePage from './pages/home';
import LoginPage from './pages/login';
import ProfilePage from './pages/profile';
import { router } from './shared/util/Router';

export default class App {
  constructor(selector: string) {
    router.init({
      '/': new HomePage(selector),
      '/login': new LoginPage(selector),
      '/profile': new ProfilePage(selector),
      '/404': new ErrorPage(selector),
    });
  }
}
