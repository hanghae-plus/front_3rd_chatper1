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
const protectedRoutes = ["/", "/profile"];

const navigate = (path) => {
	window.history.pushState({}, "", path);
	updateHTML();
};

const isLoggedIn = () => {
	const user = localStorage.getItem("user");
	if (!user) return false;
	return true;
};

const updateHTML = async () => {
	const currentPath = window.location.pathname;
	const targetHTML = routes[currentPath] || routes["/404"];

	if (!isLoggedIn() && protectedRoutes.includes(currentPath)) {
		navigate("/login");
		return;
	}

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

const login = (event) => {
	event.preventDefault();

	const username = document.getElementById("username").value;
	localStorage.setItem("user", JSON.stringify({ name: username, email: "", bio: "" }));

	navigate("/profile");
};
const logout = () => {
	localStorage.removeItem("user");
	navigate("/login");
};

// TODO: getElementById로 대체할 수 있는 지 확인
window.addEventListener("submit", (event) => {
	if (event.target.id === "login-form") {
		login(event);
	}
});
window.addEventListener("click", (event) => {
	if (event.target.id === "logout") {
		logout();
	}
});
