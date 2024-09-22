import HomePage from "./components/page/HomePage";
import LoginPage from "./components/page/LoginPage";
import NotFoundPage from "./components/page/NotFoundPage";
import ProfilePage from "./components/page/ProfilePage";
import Header from "./components/shared/Header";
import Footer from "./components/shared/Footer";
import { advanced } from "./utils/advanced";
import Layout from "./components/shared/Layout";

import { Component, ControlUser, Router, submitForm } from "./utils";

class NotFoundComponent extends Component {
  template() {
    return NotFoundPage();
  }
}

class HomeComponent extends Component {
  template() {
    const type = this.props.user.getUser() ? "auth" : "public";
    return Layout({
      children: HomePage(),
      header: Header(type),
      footer: Footer(),
    });
  }
}

class ProfileComponent extends Component {
  template() {
    const type = this.props.user.getUser() ? "auth" : "public";
    return Layout({
      children: ProfilePage(),
      header: Header(type),
      footer: Footer(),
    });
  }

  afterRender() {
    const { user, router } = this.props;
    const userData = user.getUser();
    router.redirectTo("/login", !userData);

    this.updateProfile(user);
  }

  updateProfile(user) {
    const userData = user.getUser();
    const profileForm = document.getElementById("profile-form");
    if (!profileForm) return;

    Object.entries(userData).forEach(([key, value]) => {
      const input = document.getElementById(key);
      if (!input) return;
      input.defaultValue = value;
    });

    submitForm(profileForm, ({ username, email, bio }) => {
      const updatedData = {
        username,
        email,
        bio,
      };
      user.update(updatedData, () => {
        alert("프로필이 수정되었습니다.");
      });
    });
  }
}

class LoginComponent extends Component {
  template() {
    return Layout({
      children: LoginPage(),
    });
  }
  afterRender() {
    const { user, router } = this.props;
    const userData = user.getUser();
    router.redirectTo("/", userData);

    this.login(user, router);
  }

  login(user, router) {
    const loginForm = document.getElementById("login-form");
    if (!loginForm) return;

    advanced.occurError(loginForm);

    submitForm(loginForm, ({ username }) => {
      const userData = { username, email: "", bio: "" };
      user.login(userData, () => {
        router.navigateTo("/profile");
      });
    });
  }
}

class App extends Component {
  setup() {
    const user = new ControlUser();
    const router = new Router({
      notFound: () => {
        new NotFoundComponent({ target: document.querySelector("#root") });
      },
    });
    this.state = {
      user,
      router,
    };
  }

  afterRender() {
    const { router, user } = this.state;
    const mainTarget = document.querySelector("#root");

    router.addRoute("/login", () => {
      new LoginComponent({ target: mainTarget }, { user, router });
    });

    router.addRoute("/profile", () => {
      new ProfileComponent({ target: mainTarget }, { user, router });
    });
    router.addRoute("/", () => {
      new HomeComponent({ target: mainTarget }, { user, router });
    });

    advanced.eventDelegation();
    const currentPath = window.location.pathname;
    router.handleRoute(currentPath);
  }

  setEvent(props) {
    const { router, user } = props;
    this.target.addEventListener("click", (e) => {
      if (e.target.tagName === "A") {
        e.preventDefault();
        router.navigateTo(e.target.pathname);
      }
      if (e.target.id === "logout") {
        user.logout(() => {
          router.navigateTo("/login");
        });
      }
    });
  }
}

new App({ target: document.querySelector("#root") });
