import Component from "./core/Component.js";
import Header from "./components/Header.js";
import Router from "./router/Router.js";
import HomePage from "./pages/HomePage.js";
import routes from "./routes.js";
import Footer from "./components/Footer.js";

export default class App extends Component {

    setup() {
        this.state= {
            isLogin: false,
        }
    }

    template() {
        return `
        <div class = "app">
          <div class = "header"></div>
          <div class = "contents"></div>
          <div class = "footer"></div>
        </div>
    `;
    }

    mounted() {
        const {isLogin} = this.state
        // set router
        const $app = this.$target.querySelector('.app')
        const $contents = this.$target.querySelector('.contents')
        const router = routes($app, $contents)

        // render header
        const $header = this.$target.querySelector('.header')
        new Header($header, {router});

        // render footer
        const $footer = this.$target.querySelector('.footer')
        new Footer($footer, {});

    }

}
