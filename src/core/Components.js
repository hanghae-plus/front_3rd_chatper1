export default class Component {
  constructor($element) {
    this.$container = document.createElement('div');
    $element.appendChild(this.$container);
    this.$element = this.$container;
  }

  setTemplate() {}

  setup() {}

  template() {
    return '';
  }

  // 랜더링 수행
  render() {
    this.$element.innerHTML = this.template();
    this.setTemplate();
    this.setEvent();
  }

  // 랜더링 수행 이후 추가적으로 수행해야 할 작업
  setEvent() {}

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.render();
  }
}
