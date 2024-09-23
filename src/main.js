import {
  HomeComponent,
  LoginComponent,
  NotFoundComponent,
  ProfileComponent,
  ErrorBoundaryComponent,
} from "./components";
import { ROUTES } from "./constants";
import { Component, UserController, Router } from "./utils";

const routeComponentList = [
  {
    path: ROUTES.HOME.path,
    component: (target, props) => new HomeComponent(target, props),
  },
  {
    path: ROUTES.PROFILE.path,
    component: (target, props) => new ProfileComponent(target, props),
  },
  {
    path: ROUTES.LOGIN.path,
    component: (target, props) => new LoginComponent(target, props),
  },
];

class App extends Component {
  setup() {
    const user = new UserController();
    const router = new Router({
      notFound: () => {
        new NotFoundComponent(this.target);
      },
    });
    new ErrorBoundaryComponent(this.target);

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

    routeComponentList.forEach(({ path, component }) => {
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
