import Component from '../../core/Components.js';

export default class Footer extends Component {
  constructor({ $element }) {
    super($element);
    this.render();
  }

  template() {
    return `
        <footer class="bg-gray-200 p-4 text-center">
            <p>&copy; 2024 항해플러스. All rights reserved.</p>
        </footer>
         `;
  }
}
