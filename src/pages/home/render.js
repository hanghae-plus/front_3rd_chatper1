import {$, setTpl} from "../../utils/dom.js";
import {homeTpl} from "./templates.js";
import {addLogoutEvent} from "../../events/addLogoutEvent.js";

const setHomeOnDocument = () => {
    setTpl(homeTpl())($('#root'));
    addLogoutEvent()
}

export default setHomeOnDocument