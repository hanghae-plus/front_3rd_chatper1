import {addLoginFormEvent} from "./event.js";
import {$, setTpl} from "../../utils/dom.js";
import {loginTpl} from "./templates.js";
import {Store} from "../../utils/store.js";
import {Storage} from "../../utils/storage.js";

const setLoginOnDocument = (router) => {
    const store = new Store()
    const storage = new Storage()
    const isLogin = storage.loadData('isLogin')

    if(isLogin) {
        const userinfo = storage.loadData('user')

        if(userinfo) {
            store.setState({isLogin:true , ...userinfo})
        } else {
            store.setState({isLogin:false})
            storage.removeData('isLogin')
            storage.removeData('user')
        }

        return router.navigateTo('/')
    }

    setTpl(loginTpl())($('#root'));
    addLoginFormEvent(router)
}

export default setLoginOnDocument