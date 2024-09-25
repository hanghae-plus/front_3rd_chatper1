import BaseComponent from "../base/BaseComponent";

export default class Footer extends BaseComponent {
  constructor() {
    super();
  }

  template() {
    return `
      <footer class="bg-gray-200 p-4 text-center">
        <p>&copy; 2024 항해플러스. All rights reserved.</p>
      </footer>
    `;
  }
}
