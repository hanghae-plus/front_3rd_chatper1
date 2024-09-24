import { Home } from './Page/Home';
import { Login } from './Page/Login';
import { Profile } from './Page/Profile';
import { SignupPage } from './Page/SignupPage';
import { Router } from './Router/Router';

const router = new Router();

router.addRoute('/', () => Home());
router.addRoute('/profile', () => Profile());
router.addRoute('/login', () => Login());
router.addRoute('/signup', () => SignupPage());
router.init();