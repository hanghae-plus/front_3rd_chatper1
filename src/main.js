import { Home } from './Page/Home';
import { Login } from './Page/Login';
import { Profile } from './Page/Profile';
import { Router } from './Router/Router';

const router = new Router();

router.addRoute('/', () => Home());
router.addRoute('/profile', () => Profile());
router.addRoute('/login', () => Login());

console.log('window.location.pathname: ', window.location.pathname);

router.handlePopState();

// window.addEventListener("DOMContentLoaded", (event) => {
//   console.log("DOM fully loaded and parsed");
// });

console.log(router);

const navElem = document.querySelector('nav');

if (navElem) {
    navElem.addEventListener('click', (e) => {
        console.log(e.target.tagName);
        if (e.target.tagName === 'A') {
            e.preventDefault();
            router.navigateTo(e.target.pathname);
        }
    });
}
