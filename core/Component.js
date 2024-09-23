export default class Component {
  $target = null;

  state = {};

  constructor($target) {
    this.$target = $target;
    this.init();
  }

  init() {
    this.initEvent();
    this.render();
  }

  // mounted() {}

  template() {
    return '';
  }

  render() {
    this.$target.innerHTML = this.template();
    // this.mounted();
  }

  initEvent() {}

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.render();
  }

  addEvent(eventType, selector, callback) {
    this.$target.addEventListener(eventType, (event) => {
      if (!event.target.closest(selector)) return false;
      callback(event);
    });
  }
}
