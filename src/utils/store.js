import {Storage} from "./storage.js";

export class Store  {
    constructor() {
        if (Store.instance) {
            return Store.instance;
        }
        Store.instance = this;
        this.storage = new Storage()
        this.userInfo = this.storage.loadData('user') || {username:'', email:'', bio:'',}
        this.state = {
            isLogin:this.storage.loadData('isLogin') || false,
            ...this.userInfo
        };
    }

    setState(newState) {
        this.state = { ...this.state, ...newState };
    }

    getState() {
        return this.state;
    }

    /*
    * @TODO 페이지 전환을 통해 랜더링을 해주지만
    *   한 페이지 안에서 상태 변경 하여 랜더링을 시켜준다 하면 옵저버 패턴을 활용 하여 랜더 함수를 추가?
    * */
}
