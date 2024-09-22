import Login from "../templates/Login";
import Home from "../templates/Home";
import Error from "../templates/Error";
import Profile from "../templates/Profile";

const routes = {
	"/": Home,
	"/login": Login,
	"/profile": Profile,
	"/404": Error,
};

const navigate = (path) => {
	window.history.pushState({}, "", path);
	updateHTML();
};

const updateHTML = async () => {
	const currentPath = window.location.pathname;
	const targetHTML = routes[currentPath] || routes["/404"];

	document.querySelector("#root").innerHTML = targetHTML;
	document.querySelectorAll("a").forEach((anchor) => {
		anchor.addEventListener("click", (event) => {
			event.preventDefault();
			navigate(event.target.href);
		});
	});
};

window.addEventListener("popstate", updateHTML);
updateHTML();
