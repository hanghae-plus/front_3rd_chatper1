export default class Component {
  constructor(target, store) {
    this.target = target;
    this.store = store;
    this.setUp();
  }

  setUp() {}
  mounted() {}

  template() {
    return "";
  }

  addEvent() {}

  render() {
    this.target.innerHTML = this.template();
    this.mounted();
    this.addEvent();
  }
}
