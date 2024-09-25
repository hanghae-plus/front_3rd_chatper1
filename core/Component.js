export default class Component {
  $target = null;

  state = {};

  events = [];

  constructor($target) {
    this.$target = $target;
    this.setup();
    this.initEvent();
    this.render();
  }

  // state를 설정하는 생명주기
  setup() {}

  mounted() {}

  destroy() {
    this.events.forEach(({ eventType, handler }) => {
      this.$target.removeEventListener(eventType, handler);
    });
  }

  template() {
    return '';
  }

  render() {
    this.$target.innerHTML = this.template();
    this.mounted();
  }

  initEvent() {}

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.render();
  }

  addEvent(eventType, selector, callback) {
    const handler = (event) => {
      if (!event.target.closest(selector)) return false;
      callback(event);
    };

    this.$target.addEventListener(eventType, handler);

    this.events.push({
      eventType,
      handler,
    });
  }
}
