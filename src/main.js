import LoginPage from "../templates/LoginPage";
import HomePage from "../templates/HomePage";
import NotFoundPage from "../templates/NotFoundPage";
import ProfilePage from "../templates/ProfilePage";

const routes = {
	"/": HomePage,
	"/login": LoginPage,
	"/profile": ProfilePage,
	"/404": NotFoundPage,
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

	if (window.location.pathname === "/profile") {
		getProfile();
	}
};

const login = (event) => {
	event.preventDefault();

	const username = document.getElementById("username").value;
	localStorage.setItem("user", JSON.stringify({ username, email: "", bio: "" }));

	navigate("/profile");
};
const logout = () => {
	localStorage.removeItem("user");
	navigate("/login");
};

const getProfile = () => {
	const usernameInput = document.getElementById("username");
	const emailInput = document.getElementById("email");
	const bioInput = document.getElementById("bio");

	const savedUser = JSON.parse(localStorage.getItem("user"));

	usernameInput.value = savedUser?.username || "";
	emailInput.value = savedUser?.email || "";
	bioInput.value = savedUser?.bio || "";
};
const updateProfile = (event) => {
	event.preventDefault();

	const username = document.getElementById("username").value;
	const email = document.getElementById("email").value;
	const bio = document.getElementById("bio").value;

	localStorage.setItem("user", JSON.stringify({ username, email, bio }));
};

window.addEventListener("popstate", updateHTML);
// TODO: getElementById로 대체할 수 있는 지 확인
window.addEventListener("submit", (event) => {
	if (event.target.id === "login-form") {
		login(event);
	}

	if (event.target.id === "profile-form") {
		updateProfile(event);
	}
});
window.addEventListener("click", (event) => {
	if (event.target.id === "logout") {
		logout();
	}
});

updateHTML();
if (window.location.pathname === "/profile") {
	getProfile();
}
