export default class View {
  constructor(containerId, template) {
    const container = document.getElementById(containerId);
    if (!container) {
      throw new Error(`"${containerId}" 없음!!`);
    }
    this.container = container;
    this.template = template;
  }

  render() {
    this.container.innerHTML = this.template;
  }
}
