import View from "../core/view";
import ErrorBoundary from "./errorBoundary";

export default class LoginView extends View {
  constructor(containerId, template) {
    super(containerId, template);
  }

  render() {
    super.render();
    this.registerUsernameInputEvent();
  }

  registerUsernameInputEvent() {
    const $username = document.getElementById("username");
    const errorBoundary = new ErrorBoundary("root");
    if ($username) {
      $username.addEventListener("input", () => {
        try {
          if ($username.value === "1") {
            throw new Error("의도적인 오류입니다.");
          }
        } catch (error) {
          errorBoundary.render(error);
        }
      });
    }
  }
}
