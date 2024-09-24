import { attachLoginEvent } from "./loginEvent";
import { attachNavEvent } from "./navEvent";
import { attachProfileEvent } from "./profileEvent";

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
      attachProfileEvent();
      break;
    }
  }
};
