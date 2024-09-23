import Router from "./router";
import UserInfo from "./UserInfo";
import customEventListener from "./customEventListener";
import {
  BIO,
  EMAIL,
  HOME_PAGE,
  LOGIN_PAGE,
  PROFILE_PAGE,
  USERNAME,
} from "./constants";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProfilePage from "./pages/ProfilePage";

customEventListener();

const initialState = () => {
  const userInfo = new UserInfo();

  return {
    username: userInfo.get(USERNAME) || "",
    email: userInfo.get(EMAIL) || "",
    bio: userInfo.get(BIO) || "",
  };
};

export default function App($root) {
  const router = new Router();

  this.state = initialState();

  const homePage = new HomePage({
    $root,
    initialState: { ...this.state },
    onLogout: () => {
      this.setState(initialState());
      homePage.setState(initialState());
    },
  });

  const loginPage = new LoginPage({
    $root,
    onSubmit: (newState) => {
      this.setState(newState);
      homePage.setState(newState);
      profilePage.setState(newState);
    },
  });

  const profilePage = new ProfilePage({
    $root,
    initialState: this.state,
    onClickUpdateProfile: (newState) => {
      this.setState(newState);
      profilePage.setState(newState);
    },
    onUpdateProfile: (newState) => {
      this.setState(newState);
      profilePage.setState(newState);
    },
    onLogout: () => {
      this.setState(initialState());
      profilePage.setState(initialState());
      homePage.setState(initialState());
    },
  });

  const notFoundPage = new NotFoundPage({
    $root,
  });

  this.setState = (newState) => {
    this.state = {
      ...this.state,
      ...newState,
    };
  };

  router.addRoute(HOME_PAGE, () => {
    homePage.render();
  });

  router.addRoute(LOGIN_PAGE, () => {
    if (!!this.state.username) {
      router.push(HOME_PAGE);
      return;
    }
    loginPage.render();
  });

  router.addRoute(PROFILE_PAGE, () => {
    if (!this.state.username) {
      router.push(LOGIN_PAGE);
      return;
    }
    profilePage.render();
  });

  router.addRoute("*", () => {
    notFoundPage.render();
  });

  router.push(router.currentPath());
}
