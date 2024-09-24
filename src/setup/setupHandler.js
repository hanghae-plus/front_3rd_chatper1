import { setUpProfilePage } from "./setupProfile";

export const setUpPage = (path) => {
  switch (path) {
    case "/profile": {
      setUpProfilePage();
      break;
    }
  }
};
