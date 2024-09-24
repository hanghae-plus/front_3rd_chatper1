import { attachLoginEvent } from "./loginEvent";

export const attachEventHandler = (path) => {
  switch (path) {
    case "/login": {
      attachLoginEvent();
      break;
    }
  }
};
