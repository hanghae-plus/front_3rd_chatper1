import {
  HomePage,
  LoginPage,
  NotFoundPage,
  ProfilePage,
} from "./components/page";
import { Footer, Header, Layout } from "./components/shared";
import { advanced } from "./utils/advanced";
import { PERMISSION, ROUTES } from "./components/constants";
import { Component, ControlUser, Router, submitForm } from "./utils";
import { ROUTE_COMPONENT_LIST } from "./components/constants";

class NotFoundComponent extends Component {
  template() {
    return NotFoundPage();
  }
}

export class HomeComponent extends Component {
  template() {
    const type = this.props.user.getUser()
      ? PERMISSION.AUTH
      : PERMISSION.PUBLIC;
    return Layout({
      children: HomePage(),
      header: Header(type),
      footer: Footer(),
    });
  }
}

export class ProfileComponent extends Component {
  template() {
    const type = this.props.user.getUser()
      ? PERMISSION.AUTH
      : PERMISSION.PUBLIC;
    return Layout({
      children: ProfilePage(),
      header: Header(type),
      footer: Footer(),
    });
  }

  afterRender() {
    const { user, router } = this.props;
    const userData = user.getUser();
    router.redirectTo(ROUTES.LOGIN.path, !userData);

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

export class LoginComponent extends Component {
  template() {
    return Layout({
      children: LoginPage(),
    });
  }
  afterRender() {
    const { user, router } = this.props;
    const userData = user.getUser();
    router.redirectTo(ROUTES.HOME.path, userData);

    this.login(user, router);
  }

  login(user, router) {
    const loginForm = document.getElementById("login-form");
    if (!loginForm) return;

    advanced.occurError(loginForm);

    submitForm(loginForm, ({ username }) => {
      const userData = { username, email: "", bio: "" };
      user.login(userData, () => {
        router.navigateTo(ROUTES.PROFILE.path);
      });
    });
  }
}

class App extends Component {
  setup() {
    const user = new ControlUser();
    const router = new Router({
      notFound: () => {
        new NotFoundComponent(this.target);
      },
    });
    this.state = {
      user,
      router,
    };
  }

  afterRender() {
    const { router, user } = this.state;

    ROUTE_COMPONENT_LIST.forEach(({ path, component }) => {
      router.addRoute(path, () => {
        component(this.target, { user, router });
      });
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
      if (e.target.id === ROUTES.LOGOUT.id) {
        user.logout(() => {
          router.navigateTo(ROUTES.LOGIN.path);
        });
      }
    });
  }
}

new App(document.querySelector("#root"));
