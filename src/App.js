import Component from "./core/Component.js";
import Header from "./components/Header.js";
import Router from "./router/Router.js";
import HomePage from "./pages/HomePage.js";
import routes from "./routes.js";
import Footer from "./components/Footer.js";
import ProfilePage from "./pages/ProfilePage.js";
import LoginPage from "./pages/LoginPage.js";
import ErrorPage from "./pages/ErrorPage.js";

export default class App extends Component {

    setup() {
        this.state= {
            isLogin: false,
            router: new Router(this.isLogin),
            user: {
                username: '',
                email: '',
                bio: ''
            }
        }
    }

    setEvent() {

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

        const {isLogin, router, user} = this.state
        const {changeIsLogin, setUser} = this

        const $app = this.$target.querySelector('.app')
        const $contents = this.$target.querySelector('.contents')

        const $header = this.$target.querySelector('.header')
        new Header($header, {
            router,
            isLogin,
            changeIsLogin: changeIsLogin.bind(this),
            setUser: setUser.bind(this)
        })

        new HomePage($contents, {
            router,
            isLogin,
            changeIsLogin: changeIsLogin.bind(this)
        })

        const $footer = this.$target.querySelector('.footer')
        new Footer($footer, {
            router,
        })

        router.addRoute('/', () => new HomePage($contents, {
            router,
            isLogin,
            changeIsLogin: changeIsLogin.bind(this)
        }));

        router.addRoute('/profile', () => new ProfilePage($contents, {
            router,
            user,
            setUser: setUser.bind(this)
        }));

        router.addRoute('/login', () => new LoginPage($app, {
            router,
            isLogin,
            changeIsLogin: changeIsLogin.bind(this),
            user,
            setUser: setUser.bind(this)
        }));

        router.addRoute('/error', () => new ErrorPage($app));

        // router.navigateTo(window.location.pathname)
    }


    changeIsLogin(value) {
        this.setState({isLogin: value})
    }

    setUser(value) {
        localStorage.setItem('user', value)
        this.setState({user: JSON.parse(value)})
    }

}
