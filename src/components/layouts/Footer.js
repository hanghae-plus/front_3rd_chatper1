export default class Footer {
  constructor({ $element }) {
    this.$element = $element;
    this.render();
  }

  render() {
    this.$element.innerHTML = ` 
      <footer class="bg-gray-200 p-4 text-center">
        <p>&copy; 2024 항해플러스. All rights reserved.</p>
      </footer>
      `;
  }
}
