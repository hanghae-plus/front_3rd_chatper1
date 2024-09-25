import View from "../core/view";
import useLocalStorage from "../utils/useLocalStorage";

export default class MainView extends View {
  constructor(containerId, template) {
    super(containerId, template);
    const { getStoredValue } = useLocalStorage("user", { username: "" });
    this.isUserLoggedIn = getStoredValue().username !== "";
  }
  render() {
    super.render();
  }
}
