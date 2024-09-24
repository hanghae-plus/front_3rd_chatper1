import { destroyStore } from '../module/store';

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

  update(data: { [key: string]: string }) {
    /**
     * 현재는 a링크로 이동되기 때문에 페이지 이동 시 전체 렌더링이 다시 된다.
     * router이동으로 바꾼다면 각 component에서 변화된 data에 따른 render 로직 override
     */
    if (this) this.render();
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

  destroy() {
    destroyStore(this);
    this.container.innerHTML = '';
    document.removeChild(this.container);
  }
}
