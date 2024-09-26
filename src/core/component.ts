import { Router, useRouter } from '../module/route';

export default class Component {
  id: string;
  container: HTMLElement;
  state: {};
  router: Router;
  constructor(containerId: string, args?: any) {
    this.id = containerId;
    this.state = args ? { ...args } : {};
    this.router = useRouter();
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

  render() {
    this.container = document.getElementById(this.id)!;
    if (!this.container) return;
    this.init();
    this.container.innerHTML = this.template();
    this.mounted();
  }

  destroy() {
    if (this.container) {
      this.container.className = 'none';
      this.container.innerHTML = '';
    }
  }
}
