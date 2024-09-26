import Component from './base/Component';
import Router from './base/Router';

class App extends Component {
	constructor(element) {
		super(element);
	}

	mounted() {
		Router.init(this.$target);
	}
}

export default App;
