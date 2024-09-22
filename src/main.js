import HomePage from "./components/HomePage";
import ProfilePage from "./components/ProfilePage";
import NotFoundPage from "./components/NotFoundPage";
import LoginPage from "./components/LoginPage";
import { ControlUser, render, Router, submitForm } from "./utils";
import { advanced } from "./utils/advanced";

const controlUserData = new ControlUser();

const tabList = [
  {
    name: "홈",
    id: "home",
    path: "/",
    isPublic: true,
  },
  {
    name: "프로필",
    id: "profile",
    path: "/profile",
    isPublic: false,
  },
  {
    name: "로그아웃",
    id: "logout",
    path: "",
    isPublic: false,
  },
  {
    name: "로그인",
    id: "login",
    path: "/login",
    isPublic: false,
  },
];

function Header() {
  return `
    <header class="bg-blue-600 text-white p-4 sticky top-0">
      <h1 class="text-2xl font-bold">항해플러스</h1>
    </header>
    ${TabList()}
`;
}

function Footer() {
  return `
    <footer class="bg-gray-200 p-4 text-center">
      <p>&copy; 2024 항해플러스. All rights reserved.</p>
    </footer>
  `;
}

function Layout({ children, disableHeader, disableFooter }) {
  return `
    <div class="bg-gray-100 min-h-screen flex justify-center">
      <div class="max-w-md w-full">
        ${disableHeader ? "" : Header()}  
        ${children}
        ${disableFooter ? "" : Footer()}
      </div>
  </div>
  `;
}

function TabList() {
  const user = controlUserData.getUser();
  const tabListHtml = tabList
    .map((tab) => {
      const currentPath = window.location.pathname;
      if (user && tab.path === "/login") {
        return "";
      }
      if (
        tab.isPublic ||
        (!tab.isPublic && user) ||
        (tab.path === "/login" && !user)
      ) {
        return `<li><a href="${tab.path}" id="${tab.id}" class="${
          tab.path === currentPath ? "text-blue-600 font-bold" : "text-gray-600"
        }">${tab.name}</a></li>`;
      }
      return "";
    })
    .join("");

  return `
      <nav class="bg-white shadow-md p-2 sticky top-14">
        <ul id='tab-list' class="flex justify-around">
          ${tabListHtml}  
        </ul>
      </nav>
      `;
}

const router = new Router({
  notFound: () => {
    render(
      "#root",
      Layout({
        children: NotFoundPage(),
        disableHeader: true,
        disableFooter: true,
      })
    );
  },
});

router.addRoute("/", () => {
  render(
    "#root",
    Layout({
      children: HomePage(),
    })
  );
});

router.addRoute("/login", () => {
  render(
    "#root",
    Layout({
      children: LoginPage(),
      disableHeader: true,
      disableFooter: true,
    })
  );
  const user = controlUserData.getUser();
  router.redirectTo("/", user);

  const loginForm = document.getElementById("login-form");
  if (!loginForm) return;
  advanced.occurError(loginForm);
  submitForm(loginForm, (formData) => {
    const user = { username: formData.username, email: "", bio: "" };
    controlUserData.login(user, () => {
      router.navigateTo("/profile");
    });
  });
});

router.addRoute("/profile", () => {
  render(
    "#root",
    Layout({
      children: ProfilePage(),
    })
  );
  const user = controlUserData.getUser();
  router.redirectTo("/login", !user);

  const profileForm = document.getElementById("profile-form");
  if (!profileForm) return;

  const userKeys = Object.keys(user);
  userKeys.forEach((key) => {
    const input = document.getElementById(key);
    if (!input) return;
    input.defaultValue = user[key];
  });
  submitForm(profileForm, (formData) => {
    const updatedData = {
      username: formData.username,
      email: formData.email,
      bio: formData.bio,
    };
    controlUserData.update(updatedData, () => {
      alert("프로필이 수정되었습니다.");
    });
  });
});

document.body.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    e.preventDefault();
    router.navigateTo(e.target.pathname);
  }
  if (e.target.id === "logout") {
    controlUserData.logout(() => {
      router.navigateTo("/login");
    });
  }
});

advanced.eventDelegation();
const currentPath = window.location.pathname;
router.handleRoute(currentPath);
