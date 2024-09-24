import { getInitComponent } from "./components/pages/Init/Init";
import { movePage } from "./utils/navigations/movePage";
import { render } from "./utils/rendering/render";

document.querySelector("#root").innerHTML = getInitComponent();

window.addEventListener("popstate", () => {
  const currentPath = window.location.pathname;
  render(currentPath);
});

document.getElementById("root").addEventListener("click", (e) => {
  const { id } = e.target;

  if (id === "home") {
    movePage("/", e);
  }

  if (id === "login") {
    movePage("/login", e);

    const loginForm = document.getElementById("login-form");
    loginForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      localStorage.setItem("user", JSON.stringify({ email, password }));

      movePage("/profile", e);
    });
  }

  if (id === "profile") {
    e.preventDefault();

    const profileForm = document.getElementById("profile-form");
    profileForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const username = document.getElementById("username").value;
      const email = document.getElementById("email").value;
      const bio = document.getElementById("bio").value;

      localStorage.setItem("user", JSON.stringify({ username, email, bio }));

      movePage("/profile", e);
    });
  }

  if (id === "logout") {
    movePage("/login", e);
  }
});
