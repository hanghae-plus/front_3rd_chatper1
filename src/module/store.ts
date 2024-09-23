class Observer {
    private observers: Array<any>
    constructor() {
        this.observers = [];
    }

    // 옵저버 등록
    subscribe(fn: any) {
        this.observers.push(fn);
    }

    // 옵저버 해제
    unsubscribe(fn: any) {
        this.observers = this.observers.filter(subscriber => subscriber !== fn);
    }

    // 모든 옵저버에게 알림
    notify(data: TypeUserData) {
        this.observers.forEach(observer => observer(data));
    }
}

class Store extends Observer {
    _state: TypeUserData
    initialState: TypeUserData
    constructor(state: TypeUserData ) {
        super();
        this._state = { ...state };
        this.initialState = { ...state };
    }

    get state() {
        return this._state;
    }

    reset(){
        localStorage.removeItem('user');
        this._state = this.initialState
    }

    // 상태 업데이트 및 옵저버들에게 알림
    setState(newState) {
        this._state = { ...this._state, ...newState };
        this.notify(this._state);
    }
}

const initialState = {
    username: '',
    email: '',
    bio: '',
};

const store = new Store(initialState);

export default store;