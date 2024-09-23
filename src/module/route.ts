import Component from "../core/component";
import store from "./store";

class Router {
    private static instance: Router
    private routes: {};
    constructor() {
        if(Router.instance) return Router.instance
        Router.instance = this
        this.routes = {}
        window.addEventListener('popstate', this.handlePopState.bind(this) );
    }

    addRoute(path: string, handler: Component) {
        this.routes[path] = handler;
    }

    push(path: string) {
        let nextPath = path
        if(localStorage.getItem('user')){
            const {username, email, bio} = JSON.parse(localStorage.getItem('user')!)
            store.setState({username, email, bio})
        }
        switch(path){
            case '/profile':
                if( store.state.username == '') nextPath = '/login'
                break;
            
            case '/login':
                if( store.state.username ) nextPath = '/'
                break;
            
            case '/logout':
                store.reset()
                nextPath = '/login'
                break;

            default :
                break;
        }
        history.pushState(null, '', nextPath);
        this.handleRoute(nextPath);
    }

    handlePopState() {
        this.push(window.location.pathname);
    }

    handleRoute(path: string) {
        const nextPath = this.routes[path] ? path : '/404';
        this.routes[nextPath].render()
    }
}

const useRouter = () => new Router()
export {useRouter}