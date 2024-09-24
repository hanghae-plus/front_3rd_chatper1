class Store {
    constructor(){
        this.state = {};
        this.listeners={};
    }

    getState(key){
        return this.state[key];
    }

    setState(key, newState){
        this.state[key] = {
            ...this.state[key],
            ...newState
        };
        this.notify(key)
    }

    subscribe(key, listener){
        if(!this.listeners[key]){
            this.listeners[key] = [];
        }
        this.listeners[key].push(listeners);

        return () => this.unsubscribe(key, listener);

    }

    unsubscribe(key, listener) {
        if (this.listeners[key]) {
            this.listeners[key] = this.listeners[key].filter(l => l !== listener);
        }
    }


    notify(key){
        if(this.listeners[key]){
            this.listeners[key].forEach(listeners => listeners());
        }
    }
}

const store = new Store();

export default store;