import {addLoginFormEvent} from "./event.js";
import {$, setTpl} from "../../utils/dom.js";
import {loginTpl} from "./templates.js";


const setLoginOnDocument = (router) => {
    setTpl(loginTpl())($('#root'));
    addLoginFormEvent(router)
}

export default setLoginOnDocument