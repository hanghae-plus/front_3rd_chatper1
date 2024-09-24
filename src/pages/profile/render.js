import {$, setTpl} from "../../utils/dom.js";
import {profileTpl} from "./templates.js";
import {addUserInfoFormEvent} from "./event.js";
import {addLogoutEvent} from "../../events/addLogoutEvent.js";
import {Store} from "../../utils/store.js";

const setProfileOnDocument = (router) => {
    const {isLogin} = new Store().getState()

    if(!isLogin) return router.navigateTo('/login')

    setTpl(profileTpl())($('#root'));
    addUserInfoFormEvent()
    addLogoutEvent()
}

export default setProfileOnDocument