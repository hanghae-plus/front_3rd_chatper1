export default class Component {
  id: string;
  container: HTMLElement;
  state: {};
  constructor(containerId: string, args?: any) {
    this.id = containerId;
    this.state = args ? { ...args } : {};
  }

  init() {
    // 각 component에서 override
  }

  mounted() {
    // 각 component에서 override
  }

  update(data: { [key: string]: string }) {
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
    this.container = document.getElementById(this.id)!;
    if (!this.container) return;
    this.init();
    this.container.innerHTML = this.template();
    this.mounted();
    this.attachEventListeners();
  }

  destroy() {
    if (this.container) {
      this.container.className = 'none';
      this.container.innerHTML = '';
    }
  }
}
