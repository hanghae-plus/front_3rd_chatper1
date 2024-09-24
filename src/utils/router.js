import setLoginOnDocument from "../pages/login/render.js";
import setProfileOnDocument from "../pages/profile/render.js";
import setHomeOnDocument from "../pages/home/render.js";
import setErrorOnDocument from "../pages/error/render.js";

export default class Router {
    constructor() {
        if(Router.instance) {
            return Router.instance
        }

        this.router = new Map([
            ['/', () => setHomeOnDocument()],
            ['/login', () => setLoginOnDocument(this)],
            ['/profile', () => setProfileOnDocument()],
        ]);

        this.render(location.pathname);

        window.addEventListener('popstate', () => {
            this.render(location.pathname);
        });

        Router.instance = this
    }

    navigateTo(path) {
            history.pushState(null, '', path);
            this.render(path);
    }

    render(path) {
        if (this.router.has(path)) {
            history.pushState(null, '', path);
            const routeToPath = this.router.get(path);
            routeToPath();
        } else {
            setErrorOnDocument();
        }
        this.addWholeAnchorEvent()
    }

    addWholeAnchorEvent() {
        const aTags = document.querySelectorAll('a');
        aTags.forEach((tag) =>
            tag.addEventListener('click', (e) => {
                e.preventDefault();
                const tagRef = tag.href.replace(location.origin, '');
                this.render(tagRef);
            })
        );
    }
}
