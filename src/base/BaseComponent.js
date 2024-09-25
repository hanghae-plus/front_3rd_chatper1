export default class BaseComponent {
  constructor({ props = "", ...args } = {}) {
    this.props = props;
    Object.assign(this, args);
  }

  template() {}

  attachEventListeners() {}

  render() {
    this.attachEventListeners();
  }

  update(newProps) {
    this.props = {
      ...this.props,
      ...newProps,
    };
  }
}
