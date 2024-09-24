export default class Component {
  id: string;
  container: HTMLElement;
  state: {};
  constructor(containerId: string, args?: any) {
    this.id = containerId;
    this.container = document.getElementById(containerId)!;
    this.state = args ? { ...args } : {};
    this.init();
  }

  init() {
    // 각 component에서 override
  }

  mounted() {
    // 각 component에서 override
  }

  setState(state: { [key: string]: string | boolean }) {
    this.state = { ...this.state, state };
    this.render();
  }

  template() {
    // 각 component에서 override
    return ``;
  }

  attachEventListeners() {
    // 각 component에서 override
  }

  render() {
    this.container.innerHTML = this.template();
    this.mounted();
    this.attachEventListeners();
  }
}
