import Component from './component.js';
import { html } from 'code-tag';

export default class Footer extends Component {
  template() {
    return html`
      <footer class="bg-gray-200 p-4 text-center">
        <p>&copy; 2024 항해플러스. All rights reserved.</p>
      </footer>
    `;
  }
}