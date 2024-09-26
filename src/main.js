import ErrorPage from './pages/error';
import HomePage from './pages/home';
import ProfilePage from './pages/profile';
import Router from './router';
import LoginMannager from './loginManager';
import LoginPage from './pages/login';

const loginManager = new LoginMannager();
const router = new Router(loginManager);

const loginPage = new LoginPage(loginManager, router);
const homePage = new HomePage(loginManager, router);
const profilePage = new ProfilePage(loginManager, router);
const errorPage = new ErrorPage(loginManager, router);

// add router
// Object.entries(ROUTES).reduce((acc, cur) => {
// 	router.add(cur[0], cur[1]);
// }, []);
router.add('/', homePage);
router.add('/main', homePage);
router.add('/login', loginPage);
router.add('/profile', profilePage);
router.add('/404', errorPage);
router.add('/error', errorPage);

router.init();
