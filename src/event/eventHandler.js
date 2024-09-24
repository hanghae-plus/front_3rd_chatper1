import { attachLoginEvent } from "./loginEvent";
import { attachNavEvent } from "./navEvent";

export const attachEventHandler = (path) => {
  switch (path) {
    case "/login": {
      attachLoginEvent();
      break;
    }
    case "/": {
      attachNavEvent();
      break;
    }
    case "/profile": {
      attachNavEvent();
      break;
    }
  }
};
