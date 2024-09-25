import BaseComponent from "./BaseComponent";

export default class BasePage extends BaseComponent {
  constructor({ props = "", ...args } = {}) {
    super({ props, ...args });
    this.$root = document.getElementById("root");

    this.init();
  }

  init() {}

  render() {
    this.$root.innerHTML = this.template();

    super.render();
  }

  update(newProps) {
    this.props = {
      ...this.props,
      ...newProps,
    };

    this.render();
  }
}
