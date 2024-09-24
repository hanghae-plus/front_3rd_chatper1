export class Store  {
    constructor() {
        if (Store.instance) {
            return Store.instance;
        }
        Store.instance = this;
        this.state = {
            isLogin:false,
            username:'',
            email:'',
            bio:'',
        };
    }

    setState(newState) {
        this.state = { ...this.state, ...newState };
    }

    getState() {
        return this.state;
    }
}
