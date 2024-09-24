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
    component: (...params) => new HomeComponent(...params),
  },
  {
    path: ROUTES.PROFILE.path,
    component: (...params) => new ProfileComponent(...params),
  },
  {
    path: ROUTES.LOGIN.path,
    component: (...params) => new LoginComponent(...params),
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

  afterRender() {
    const { router, user } = this.state;

    routeComponentList.forEach(({ path, component }) => {
      router.addRoute(path, () => {
        component(this.target, { user, router });
      });
    });

    const currentPath = window.location.pathname;
    router.handleRoute(currentPath);

    this.validatePath();
  }

  validatePath() {
    const { router, user } = this.state;
    this.target.addEventListener("click", (e) => {
      const routePaths = Object.values(ROUTES).reduce(
        (acc, cur) => (cur.path ? [...acc, cur.path] : acc),
        []
      );
      const hasPath = routePaths.includes(e.target.pathname);
      if (hasPath) {
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
