import { Component } from "../utils";
import {
  ErrorBoundaryPage,
  LoginPage,
  NotFoundPage,
  ProfilePage,
  HomePage,
} from "../page";
import { submitForm } from "../utils";
import { PERMISSION, ROUTES } from "../constants";
import { Layout, Header, Footer } from "./shared";

export class NotFoundComponent extends Component {
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

export class ErrorBoundaryComponent extends Component {
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
    if (!this.state.errorMessage) return;
    return ErrorBoundaryPage({ message: this.state.errorMessage });
  }
}
