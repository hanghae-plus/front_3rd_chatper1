import ErrorPage from "./pages/error";
import HomePage from "./pages/home";
import ProfilePage from "./pages/profile";
import Router from "./router";
import LoginMannager from "./loginManager";
import LoginPage from "./pages/login";

const root = document.querySelector("#root");
const ROUTES = {
	"/profile": ProfilePage,
	"/error": ErrorPage,
	"/404": ErrorPage,
};
// const router = () => {
// 	const path = window.location.pathname;
// 	console.log(path);
// 	switch (path) {
// 		case '/':
// 		case '/main.html':
// 			root.innerHTML = HomePage();
// 			break;
// 		case '/login.html':
// 			root.innerHTML = LoginPage();
// 			break;
// 		case '/profile.html':
// 			root.innerHTML = ProfilePage();
// 			break;
// 		default:
// 			root.innerHTML = ErrorPage();
// 			break;
// 	}
// };

const loginManager = new LoginMannager();
const router = new Router(loginManager);

const loginPage = new LoginPage(loginManager);
const homePage = new HomePage(loginManager);

// add router
// Object.entries(ROUTES).reduce((acc, cur) => {
// 	router.add(cur[0], cur[1]);
// }, []);
router.add("/", homePage);
router.add("/main", homePage);
router.add("/login", loginPage);

console.log(router.routes);

router.init();
