import router from './router.js';

window.addEventListener('load', () => router.router());
window.addEventListener('popstate', () => router.router());

