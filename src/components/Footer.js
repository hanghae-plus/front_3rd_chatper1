import AbstractComponent from "../abstract/AbstractComponent";

export default class Footer extends AbstractComponent {
  constructor($root) {
    super($root);
  }

  template() {
    return `
      <p>&copy; 2024 항해플러스. All rights reserved.</p>
    `;
  }

  attachEventListeners() {
    this.$root.className = "bg-gray-200 p-4 text-center";
  }
}
