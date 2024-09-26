import Component from "../core/Component.js";
import Header from "../components/Header.js";
import Footer from "../components/Footer.js";
import HomePage from "./HomePage.js";

export default class ContentsPage extends Component {
    template() {
        return `
          <div class = "header"></div>
          <div class = "contents"></div>
          <div class = "footer"></div>
    `;
    }

    mounted() {
        const {isLogin, router} = this.props

        // render header
        const $header = this.$target.querySelector('.header')
        new Header($header, {
            router,
            isLogin,
            // changeIsLogin: this.changeIsLogin.bind(this)
        });

        // render contents
        const $contents = this.$target.querySelector('.contents')
        new HomePage($contents, {
            router,
            isLogin,
            // changeIsLogin: this.changeIsLogin.bind(this)
        });

        // render footer
        const $footer = this.$target.querySelector('.footer')
        new Footer($footer, {
            router
        });

    }
}