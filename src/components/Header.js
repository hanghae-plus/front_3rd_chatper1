import Component from '../../core/Component';

class Header extends Component {
  setup() {
    this.$target.className = 'bg-blue-800 text-white p-4 sticky top-0';

    this.state = {
      title: '항해플러스',
    };
  }

  template() {
    return `<h1 class="text-2xl font-bold">${this.state.title}</h1>`;
  }
}

export default Header;
