import { Home } from './Page/Home';
import { Login } from './Page/Login';
import { Profile } from './Page/Profile';
import { Router } from './Router/Router';

const router = new Router();

router.addRoute('/', () => Home());
router.addRoute('/profile', () => Profile());
router.addRoute('/login', () => Login());
router.init();