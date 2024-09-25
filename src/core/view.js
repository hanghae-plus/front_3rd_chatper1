export default class View {
  constructor(containerId, template) {
    const container = document.getElementById(containerId);
    if (!container) {
      throw new Error(`Container with id "${containerId}" not found`);
    }
    this.container = container;
    this.template = template;
  }

  render() {
    this.container.innerHTML = this.template;
  }
}
