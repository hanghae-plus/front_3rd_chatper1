import Component from '../../core/Component';

class Footer extends Component {
  setup() {
    this.$target.classList.add('bg-gray-200', 'p-4', 'text-center');
  }

  template() {
    return '<p>&copy; 2024 항해플러스. All rights reserved.</p>';
  }
}

export default Footer;
