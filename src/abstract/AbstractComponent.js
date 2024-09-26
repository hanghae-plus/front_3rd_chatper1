export default class AbstractComponent {
  constructor($root, ...args) {
    this.$root = $root;
    this.props = args[0];

    this.render();
  }

  beforeMount() {}

  mount() {}

  template() {}

  attachEventListeners() {}

  render() {
    if (!this.$root) {
      return;
    }
    this.beforeMount();
    this.$root.innerHTML = this.template();
    this.mount();
    this.attachEventListeners();
  }
}
