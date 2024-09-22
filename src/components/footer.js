import Component from './common/component';

export default class Footer extends Component {
  constructor(element) {
    super(element);
  }

  template() {
    return `
      <footer class="bg-gray-200 p-4 text-center">
        <p>&copy; 2024 항해플러스. All rights reserved.</p>
      </footer>
    `;
  }
}
