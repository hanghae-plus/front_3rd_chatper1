import {
  HomePage,
  LoginPage,
  NotFoundPage,
  ProfilePage,
} from "./components/page";
import { Footer, Header, Layout } from "./components/shared";
import { PERMISSION, ROUTES } from "./components/constants";
import { Component, UserController, Router, submitForm } from "./utils";
import { ROUTE_COMPONENT_LIST } from "./components/constants";
import ErrorBoundaryPage from "./components/page/ErrorBoundaryPage";

class NotFoundComponent extends Component {
  template() {
    return NotFoundPage();
  }
}

export class HomeComponent extends Component {
  template() {
    const userStatus = this.props.user.status();
    const permission = PERMISSION[userStatus];
    return Layout({
      children: HomePage(),
      header: Header({ tabPaths: permission.path }),
      footer: Footer(),
    });
  }
}

export class ProfileComponent extends Component {
  template() {
    const userStatus = this.props.user.status();
    const permission = PERMISSION[userStatus];
    return Layout({
      children: ProfilePage(),
      header: Header({ tabPaths: permission.path }),
      footer: Footer(),
    });
  }

  afterRender() {
    const { user, router } = this.props;
    const userData = user.getUser();
    router.redirectTo(ROUTES.LOGIN.path, !userData);
  }

  setEvent() {
    const { user } = this.props;
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
  }

  setEvent() {
    const { user, router } = this.props;
    this.login(user, router);
  }

  login(user, router) {
    const loginForm = document.getElementById("login-form");
    if (!loginForm) return;

    submitForm(loginForm, ({ username }) => {
      if (!username) {
        throw new Error("아이디를 입력해주세요.");
      }
      const userData = { username, email: "", bio: "" };
      user.login(userData, () => {
        router.navigateTo(ROUTES.PROFILE.path);
      });
    });
  }
}

class ErrorBoundary extends Component {
  setup() {
    this.state = {
      errorMessage: "",
    };
  }

  setEvent() {
    window.addEventListener("error", (e) => {
      this.setState({ errorMessage: e.error.message });
    });
  }

  template() {
    return ErrorBoundaryPage({ message: this.state.errorMessage });
  }
}

class App extends Component {
  setup() {
    const user = new UserController();
    const router = new Router({
      notFound: () => {
        new NotFoundComponent(this.target);
      },
    });
    new ErrorBoundary(this.target);

    this.state = {
      user,
      router,
    };
  }

  setEvent() {
    this.validatePath();
  }

  afterRender() {
    const { router, user } = this.state;

    ROUTE_COMPONENT_LIST.forEach(({ path, component }) => {
      router.addRoute(path, () => {
        component(this.target, { user, router });
      });
    });

    const currentPath = window.location.pathname;
    router.handleRoute(currentPath);
  }

  validatePath() {
    const { router, user } = this.state;
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
