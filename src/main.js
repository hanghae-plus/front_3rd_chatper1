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

const navigate = (event) => {
	event = event || window.event;
	event.preventDefault();
	window.history.pushState({}, "", event.target.href);
	updateHTML();
};

const updateHTML = async () => {
	const currentPath = window.location.pathname;
	const targetHTML = routes[currentPath] || routes["/404"];

	document.querySelector("#root").innerHTML = targetHTML;
	document.querySelectorAll("a").forEach((anchor) => {
		anchor.addEventListener("click", navigate);
	});
};

window.addEventListener("popstate", updateHTML);

updateHTML();
