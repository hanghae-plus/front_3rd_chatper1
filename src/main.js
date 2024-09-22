import {
  HomePage,
  LoginPage,
  NotFoundPage,
  ProfilePage,
} from "./components/page";
import { Footer, Header, Layout } from "./components/shared";
import { advanced } from "./utils/advanced";

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

    submitForm(profileForm, (updatedData) => {
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
        new NotFoundComponent({ target: this.target });
      },
    });
    this.state = {
      user,
      router,
    };
  }

  afterRender() {
    const { router, user } = this.state;

    router.addRoute("/login", () => {
      new LoginComponent({ target: this.target }, { user, router });
    });

    router.addRoute("/profile", () => {
      new ProfileComponent({ target: this.target }, { user, router });
    });
    router.addRoute("/", () => {
      new HomeComponent({ target: this.target }, { user, router });
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
