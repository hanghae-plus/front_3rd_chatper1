import { Home } from './Page/Home';
import { Login } from './Page/Login';
import { Profile } from './Page/Profile';
import { ErrorPage } from './Page/ErrorPage';

// const navigateTo = (url) => {
//   history.pushState({}, '', url);
//   router();
// };

// // 1)
// document.body.addEventListener('click', (e) => {
//   // 2)
//   if (e.target.matches('[data-link]')) {
//       e.preventDefault();
//       // 3)
//       navigateTo(e.target.href);
//   }
// });

const router = async () => {
    const routes = [
        { path: '/', view: () => Home() },
        { path: '/login', view: () => Login() },
        { path: '/profile', view: () => Profile() },
        { path: '/not-found', view: () => ErrorPage() },
    ];

    const potentialMatches = routes.map((route) => {
        return {
            ...route,
            isMatch: location.pathname === route.path,
        };
    });

    let match = potentialMatches.find((potentialMatch) => potentialMatch.isMatch);

    if (!match) {
        match = {
            path: routes.at(-1).path,
            view: routes.at(-1).view,
            isMatch: true,
        };
    }

    match.view();
};

router();
