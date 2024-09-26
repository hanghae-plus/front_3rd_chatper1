import { getHomeComponent } from "./components/pages/Home/Home";
import { getRenderComponent } from "./components/pages/Render/Render";
import { removeUser, setUser } from "./store/user/userStore";
import { movePage } from "./utils/navigations/movePage";

document.querySelector("#root").innerHTML = getRenderComponent({
  component: getHomeComponent,
  isLayout: true,
});

window.addEventListener("popstate", () => {
  const currentPath = window.location.pathname;
  movePage(currentPath);
});

document.getElementById("root").addEventListener("click", (e) => {
  const { id } = e.target;

  if (id === "home") {
    movePage("/", e);
  }

  if (id === "login") {
    movePage("/login", e);
  }

  if (id === "profile") {
    movePage("/profile", e);
  }

  if (id === "logout") {
    removeUser();
    movePage("/login", e);
  }
});

document.getElementById("root").addEventListener("submit", (e) => {
  if (e.target.id === "login-form") {
    e.preventDefault();

    const username = document.getElementById("username").value;
    setUser({ username });
    movePage("/profile", e);
  }

  if (e.target.id === "profile-form") {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const bio = document.getElementById("bio").value;
    setUser({ username, email, bio });
  }
});

window.addEventListener("error", (e) => {
  document.getElementById("root").innerHTML = `<div>
        <div>오류 발생!</div>
        <div>${e.message}</div>
        </div>
      `;
});
