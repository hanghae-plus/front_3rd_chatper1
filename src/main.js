import { router } from './router.js';
import login from './login.js';

window.addEventListener('load', router);
window.addEventListener('popstate', router);

document.addEventListener('submit', (e) => {
  if (e.target.id === 'login-form') {
    e.preventDefault();
    const id = e.target.querySelector('#username').value;
    login(id);
  }
});

document.addEventListener('click', (e) => {
  if (e.target.id === 'logout') {
    e.preventDefault();
    localStorage.removeItem('user');
    router();
  }
});

