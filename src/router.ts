import Home from './pages/home.js';
import Profile from './pages/profile.js';
import Login from './pages/login.js';
import PageNotFound from './pages/404.js';

const routes = {
  Home,
  Profile,
  Login,
  PageNotFound,
};

function capitalizeURL(path: string) {
  return path.charAt(0).toUpperCase() + path.slice(1).toLowerCase();
}

export const router = {
  push: (pathname: string) => {
    const path = capitalizeURL(pathname);
    history.pushState({}, '', '/' + capitalizeURL(path));
  },
};

export function updateContent() {
  console.log(123);
}

window.addEventListener('popstate', updateContent);
