import router from "./router";
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
  this.state = initialState();
  const props = { ...this.state };

  const homePage = new HomePage({
    props,
    onLogout: () => {
      this.setState(initialState());
      homePage.update(initialState());
    },
  });

  const loginPage = new LoginPage({
    onSubmit: (newState) => {
      this.setState(newState);
      homePage.update(newState);
      profilePage.update(newState);
    },
  });

  const profilePage = new ProfilePage({
    props,
    onClickUpdateProfile: (newState) => {
      this.setState(newState);
      profilePage.update(newState);
    },
    onUpdateProfile: (newState) => {
      this.setState(newState);
      profilePage.update(newState);
    },
    onLogout: () => {
      this.setState(initialState());
      profilePage.update(initialState());
      homePage.update(initialState());
    },
  });

  const notFoundPage = new NotFoundPage();

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
    loginPage.render();
  });

  router.addRoute(PROFILE_PAGE, () => {
    profilePage.render();
  });

  router.addNotFoundRoute(() => {
    notFoundPage.render();
  });

  router.push(router.currentPath());
}
