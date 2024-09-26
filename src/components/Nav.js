const componentTemplate = `
  <nav class="bg-white shadow-md p-2 sticky top-14">
    <ul class="flex justify-around">
    </ul>
  </nav>
`;

function setUpComponent({ path, onNavigateTo }) {
  const nav = document.querySelector("nav");
  const user = localStorage.getItem("user");
  const ul = nav.querySelector("ul");

  const homeLi = document.createElement("li");
  const profileLi = document.createElement("li");
  const logoutLi = document.createElement("li");
  const loginLi = document.createElement("li");

  homeLi.innerHTML = `<a href="/" class="${
    path === "/" ? "text-blue-600 font-bold" : "text-gray-600"
  }">홈</a>`;
  profileLi.innerHTML = `<a href="/profile" class="${
    path === "/profile" ? "text-blue-600 font-bold" : "text-gray-600"
  }">프로필</a>`;
  logoutLi.innerHTML = `<a id="logout" href="#" class="text-gray-600">로그아웃</a>`;
  loginLi.innerHTML = `<a href="/login" class="text-gray-600">로그인</a>`;

  ul.appendChild(homeLi);
  if (user) {
    ul.appendChild(profileLi);
    ul.appendChild(logoutLi);
  } else {
    ul.appendChild(loginLi);
  }

  nav.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      e.preventDefault();
      if (e.target.id === "logout") {
        localStorage.removeItem("user");
        onNavigateTo("/login");
      } else {
        onNavigateTo(e.target.pathname);
      }
    }
  });
}

export default { componentTemplate, setUpComponent };
