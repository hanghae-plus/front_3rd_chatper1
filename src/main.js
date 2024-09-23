import { getInitComponent } from "./components/pages/Init/Init";
import { movePage } from "./utils/navigations/movePage";
import { addHomeEvent } from "./utils/pageEvents/addHomeEvent";
import { addLoginEvent } from "./utils/pageEvents/addLoginEvent";
import { render } from "./utils/rendering/render";

document.querySelector("#root").innerHTML = getInitComponent();

window.addEventListener("popstate", () => {
  const currentPath = window.location.pathname;
  render(currentPath);
});

document.getElementById("home").addEventListener("click", (e) => {
  e.preventDefault();
  movePage("/");
});

document.getElementById("login").addEventListener("click", (e) => {
  e.preventDefault();
  movePage("/login");

  const loginForm = document.getElementById("login-form");
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    localStorage.setItem("user", JSON.stringify({ email, password }));

    // TODO: 이벤트를 movePage에 매개변수로 넘기자
    e.preventDefault();
    movePage("/profile");
  });
});

// document.getElementById("profile").addEventListener("click", (e) => {
//   e.preventDefault();

//   const profileForm = document.getElementById("profile-form");
//   profileForm.addEventListener("submit", (event) => {
//     event.preventDefault();

//     const username = document.getElementById("username").value;
//     const email = document.getElementById("email").value;
//     const bio = document.getElementById("bio").value;

//     localStorage.setItem("user", JSON.stringify({ username, email, bio }));

//     // TODO: 이벤트를 movePage에 매개변수로 넘기자
//     e.preventDefault();
//     // movePage("/profile");
//   });

//   console.log("로그인 작동");
//   e.preventDefault();
//   movePage("/profile");
// });

// document.getElementById("logout").addEventListener("click", (e) => {
//   console.log("로그아웃 작동");
//   e.preventDefault();
//   movePage("/login");
// });
