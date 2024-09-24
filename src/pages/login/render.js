import {addLoginFormEvent, getUserInfoFromStorage} from "./event.js";
import {$, setTpl} from "../../utils/dom.js";
import {loginTpl} from "./templates.js";
import {Store} from "../../utils/store.js";

const setLoginOnDocument = (router) => {
    const isLogin = localStorage.getItem('isLogin')

    const store = new Store()

    if(isLogin) {
        const userinfo = getUserInfoFromStorage()

        if(userinfo) {
            store.setState({isLogin:true , ...userinfo})
        } else {
            store.setState({isLogin:false})
            localStorage.removeItem('isLogin')
        }

        return router.navigateTo('/')
    }

    setTpl(loginTpl())($('#root'));
    addLoginFormEvent(router)
}

export default setLoginOnDocument